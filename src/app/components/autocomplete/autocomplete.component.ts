import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  /**
   * ID for the associated input element. Used for accessibility purposes.
   */
  @Input() for: string = 'for';

  /**
   * Label text for the autocomplete component. Displayed above the input field.
   */
  @Input() label: string = 'Default Label';

  /**
   * Placeholder text for the input field. Displayed when the input is empty.
   */
  @Input() placeholder: string = 'Default Placeholder';

  /**
   * Size of the input field. Accepted values are 'small', 'medium', 'large'.
   */
  @Input() inputSize: string = 'medium';

  /**
   * Title text for the autocomplete component. Displayed as a tooltip or heading.
   */
  @Input() title: string = 'Default Title';

  /**
   * Data source for the autocomplete suggestions. Expected to be an array of objects.
   */
  @Input() autocompleteData: any[] = [];

  /**
   * SVG icon displayed to the left of the input field. Expected to be a valid SVG string.
   */
  @Input() leftIconSvg: string | null = null;

  /**
   * SVG icon displayed to the right of the input field. Expected to be a valid SVG string.
   */
  @Input() rightIconSvg: string | null = null;

  /**
   * Flag indicating whether to show the left icon.
   */
  @Input() showLeftIcon = true;

  /**
   * Flag indicating whether to show the right icon.
   */
  @Input() showRightIcon = true;

  /**
   * Sanitized version of the left icon SVG to prevent XSS attacks.
   */
  sanitizedLeftIconSvg: SafeHtml | null = null;

  /**
   * Sanitized version of the right icon SVG to prevent XSS attacks.
   */
  sanitizedRightIconSvg: SafeHtml | null = null;

  /**
   * Currently selected option from the autocomplete suggestions.
   */
  selectedOption: any;

  /**
   * Filtered list of autocomplete suggestions based on the search input.
   */
  filteredData: any[] = [];

  /**
   * Flag indicating whether the label should be displayed.
   */
  hasLabel: boolean = false;

  /**
   * Flag indicating whether the dropdown is currently active (visible).
   */
  isActive: boolean = false;

  /**
   * Subject to handle debounce of search input changes.
   */
  searchSubject = new Subject<string>();

  /**
   * Flag indicating whether to show the input field.
   */
  showInput = true;

  /**
   * Subject to handle changes in the search input value.
   */
  searchInputChanges$ = new Subject<string>();

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * HostListener for detecting clicks outside the component to close the dropdown.
   * @param targetElement The element that was clicked.
   */
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const clickedInside =
      this.dropdownWrapper.nativeElement.contains(targetElement) ||
      (this.searchInput &&
        this.searchInput.nativeElement.contains(targetElement));

    if (!clickedInside && this.isActive) {
      this.isActive = false;

      // Reset the input and show it again only if there's no selected option.
      if (!this.selectedOption) {
        this.showInput = true;
        this.attachInputEventListener(); // Ensure the event listener is re-attached.

        // Clear the input value after the view is updated and trigger input event.
        setTimeout(() => {
          if (this.searchInput && this.searchInput.nativeElement) {
            this.searchInput.nativeElement.value = '';
            this.searchInput.nativeElement.dispatchEvent(new Event('input'));
          }
        });
      } else {
        // Dropdown is being closed with a selected option.
        this.toggleDropdown();
      }
    }
  }
  /**
   * HostListener for detecting the escape key press to close the dropdown.
   * @param event The keyboard event.
   */
  @HostListener('window:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    if (this.isActive) {
      this.isActive = false;
      if (!this.selectedOption) {
        this.showInput = true;
        this.attachInputEventListener();

        setTimeout(() => {
          if (this.searchInput && this.searchInput.nativeElement) {
            this.searchInput.nativeElement.value = '';
            this.searchInput.nativeElement.dispatchEvent(new Event('input'));
          }
        });
      } else {
        this.toggleDropdown();
      }
    }
  }

  @ViewChild('dropdownWrapper', { static: true })
  dropdownWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef<HTMLInputElement>;

  /**
   * Angular lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit() {
    this.filteredData = this.autocompleteData;
    this.hasLabel = !!this.label.trim().length;

    this.searchSubject.pipe(debounceTime(100)).subscribe({
      next: (searchText) => {
        this.filteredData = this.autocompleteData.filter((option) =>
          option.name.toLowerCase().includes(searchText.toLowerCase())
        );
      },
      error: (err) => {
        console.error('Error occurred:', err); // Example error handling
      },
      complete: () => {
        console.log('Observable completed.'); // Example completion handling
      },
    });

    this.searchInputChanges$
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe({
        next: (searchText) => {
          this.isActive = true;
          this.handleSearch(searchText);
        },
      });
  }

  /**
   * Angular lifecycle hook that is called after Angular has fully initialized a component's view.
   */
  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.attachInputEventListener();
  }

  /**
   * Handles the selection of an option from the autocomplete suggestions.
   * @param option The selected option.
   */
  optionSelect(option: any) {
    this.selectedOption = option;
    this.showInput = false; // Hide the input
    console.log('Selected option:', this.selectedOption);
    this.isActive = false;
    this.toggleDropdown();
    this.filteredData = this.autocompleteData;
  }

  /**
   * Clears the current selection and resets the input field.
   */
  clearSelection() {
    this.selectedOption = null;
    this.showInput = true;
    this.filteredData = this.autocompleteData;

    // Clear input and trigger search AFTER the view is updated
    setTimeout(() => {
      this.attachInputEventListener();
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = '';
        this.searchInput.nativeElement.dispatchEvent(new Event('input'));
      }
    });
  }

  /**
   * Attaches an event listener to the input field for handling input events.
   */
  private attachInputEventListener() {
    // Check if input element exists and is not already attached
    if (
      this.searchInput &&
      this.searchInput.nativeElement &&
      !this.searchInput.nativeElement.hasAttribute('listenerAttached')
    ) {
      this.searchInput.nativeElement.addEventListener('input', (event: any) => {
        this.searchInputChanges$.next(event.target.value);
      });
      this.searchInput.nativeElement.setAttribute('listenerAttached', 'true'); // Mark listener as attached
    }
  }

  /**
   * Handles the search logic for filtering the autocomplete suggestions.
   * @param searchText The text to search for.
   */
  handleSearch(searchText: string) {
    this.searchSubject.next(searchText);
  }

  /**
   * Toggles the visibility of the dropdown.
   */
  toggleDropdown() {
    const dropdownElement = this.dropdownWrapper.nativeElement;
    dropdownElement.classList.toggle('active', this.isActive);
    dropdownElement.classList.toggle('inactive', !this.isActive);
  }

  /**
   * Angular lifecycle hook that is called when any data-bound property of a directive changes.
   */
  ngOnChanges() {
    this.updateIconVisibility(); // Call to update visibility on changes
    this.sanitizeSvgIcons();
  }

  /**
   * Updates the visibility of the left and right icons based on their SVG content.
   */
  private updateIconVisibility() {
    this.showLeftIcon = !!this.leftIconSvg;
    this.showRightIcon = !!this.rightIconSvg;
  }

  /**
   * Sanitizes the SVG content for the left and right icons to prevent XSS attacks.
   */
  private sanitizeSvgIcons() {
    if (this.leftIconSvg) {
      this.sanitizedLeftIconSvg = this.sanitizer.bypassSecurityTrustHtml(
        this.leftIconSvg
      );
    }
    if (this.rightIconSvg) {
      this.sanitizedRightIconSvg = this.sanitizer.bypassSecurityTrustHtml(
        this.rightIconSvg
      );
    }
  }

  /**
   * Generates class names based on the input size.
   * Constructs an object suitable for ngClass based on `inputSize`.
   * @returns {Object} Object with dynamic class names
   */
  getClass(): object {
    return {
      [`input--${this.inputSize}`]: this.inputSize,
    };
  }
}
