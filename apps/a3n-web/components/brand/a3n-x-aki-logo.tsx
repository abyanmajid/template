import Image from 'next/image'
import LogoA3NxAkiDark from '@/assets/logo-a3n-x-aki-dark.png'
import LogoA3NxAkiLight from '@/assets/logo-a3n-x-aki-light.png'

interface Props {
  width?: number
  height?: number
}

export default function A3NxAkiLogo(props: Props) {
  return (
    <>
      <Image
        src={LogoA3NxAkiLight}
        alt="a3n x aki logo"
        width={props.width ?? 150}
        height={props.height ?? 60}
        className="dark:hidden"
      />
      <Image
        src={LogoA3NxAkiDark}
        alt="a3n x aki logo"
        width={props.width ?? 150}
        height={props.height ?? 60}
        className="hidden dark:block"
      />
    </>
  )
}
