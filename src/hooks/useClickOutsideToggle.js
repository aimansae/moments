import { useEffect, useRef, useState }  from 'react'

const useClickOutsideToggle = () => {

    // burger menu 

    const [expanded, setExpanded] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
        const handleClickOutside = (event)=> {
            if (ref.current && !ref.current.contains(event.target)){
                setExpanded(false)
            }
        }
        document.addEventListener('mouseup',handleClickOutside )
        //removing event listener
        return() => {
            document.removeEventListener('mouseup',handleClickOutside )
        }
    } ,[ref] )

  return (
    {expanded, setExpanded,ref}
  )
}

export default useClickOutsideToggle