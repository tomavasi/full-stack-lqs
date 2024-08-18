import React from 'react'
import { faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AboutUs.css'
export const AboutUs = () => {
  return (
    <div>
        <h1>Welcome to LQS project</h1>
        <section className='maintext'>
        <p>This is my first attempt on creating a wep application using React</p>

        <p>
            My name is Vasilis Tomaras and i started learning programming in 2023 by following courses online and on Coursera.
            I am located in Amsterdam, the Netherlands and at the moment working as a clinical exercise physiologist in a Rehabilitation Center.
        <p>
            For a long time I am thinking of switching into programming. My goal is to find a full-time job as a front-end developer
        </p>
        <p>
            For more information about the source code of this project and future projects visit my Github account. <br/> Wanna know more about me? Check my LinkedIn.
        </p>
        </p>
        <a className='github' href='https://github.com/tomavasi/lqs-project'><FontAwesomeIcon icon={faGithub}/></a>
        <a className='linkedin' href='https://www.linkedin.com/in/vasilis-tomaras-b16a3914a/'><FontAwesomeIcon icon={faLinkedin}/></a>
        </section>
    </div>
  )
}
