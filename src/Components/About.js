import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      this is About {a.name} and in class {a.class}
    </div>
  )
}

export default About