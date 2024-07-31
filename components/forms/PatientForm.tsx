"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { notFound, useRouter } from "next/navigation"
import { error } from "console"

export enum FormFieldType{
  INPUT='input',
  TEXTAREA='textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON = 'skeleton',
}

export default function PatientForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:'',
      phone:'',
    },
  })

  // 2. Define a submit handler.
 
  
  return(
    <Form  {...form}>
    <form  className="space-y-8">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 🖐️</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
        control={form.control}
        fieldTypes={FormFieldType.INPUT}
        name="name"
        label="Full name"
        placeholder='JoJo'
        iconSrc='/assets/icons/user.svg'
        iconAlt='user'
        />
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
      <SubmitButton isLoading={isLoading} >
      Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}
