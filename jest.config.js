/* TODO: Get react-dnd play nice with jest

   Explanation: This is a huge issue with react-dnd at the moment.
   Jest works just fine when I'm importing functions from files 
   that dont lead back to a react-dnd import. As soon as it runs 
   into a react-dnd import it will attempt to import it and barf 
   on the first export it finds.

   Hypothesis: I think react-dnd may export its library in a way
   that jest can't read.

   Trouble Shooting: I have tried to tell jest to ignore
   react-dnd imports by adding it to the transformIgnorePatterns
   but I've had no luck so far. I have passively tried to mock
   it with tools given by react-dnd but I'd need to dig deeper
   to give it a real shot.

   Potential Solution: I think the answer is to mock react-dnd.
   It short circuits any traspiling issues. I'll need to look into
   this furhter but Ive spent enough time on this for now.

   Helpful Links:
   Github Issue: https://github.com/react-dnd/react-dnd/issues/3443
   Github Issue: https://github.com/react-dnd/react-dnd/issues/3626
   NextJs with-jest example project: https://github.com/vercel/next.js/tree/canary/examples/with-jest
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage'
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
