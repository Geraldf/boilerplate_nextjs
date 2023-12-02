import FoxLogo from "./fox.svg"





interface Props extends React.ComponentPropsWithoutRef<"svg"> {}

export const Fox: React.FC<Props> = (props: Props) => {
  return <img src={FoxLogo} alt="Fox logo" />
}