import { Select } from "./select";

// TODO: Add tests to ensue onChange is called when the user clicks the radio
describe('<Select />', () => {
    const id = "select-id";
    const testId = "test-id";
    const label = "test label";
    context('minimal props (only required props given)', () => {
        const options = [
            { id: '1', text: 'one' },
            { id: '2', text: 'two' },
            { id: '3', text: 'three' },
        ]
        beforeEach(() => {
            cy.mount(<Select id={id} testId={testId} label={label} options={options} onChange={({ event, newSelection }) => console.log('newSelection', newSelection)} />);
        })
        it('should render with a LABEL and the label should have expected attributes (for, and text)', () => {
            cy.getByTestId(testId)
                .find('label')
                .contains(label)
                .and('have.attr', 'for', id);
        })
        it('should render with a SELECT and the select should have expected attributes and values (id, name, value, onChange, no selection, and given options)', () => {
            cy.getByTestId(testId)
                .find('select')
                .should('have.value', '1')
                .and('have.attr', 'id', id)
                .and('have.attr', 'name', id);
            cy.getByTestId(testId).find('option')
                .should('have.length', options.length)
                .each(($option, index) => {
                    expect($option).to.have.text(options[index].text);
                    expect($option).to.have.attr('value', options[index].id);
                });
        })
        it('should render so that the label and select have corresponding values (label.for === select.id)', () => {
            cy.getByTestId(testId)
                .find('label')
                .should('have.attr', 'for', id);
            cy.getByTestId(testId)
                .find('select')
                .should('have.attr', 'id', id);
        })
        it('should update when the user selects a value', () => {
            cy.getByTestId(testId)
                .find('select')
                .should('have.value', '1')
                .select('2')
                .should('have.value', '2');
        })
    })
    context('optional props and unique renders', () => {
        const options = [
            { id: '1', text: 'one' },
            { id: '2', text: 'two' },
            { id: '3', text: 'three' },
            { id: '4', text: 'four', selected: true },
            { id: '5', text: 'five' },
        ];
        it('should show the selected option when given a selected option', () => {
            cy.mount(<Select id={id} testId={testId} label={label} options={options} onChange={({ event, newSelection }) => console.log('newSelection', newSelection)} />);
            cy.getByTestId(testId)
                .find('select')
                .should('have.value', '4');
        })
    });
});