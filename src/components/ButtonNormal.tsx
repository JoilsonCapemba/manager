interface ButtonNormalProps{
  title: string,
  action: string
}

export function ButtonNormal({title, action}: ButtonNormalProps){
  return(
    <button className="w-[133px] h-[50px] bg-[#B4ACF9] rounded-md"><a href={action}>{title}</a></button>
  )
}