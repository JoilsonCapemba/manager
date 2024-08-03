interface TaskProps{
  description: string
  state: string
}

export function Task({description, state}: TaskProps){
  return(
          <div className="bg-[#363041] flex items-center gap-3 h-[75px] ">
             
            <div className="flex-row p-2">
              <p className="">{description}</p>
              <p className="text-[#B4ACF9] ">{state}</p>
            </div>
          </div>
  )
}