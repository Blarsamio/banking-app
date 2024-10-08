import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Footer = ({ user, type = "desktop"}: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAccount();

    if(loggedOut) router.push('/login');
  }

  return (
    <footer className='footer'>
      <div className={type === "mobile" ? 'footer_name-mobile' : 'footer_name'}>
        <p className='text-xl font-bold text-gray-700'>
          {user?.firstName[0]}
        </p>
      </div>
      <div className={type === "mobile" ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className='text-14 truncate font-semibold text-gray-700 dark-header'>
          {user?.firstName}
        </h1>
        <p className='text-14 truncate font-normal text-gray-600 dark-p'>
          {user?.email}
        </p>
      </div>
      <div className={type === "mobile" ? 'footer_image-mobile' : 'footer_image'} onClick={handleLogout}>
        <Image src="/icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  )
}

export default Footer
