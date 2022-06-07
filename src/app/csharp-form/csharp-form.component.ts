import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CsharpService } from '../csharp.service';
import { FormComponent } from '../Interfaces/FormComponent';
import { CsharpField } from '../Models/CsharpField';

@Component({
  selector: 'app-csharp-form',
  templateUrl: './csharp-form.component.html',
  styleUrls: ['./csharp-form.component.css']
})
export class CsharpFormComponent implements OnInit, FormComponent {

  className = "CsharpFormComponent";

  debug = console.log;

  // Form group for getting the field
  // details of a csharp field
  formGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      dataType: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      comment: new FormControl(''),
      accessModifier: new FormControl('public'),

      propertyForm: new FormGroup(
        {
          propertyName: new FormControl('', Validators.required),
          propertyType: new FormControl('virtual'),
          getterAttributes: new FormControl(''),
          setterAttributes: new FormControl(''),
          initializerAttributes: new FormControl('')
        }
      )
    }
  );

  // Whether the getter, setter, initializer expansion panels
  // are to be displayed
  isGetterEnabled = false;
  isSetterEnabled = false;
  isInitEnabled = false;

  // Whether to properties configuration controls
  showPropertyConfig = false;
  showPropertyConfigButton = true;
  propertyConfigButtonColor = "primary";

  // Button active status for property type
  virtualButtonChecked = true;
  abstractButtonChecked = false;

  // Button active status for field access modifier
  publicButtonChecked = true;
  privateButtonChecked = false;
  protectedButtonChecked = false;

  // Maps accessModifier to a function that takes care
  // of setting state related to propertyConfig that the particular
  // accessModifier allows
  accessModifierButtonTogglerMap = new Map<string, Function>(
    [
      [
        'public', () => {
          this.publicButtonChecked = true;

          // Whenever accessModifier is public, any UI related
          // to property config should be hidden
          this.showPropertyConfig = false;
          this.showPropertyConfigButton = false;

          this.privateButtonChecked = this.protectedButtonChecked = false;

          // Reset the property form as a public field
          // does not need to have property
          this.resetPropertyForm();
        }
      ],
      [
        'private', () => {
          this.privateButtonChecked = true;

          // private fields will allow property configuration
          // So, show the property config button and set its color based
          // on whether the showPropertyConfig flag is set to true
          this.showPropertyConfigButton = true;
          this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

          this.publicButtonChecked = this.protectedButtonChecked = false;
        }
      ],
      [
        'protected', () => {
          this.protectedButtonChecked = true;

          // protected fields will allow property configuration
          // So, show the property config button and set its color based
          // on whether the showPropertyConfig flag is set to true
          this.showPropertyConfigButton = true;
          this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

          this.publicButtonChecked = this.privateButtonChecked = false;
        }
      ]
    ]
  );

  constructor(
    public csharpService: CsharpService
  ) { }

  ngOnInit(): void {
    // Initially, the accessModifier will be public
    this.toggleAccessModifier('public');

    // Subscribe to updateFieldSubject of the service
    // in case it emits a field to be updated
    this.csharpService.updateFieldSubject.subscribe(this.patchForm.bind(this));
  }

  // Handler for field details submission
  onAddField() {
    let functionName = "onAddField()";

    // Name and DataType of a field are required
    let nameFormControl = this.formGroup.get('name');
    let dataTypeFormControl = this.formGroup.get('dataType');

    // Get the propertyForm and the propertyName form control
    let propertyForm = this.formGroup.get('propertyForm') as FormGroup;
    let propertyNameFormControl = propertyForm?.get('propertyName');

    if (!nameFormControl?.errors && !dataTypeFormControl?.errors) {

      let accessors = new Map<string, any>();

      let csharpField = new CsharpField(
        nameFormControl?.value,
        dataTypeFormControl?.value,
        this.formGroup.get("defaultValue")?.value ?? '',
        this.formGroup.get("comment")?.value ?? '',
        this.formGroup.get("accessModifier")?.value,
        "",
        "",
        accessors
      );

      // If the property is to be generated and the property name is given
      if (this.showPropertyConfig == true && !propertyNameFormControl?.errors) {

        let propertyTypeFormControl = propertyForm.get('propertyType');

        // Get the getter, setter and initializer details
        let getterAttributes = propertyForm.get('getterAttributes')?.value;
        let setterAttributes = propertyForm.get('setterAttributes')?.value;
        let initializerAttributes = propertyForm.get('initializerAttributes')?.value;

        if (getterAttributes?.length > 0) {
          let getterAttributesList = (getterAttributes as string)?.split('\n');
          this.debug(`${this.className}::${functionName}`, getterAttributesList);

          accessors.set('getter', { getterAttributes: getterAttributesList });
        }

        if (setterAttributes?.length > 0) {
          let setterAttributesList = (setterAttributes as string)?.split('\n');

          this.debug(`${this.className}::${functionName}`, setterAttributesList);

          accessors.set('setter', { setterAttributes: setterAttributesList });
        }

        if (initializerAttributes?.length > 0) {
          let initializerAttributesList = (initializerAttributes as string)?.split('\n');
          this.debug(`${this.className}::${functionName}`, initializerAttributesList);

          accessors.set('initializer', { initializerAttributes: initializerAttributesList });
        }

        // Set the corresponding properties in the Csharp field object
        csharpField.propertyName = propertyNameFormControl?.value;
        csharpField.propertyType = propertyTypeFormControl?.value;

        // Add the field to the list
        this.csharpService.addField(csharpField);

        // Reset the form
        this.resetForm();
      }

      // If the property is not to be generated
      if (this.showPropertyConfig == false) {
        // Add the new field to the list
        this.csharpService.addField(csharpField);

        // Reset the form
        this.resetForm();
      }
    }
  }


  // Resets the form to the original state
  resetForm() {
    // Reset the propertyForm
    this.resetPropertyForm();

    // By default, the accessModifier will be public
    this.formGroup.reset({ accessModifier: 'public' });

    // The toggler for 'public' accessModifier will take care of UI related
    // changes
    this.toggleAccessModifier('public');
  }

  // Resets the property form to the original state
  resetPropertyForm() {
    let propertyForm = this.formGroup.get('propertyForm') as FormGroup;

    propertyForm.reset(
      {
        propertyName: '',
        propertyType: 'virtual',
        getterAttributes: '',
        setterAttributes: '',
        initializerAttributes: ''
      }
    );

    this.togglePropertyType('virtual');
  }

  // Patches the form with the field details recieved from the
  // service
  patchForm(field: CsharpField) {
    this.debug(this.className + "::patchCsharpForm()", field);

    // Set the value of the form according to the field
    this.formGroup.setValue(
      {
        name: field?.name,
        dataType: field?.dataType,
        defaultValue: field?.defaultValue,
        comment: field?.comment,
        accessModifier: field?.accessModifier,

        propertyForm:
        {
          propertyName: field?.propertyName ?? "",
          propertyType: field?.propertyType ?? "",
          getterAttributes: field?.accessors.get('getter')?.getterAttributes ?? "",
          setterAttributes: field?.accessors.get('setter')?.setterAttributes ?? "",
          initializerAttributes: field?.accessors.get('initializer')?.initializerAttributes ?? ""
        }
      }
    );

    // Update the UI based on the field
    this.toggleAccessModifier(field?.accessModifier);
    this.virtualButtonChecked = field?.propertyType == 'virtual' ? true : false;
    this.abstractButtonChecked = field?.propertyType == 'abstract' ? true : false;

    if (field?.propertyName?.length > 0) {
      this.showPropertyConfig = true;
      this.showPropertyConfigButton = true;
      this.propertyConfigButtonColor = "warn";
    }

  }

  // Toggles whether setter form is to be
  // displayed or not
  toggleSetter() {
    // Clear the intializer accessor attributes
    (this.formGroup.get('propertyForm') as FormGroup).patchValue({ initializerAttributes: "" });

    this.isSetterEnabled = !this.isSetterEnabled;
    this.isInitEnabled = false;
  }

  // Toggles whether initializer form is to be
  // displayed or not
  toggleInitializer() {
    // Clear the setter accessor attributes
    (this.formGroup.get('propertyForm') as FormGroup).patchValue({ setterAttributes: "" });

    this.isInitEnabled = !this.isInitEnabled;
    this.isSetterEnabled = false;
  }

  // Toggles whether getter form is to be
  // displayed or not
  toggleGetter() {
    this.isGetterEnabled = !this.isGetterEnabled;
  }

  // Toggles the access modifier for the field
  // and changes UI according to it
  toggleAccessModifier(accessModifier: string) {
    let accessModifierFormControl = this.formGroup.get("accessModifier");

    if (accessModifierFormControl) {
      // Get the toggler function for the given accessModiier
      let toggler = this.accessModifierButtonTogglerMap.get(accessModifier);

      toggler?.call(this);

      accessModifierFormControl.setValue(accessModifier);
    }
  }

  // Toggles the property type (virtual/abstract)
  togglePropertyType(propertyType: string) {
    let propertyTypeFormControl = this.formGroup.get("propertyForm.propertyType");

    if (propertyTypeFormControl) {
      propertyTypeFormControl.setValue(propertyType);
    }
  }

  // Toggles whether to show the property config UI
  togglePropertyConfig(event: any) {
    // Update the state of buttons
    this.showPropertyConfig = !this.showPropertyConfig;
    this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

    // Reset the propertyName, propertyType and accessorAttributes
    // if the user doesn't want to configure property
    if (!this.showPropertyConfig) {
      this.resetPropertyForm();

      this.togglePropertyType('virtual');
    }
  }
}
