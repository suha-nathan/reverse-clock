const {fireEvent, getByText, getByRole, getByTestId, getByLabelText, waitFor } = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')
const JSDOM = require("jsdom").JSDOM
const fs = require("fs")
const path = require("path")

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: "usable" })
    container = dom.window.document.body
  })

//   it('can load a script', () => {
//     const handler = jest.fn();
//     render(<script src="./index.js" />);
//     const script = document.querySelector('script');
//     script.onload = handler;
//     expect(handler).not.toHaveBeenCalled();
//     fireEvent.load(script);
//     expect(handler).toHaveBeenCalled();
// });

  it('renders the timer container', () => {
    expect(container.querySelector('#timerContainer')).not.toBeNull()
    expect(getByText(container, 'Go back in time (s):')).toBeInTheDocument()
    expect(getByText(container, 'Reset Clock to Forward Time')).toBeInTheDocument()

  })

  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'Reverse Time')).toBeInTheDocument()
  })

  it('renders correct input value and clock time on load', async () => {
    const button = getByRole(container, 'button')
    const input = getByLabelText(container, 'Go back in time (s):', {selector: 'input'})
    expect(input.value).toBe('0')
    // const clockDiv = container.querySelector('.clock-time')

    // fireEvent.change(input, { target: { value: '0' } })
    // fireEvent.click(button)

    const clockDiv = getByTestId(container,"clock-time").textContent
    const currentTime = new Date()
    const clockTime = "Current Time: "+ currentTime.getHours() +" hour " + currentTime.getMinutes() + " minutes " + currentTime.getSeconds() + " seconds." 

    expect(clockDiv).toBe(clockTime)
  })

  it('renders correct clock value on user input of 2 seconds', async () => {
    const button = getByRole(container, 'button')
    const input = getByLabelText(container, 'Go back in time (s):', {selector: 'input'})
    fireEvent.change(input, { target: { value: '2' } })
    fireEvent.click(button)

    const clockDiv = getByTestId(container,"clock-time").textContent
    expect(clockDiv).not.toBeNull()
    // const reversedTime 
    // const clockTime = "Current Time: "+ reversedTime.getHours() +" hour " + reversedTime.getMinutes() + " minutes " + reversedTime.getSeconds() + " seconds." 
    // expect(clockDiv).toBe(clockTime)
  })

})