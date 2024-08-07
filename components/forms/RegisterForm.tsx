"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,

} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

import { PatientFormValidation, UserFormValidation } from "@/lib/validation"


import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

const form = useForm<z.infer<typeof UserFormValidation>>({
  resolver: zodResolver(UserFormValidation),
  defaultValues: {
    name: "",
    email:'',
    phone:'',
  },
})



export default function RegisterForm() {

  // 2. Define a submit handler.

  return(
    <Form {...form}>
    <form  className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">welcom 🖐️</h1>
            <p className="text-dark-700">let us know more about you</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder='JoJo'
        iconSrc='/assets/icons/user.svg'
        iconAlt='user'
        />
        <div className="flex flex-col gap-6 x xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder='JoJo@gmail.com'
        iconSrc='/assets/icons/email.svg'
        iconAlt='email'
        />
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone number"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.DATE_PICKER}
        name="birthDate"
        label="Date of Birth"
       
        />
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.SKELETON}
        name="gender"
        label="Gender"
        renderSkeleton={(field)=>(
          <FormControl>
            <RadioGroup 
            className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}
            >
              {GenderOptions.map((option)=>(
                <div key={option} className="radio-group">
                  <RadioGroupItem
                    value={option} id={option}/>
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                  
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        )}
        />
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="address"
        label="Address"
        placeholder="14th Streer, New You"
       
        />
          <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="occupation"
        label="Occupation"
        placeholder="Software Engineer"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="emergencyContactName"
        label="Emergency contact name"
        placeholder="Guardian's name"
       
        />
          {/* <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="emergencyContactNumber"
        label="Emergency contact number"
        placeholder="(555) 123-4567"
        /> */}
        </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.SELECT}
        name="primaryPhysician"
        label="Primary Physician"
        placeholder="Select Physician"
        >
          {Doctors.map((doctor)=>(
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image 
                src={doctor.image} width={32} height={32} alt={doctor.name} 
                className="rounded-full border border-dark-500"/>
              <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">
        {/* <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="insuranceProvider"
        label="Insurance Provider"
        placeholder="BlueCross BlueShield"
       
        /> */}
          <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="insuracePolicyNumber"
        label="Insurace Policy Number"
        placeholder="ABC123456789"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="insuranceProvider"
        label="Insurance Provider"
        placeholder="BlueCross BlueShield"
       
        />
    
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.TEXTAREA}
        name="allergies"
        label="Allergies (if any)"
        placeholder="Peanuts, Penicillin, Pollen"
       
        />
          <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.TEXTAREA}
        name="currentMedication"
        label="Current Medication"
        placeholder="Ibuprofen 200mg, Paracetamol 500mg"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.TEXTAREA}
        name="famiyMedicalHistory"
        label="Famiy Medical History"
        placeholder="Mother had heart disease"
       
        />
          <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.TEXTAREA}
        name="pastMedicationHistory"
        label="Past Medication history"
        placeholder="Appendectomy, Tonsillectomy"
        />
        </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section>
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.SKELETON}
        name="identificationDocument"
        label="Scanned Copy of Identification Document"
        renderSkeleton={(field)=>(
          <FormControl>
            <FileUploader
            files={field.value}
            onChange={field.onChange}
            />
          </FormControl>
        )}
        />
         <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>
         <CustomFormField
            fieldTypes={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldTypes={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

<CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.CHECKBOX}
        name="privacyConsent"
        label="I acknowledge that I have reviewed and agree to the
            privacy policy"
        />
        
      <SubmitButton isLoading={isLoading} >
      Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}
