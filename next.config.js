const prod = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true,
})

module.exports = withPWA({
  // config
  compiler: {
    styledComponents: true,
  },
})
