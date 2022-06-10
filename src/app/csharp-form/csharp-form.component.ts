import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CsharpService } from '../Services/csharp/csharp.service';
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
            accessModifier: new FormControl('public'),

            extraDetailsForm: new FormGroup(
                {
                    defaultValue: new FormControl(''),
                    comment: new FormControl(''),
                    fieldAttributes: new FormControl('')
                }
            ),

            propertyForm: new FormGroup(
                {
                    propertyName: new FormControl('', Validators.required),
                    propertyAccessModifier: new FormControl('public'),
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

    // Property configuration controls
    showPropertyConfig = false;
    propertyConfigButtonColor = "primary";

    // Default value, comment, field attributes configuration controls
    showExtraConfig = false;
    extraConfigButtonColor = "primary";

    // Button active status for property type
    propertyTypeButtons = {
        virtualButton: true,
        abstractButton: false
    }

    // Button active status for field access modifier
    fieldAccessModifierButtons = {
        publicField: true,
        privateField: false,
        protectedField: false
    }

    // Button active status for property access modifier
    propertyAccessModifierButtons = {
        publicProperty: true,
        privateProperty: false,
        protectedProperty: false
    }

    // Maps accessModifier to a function that takes care
    // of setting state related to propertyConfig that the particular
    // accessModifier allows
    fieldAccessModifierButtonTogglerMap = new Map<string, Function>(
        [
            ['public', () => {
                this.fieldAccessModifierButtons.publicField = true;

                this.fieldAccessModifierButtons.privateField = this.fieldAccessModifierButtons.protectedField = false;
            }
            ],
            ['private', () => {
                this.fieldAccessModifierButtons.privateField = true;

                // private fields will allow property configuration
                // So, show the property config button and set its color based
                // on whether the showPropertyConfig flag is set to true
                this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

                this.fieldAccessModifierButtons.protectedField = this.fieldAccessModifierButtons.publicField = false;
            }
            ],
            ['protected', () => {
                this.fieldAccessModifierButtons.protectedField = true;

                // protected fields will allow property configuration
                // So, show the property config button and set its color based
                // on whether the showPropertyConfig flag is set to true
                this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

                this.fieldAccessModifierButtons.privateField = this.fieldAccessModifierButtons.publicField = false;
            }
            ]
        ]
    );

    propertyAccessModifierButtonTogglerMap = new Map<string, Function>(
        [
            ['public', () => {
                this.propertyAccessModifierButtons.publicProperty = true;
                this.propertyAccessModifierButtons.privateProperty = this.propertyAccessModifierButtons.protectedProperty = false;
            }],

            ['protected', () => {
                this.propertyAccessModifierButtons.protectedProperty = true;

                this.propertyAccessModifierButtons.privateProperty = this.propertyAccessModifierButtons.publicProperty = false;
            }],

            ['private', () => {
                this.propertyAccessModifierButtons.privateProperty = true;

                this.propertyAccessModifierButtons.protectedProperty = this.propertyAccessModifierButtons.publicProperty = false;
            }]
        ]
    );

    propertyTypeButtonTogglerMap = new Map<string, Function>(
        [
            ['virtual', () => {
                this.propertyTypeButtons.virtualButton = true;
                this.propertyTypeButtons.abstractButton = false;
            }],

            ['abstract', () => {
                this.propertyTypeButtons.abstractButton = true;
                this.propertyTypeButtons.virtualButton = false;
            }]
        ]
    );

    constructor(
        public csharpService: CsharpService
    ) { }

    ngOnInit(): void {
        // Initially, the accessModifier will be public
        this.toggleFieldAccessModifier('public');

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
        let propertyNameFormControl = this.formGroup.get('propertyForm.propertyName');

        if (!nameFormControl?.errors && !dataTypeFormControl?.errors) {

            let accessors = new Map<string, any>();

            let csharpField = new CsharpField(
                nameFormControl?.value,
                dataTypeFormControl?.value,
                this.formGroup.get("extraDetailsForm.defaultValue")?.value,
                this.formGroup.get("extraDetailsForm.comment")?.value,
                this.formGroup.get("extraDetailsForm.fieldAttributes")?.value,
                this.formGroup.get("accessModifier")?.value,
                "",
                "virtual",
                this.formGroup.get("propertyForm.propertyAccessModifier")?.value,
                accessors
            );

            // If the property is to be generated and the property name is given
            if (this.showPropertyConfig == true && !propertyNameFormControl?.errors) {

                // Get the getter, setter and initializer details
                let getterAttributes = this.formGroup.get('propertyForm.getterAttributes')?.value;
                let setterAttributes = this.formGroup.get('propertyForm.setterAttributes')?.value;
                let initializerAttributes = this.formGroup.get('propertyForm.initializerAttributes')?.value;

                if (getterAttributes?.length > 0) {
                    this.debug(`${this.className}::${functionName}`, getterAttributes);

                    accessors.set('getter', { getterAttributes });
                }

                if (setterAttributes?.length > 0) {
                    this.debug(`${this.className}::${functionName}`, setterAttributes);

                    accessors.set('setter', { setterAttributes });
                }

                if (initializerAttributes?.length > 0) {
                    this.debug(`${this.className}::${functionName}`, initializerAttributes);

                    accessors.set('initializer', { initializerAttributes });
                }

                // Set the corresponding properties in the Csharp field object
                csharpField.propertyName = propertyNameFormControl?.value;
                csharpField.propertyType = this.formGroup.get("propertyForm.propertyType")?.value;

                // Add the field to the list
                this.csharpService.addField(csharpField);

                // Reset the form
                this.resetForm();
            }

            // If the property is not to be generated
            else if (this.showPropertyConfig == false) {
                // Add the new field to the list
                this.csharpService.addField(csharpField);

                // Reset the form
                this.resetForm();
            }
        }
    }

    // Resets the form to the original state
    resetForm() {
        let functionName = "resetForm()";

        this.debug(`${this.className}::${functionName}`);

        // By default, the accessModifier will be public
        this.formGroup.reset({
            accessModifier: 'public',
            defaultValue: '',
            comment: '',
            fieldAttributes: ''
        });


        // The toggler for 'public' accessModifier will take care of UI related
        // changes
        this.toggleFieldAccessModifier('public');


        this.resetPropertyForm();
        this.resetExtraDetailsForm();
    }

    // Resets the property form to the original state
    resetPropertyForm() {
        let functionName = "resetPropertyForm()";

        this.debug(`${this.className}::${functionName}`);

        let propertyForm = this.formGroup.get('propertyForm') as FormGroup;

        propertyForm.reset(
            {
                propertyName: '',
                propertyType: 'virtual',
                propertyAccessModifer: 'public',
                getterAttributes: '',
                setterAttributes: '',
                initializerAttributes: ''
            }
        );

        // Update the UI
        this.showPropertyConfig = false;
        this.propertyConfigButtonColor = "primary";
        this.isGetterEnabled = this.isSetterEnabled = this.isInitEnabled = false;
        this.togglePropertyType('virtual');
        this.togglePropertyAccessModifier('public');
    }

    // Resets the extra details form
    resetExtraDetailsForm() {
        let functionName = "resetExtraDetailsForm";
        this.debug(`${this.className}::${functionName}`);

        this.formGroup.get("extraDetailsForm")?.reset(
            {
                defaultValue: "",
                comment: "",
                fieldAttributes: ""
            }
        );

        // Update the UI
        this.showExtraConfig = false;
        this.extraConfigButtonColor = "primary";
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
                accessModifier: field?.accessModifier,

                extraDetailsForm: {
                    defaultValue: field?.defaultValue,
                    comment: field?.comment,
                    fieldAttributes: field?.fieldAttributes,
                },

                propertyForm:
                {
                    propertyName: field?.propertyName ?? "",
                    propertyType: field?.propertyType ?? "virtual",
                    propertyAccessModifier: field?.propertyAccessModifier ?? "public",
                    getterAttributes: field?.accessors.get('getter')?.getterAttributes ?? "",
                    setterAttributes: field?.accessors.get('setter')?.setterAttributes ?? "",
                    initializerAttributes: field?.accessors.get('initializer')?.initializerAttributes ?? ""
                }
            }
        );

        // Update the UI based on the field
        this.toggleFieldAccessModifier(field?.accessModifier);
        this.togglePropertyAccessModifier(field?.propertyAccessModifier);
        this.togglePropertyType(field?.propertyType);

        if (field?.propertyName?.length > 0) {
            this.showPropertyConfig = true;
            this.propertyConfigButtonColor = "warn";
        }

        if (field?.defaultValue?.length > 0 || field?.comment?.length > 0 || field?.fieldAttributes?.length > 0) {
            this.showExtraConfig = true;
            this.extraConfigButtonColor = "warn";
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
    toggleFieldAccessModifier(accessModifier: string) {
        let functionName = "toggleFieldAccessModifier()";

        this.debug(`${this.className}::${functionName}`, accessModifier);

        this.fieldAccessModifierButtonTogglerMap.get(accessModifier)?.call(this);
    }

    // Toggles the property type (virtual/abstract)
    togglePropertyType(propertyType: string) {
        let functionName = "togglePropertyType()";

        this.debug(`${this.className}::${functionName}`, propertyType);
        this.propertyTypeButtonTogglerMap.get(propertyType)?.call(this);
    }

    // Toggles whether to show the property config UI
    togglePropertyConfig(event: any) {
        // Update the state of buttons
        this.showPropertyConfig = !this.showPropertyConfig;
        this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";

        // Reset the propertyForm
        // if the user doesn't want to configure property
        if (!this.showPropertyConfig) {
            this.resetPropertyForm();
        }
    }

    // Toggles access modifier for property
    togglePropertyAccessModifier(accessModifier: string) {
        let functionName = "togglePropertyAccessModifier()";

        this.debug(`${this.className}::${functionName}`, accessModifier);

        this.propertyAccessModifierButtonTogglerMap.get(accessModifier)?.call(this);
    }

    // Toggles whether to show extra config UI
    toggleExtraConfig() {
        let functionName = "toggleExtraConfig()";

        this.debug(`${this.className}::${functionName}`);

        this.showExtraConfig = !this.showExtraConfig;

        if (!this.showExtraConfig) {
            this.resetExtraDetailsForm();
        }
        else
            this.extraConfigButtonColor = "warn";
    }
}
