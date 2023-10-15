import { RadioInput, onChangeI } from "./radioInput";

describe('<RadioInput />', () => {
    const id = "select-id";
    const name = "test-name";
    const testId = "test-id";
    const label = "test label";
    context('minimal props (only required props given)', () => {
        beforeEach(() => {
            cy.mount(<RadioInput id={id} testId={testId} name={name} label={label} onChange={({ event, newSelection }) => console.log('newSelection', newSelection)} />);
        });
        it('should render with a LABEL and the label should have expected attributes (for, and text)', () => {
            cy.getByTestId(testId)
                .find('label')
                .contains(label)
                .and('have.attr', 'for', id);
        })
        it('should render with a INPUT and the input should have expected attributes and values (id, name, type, value, checked, onChange and text)', () => {
            cy.getByTestId(testId)
                .find('input')
                .and('have.attr', 'value', label)
                .and('have.attr', 'id', id)
                .and('have.attr', 'name', name)
                .and('have.attr', 'type', 'radio')
                .and('not.be.checked')
                .and('not.have.attr', 'aria-labelledby');
        });
        it('should render so that the label and input have corresponding values (label.for === input.id)', () => {
            cy.getByTestId(testId)
                .find('label')
                .should('have.attr', 'for', id);
            cy.getByTestId(testId)
                .find('input')
                .should('have.attr', 'id', id);
        });
        it('should render with no mirage when not given a mirage', () => {
            cy.getByTestId(testId)
                .find('[data-testId="mirage-container"]')
                .should('not.exist');
        })
        it('should update when the user clicks the radio', () => {
            cy.getByTestId(testId)
                .find('input')
                .should('be.not.checked')
                .check();
            cy.getByTestId(testId)
                .find('input')
                .should('be.checked');
        });
    });
    context('optional props', () => {
        const standardProps = { id, testId, name, label, onChange: ({ event, newSelection }: onChangeI) => console.log('newSelection', newSelection) };
        it('should render as selected when given a selected prop with a true value', () => {
            cy.mount(<RadioInput {...standardProps} selected={true} />);
            cy.getByTestId(testId)
                .find('input')
                .should('be.checked');
        });
        it('should render as not selected when given a selected prop with a false value', () => {
            cy.mount(<RadioInput {...standardProps} selected={false} />);
            cy.getByTestId(testId)
                .find('input')
                .should('be.not.checked');
        });
        it('should visually hide the input when given a hideInput prop with a true value', () => {
            cy.mount(<RadioInput {...standardProps} hideInput={true} />);
            cy.getByTestId(testId)
                .find('input')
                .should('have.class', 'visually-hidden');
        });
        it('should not visually hide the input when given a hideInput prop with a false value', () => {
            cy.mount(<RadioInput {...standardProps} hideInput={false} />);
            cy.getByTestId(testId)
                .find('input')
                .should('not.have.class', 'visually-hidden');
        });
        it('should render a mirage when given a mirage prop and visually hide the input and label elements', () => {
            const mirage = () => <div data-testId="mirage">mirage</div>;
            cy.mount(<RadioInput {...standardProps} mirage={mirage} />);
            cy.getByTestId(testId)
                .find('input')
                .should('have.class', 'visually-hidden')
            cy.getByTestId(testId)
                .find('label')
                .should('have.class', 'visually-hidden')
            cy.getByTestId(testId)
                .find('[data-testId="mirage-container"]')
                .should('exist');
            cy.getByTestId(testId)
                .find('[data-testId="mirage"]')
                .should('exist');
        });
        it('should not render a mirage when not given a mirage prop', () => {
            cy.mount(<RadioInput {...standardProps} />);
            cy.getByTestId(testId)
                .find('input')
                .should('not.have.class', 'visually-hidden');
            cy.getByTestId(testId)
                .find('label')
                .should('not.have.class', 'visually-hidden');
            cy.getByTestId(testId)
                .find('[data-testId="mirage-container"]')
                .should('not.exist');
            cy.getByTestId(testId)
                .find('[data-testId="mirage"]')
                .should('not.exist');
        });
        it('should render with aria attributes when given ariaLabelledBy values', () => {
            const ariaLabelledBy = "ariaLabelledBy";
            cy.mount(<RadioInput {...standardProps} ariaLabelledBy={ariaLabelledBy} />);
            cy.getByTestId(testId)
                .find('input')
                .should('have.attr', 'aria-labelledby', `${name}_${id} ${ariaLabelledBy}`);
            cy.getByTestId(testId)
                .find('label')
                .should('have.attr', 'id', `${name}_${id}`)
                .and('not.have.attr', 'for');
        });
    });
});