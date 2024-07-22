'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import {  FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {E164Number} from 'libphonenumber-js/core'
  interface CustomProps {
    control:Control<any>
    fieldTypes:FormFieldType
    name:string
    label?:string
    placeholder?:string
    iconSrc?:string
    iconAlt?:string
    disabled?:boolean
    dateFormat?:string
    showTimeSelect?:boolean
    children?:React.ReactNode
    renderSkeleton?:(field:any)=>React.ReactNode

  }
  const RenderField=({field,props}:{field:any,props:CustomProps})=>{
    
    const { fieldTypes, placeholder ,iconSrc,iconAlt ,showTimeSelect,dateFormat}=props
    switch (fieldTypes) {
      case FormFieldType.INPUT:
        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                {iconSrc && (<Image src={iconSrc} height={24} width={24} alt={iconAlt||'icon'} className="ml-2"/>)}
                <FormControl >
                    <Input placeholder={placeholder} {...field} className="shad-input border-0"/>
                </FormControl>
            </div>
        )
      case FormFieldType.PHONE_INPUT:

            return(
                <FormControl>
                    <PhoneInput
                    
                    international
                    withCountryCallingCode
                    value={field.value as E164Number |undefined}
                    onChange={field.onChange}
                    className="input-phone"
                    
                    defaultCountry="EG"
                    />
                </FormControl>
            )
      case FormFieldType.DATE_PICKER:
        return (<div className="flex rounded-md border border-dark-500 bg-dark-400`">
                <Image src='/assets/icons/calendar.svg' height={24} width={24}
                 alt="calendar" className="ml-2"/>
                <FormControl className="bg-dark-400 ">
                <DatePicker  selected={field.value} onChange={(date) => field.onChange(date)} 
                dateFormat={dateFormat ?? 'MM/dd/yyyy/'} showTimeSelect={showTimeSelect ?? false} />
                </FormControl>
              </div>)
        default:
            break;
    }
}
  
const CustomFormField = (props:CustomProps) => {
    const {control , fieldTypes, label, name ,}=props
  return (
    <>
      <FormField 
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldTypes !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props}/>
            <FormMessage className="shad-error"/>
          </FormItem>
        )}
      />
    </>)
  
}

export default CustomFormField