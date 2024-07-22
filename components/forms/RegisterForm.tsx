"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { notFound, useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { error } from "console"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOption } from "@/constants"
import { Label } from "../ui/label"


interface RegisterFormType {
    user:User
}

export default function RegisterForm({user}:RegisterFormType) {
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
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        // Handle unsuccessful user creation (e.g., display an error message)
        notFound()
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false even in case of errors
    }
  }

  
  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
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
              {GenderOption.map((option)=>(
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

        </div>
      <SubmitButton isLoading={isLoading} >
      Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}
