import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import { Copyright } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Registration =async ({params:{userId}}:SearchParamProps) => {
  const user =await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO OTP VERIFICATION  */}
      <section className="remove-scrollbar container ">
      <div className="sub-container max-W-[860px] flex-1 flex-col py-10">
      <Image
      src='/assets/icons/logo-full.svg'
      height={1000}
      width={1000}
      alt="patient"
      className="mb-12 h-10 w-fit"
      />
      <RegisterForm user={user}/>
      <p className="copyright py-12">
      <Copyright className="inline-block"/> 2024 HealthApp
      </p>
      {/* <div className="text-14-regular mt-20 flex justify-between">
      <Link href='/?admin=true' className="text-green-500">
      Admin
      </Link>
      </div> */}
      </div>
      </section>
      <Image
      src='/assets/images/register-img.png'
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Registration