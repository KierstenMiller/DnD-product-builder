import { BasicAccordion } from '-/Components/accordion/basic-accordion'

const About = () => {
  return <div>
        <h1>Accordion Testing Ground</h1>
        <BasicAccordion
            headerText="Accordion Header"
            headerLevel={3}
            id="basic-accordion-example"
        >
            Basic Accordion Content
        </BasicAccordion>
    </div>
}

export default About
