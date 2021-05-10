// import { fireEvent, getByText } from '@testing-library/dom'
const fireEvent = require('@testing-library/dom').fireEvent
const getByText = require('@testing-library/dom').getByText
const getByRole = require('@testing-library/dom').getByRole
require("@testing-library/jest-dom/extend-expect")
const JSDOM = require("jsdom").JSDOM
const fs = require("fs")
const path = require("path")
// import '@testing-library/jest-dom/extend-expect'
// import { JSDOM } from 'jsdom'
// import fs from 'fs'
// import path from 'path'

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

  it('renders the timer container', () => {
    expect(container.querySelector('#timerContainer')).not.toBeNull()
    expect(getByText(container, 'Go back in time (s):')).toBeInTheDocument()
    expect(getByText(container, 'Reset Clock to Forward Time')).toBeInTheDocument()

  })

  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'Reverse Time')).toBeInTheDocument()
  })

  it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    const button = getByRole(container, 'button')
    const input = getByLabel
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('#pun-container p')
    expect(generatedParagraphs.length).toBe(1)

    // fireEvent.click(button)
    // generatedParagraphs = container.querySelectorAll('#pun-container p')
    // expect(generatedParagraphs.length).toBe(2)

    // fireEvent.click(button)
    // generatedParagraphs = container.querySelectorAll('#pun-container p')
    // expect(generatedParagraphs.length).toBe(3)
  })
})