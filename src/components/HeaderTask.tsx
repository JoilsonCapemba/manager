interface HeaderTaskProps {
  title: string
  description: string
}

export function HeaderTask({title, description}: HeaderTaskProps){
  return(
        <div className="flex gap-2 mb-[58px]">
          <div className="flex flex-col">
            <p className="text-white text-2xl font-bold">{title}</p>
            <p>{description}</p>
          </div>
        </div>
  )
}