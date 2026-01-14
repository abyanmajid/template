import Image from 'next/image'
import LogoA3NxMutiaraDark from '@/assets/logo-a3n-x-mutiara-dark.png'
import LogoA3NxMutiaraLight from '@/assets/logo-a3n-x-mutiara-light.png'

interface Props {
  width?: number
  height?: number
}

export default function A3NxMutiaraLogo(props: Props) {
  return (
    <>
      <Image
        src={LogoA3NxMutiaraLight}
        alt="a3n x aki logo"
        width={props.width ?? 200}
        height={props.height ?? 80}
        className="dark:hidden"
      />
      <Image
        src={LogoA3NxMutiaraDark}
        alt="a3n x aki logo"
        width={props.width ?? 200}
        height={props.height ?? 80}
        className="hidden dark:block"
      />
    </>
  )
}
