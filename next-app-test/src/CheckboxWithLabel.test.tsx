import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from './CheckboxWithLabel';

function renderLoginForm({labelOn, labelOff}: {labelOn: string, labelOff: string}) {
  //const defaultProps = props; //{labelOn: "On", labelOff: "Off"};
  return render(<CheckboxWithLabel labelOn={labelOn} labelOff={labelOff}/>);
}

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const { queryByLabelText, getByLabelText } = renderLoginForm({labelOn: 'ON', labelOff: 'OFF'});
  // const {queryByLabelText, getByLabelText} = render(
  //   <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  // );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});