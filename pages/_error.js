import ErrorPage from 'next/error'
import React from 'react'
const Component = () => {
  return class WithError extends React.Component {
    static async getInitialProps(ctx) {
      const props =
        (Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null) || {}
      if (props.statusCode && ctx.res) {
        ctx.res.statusCode = props.statusCode
      }
      return props
    }
    render() {
      console.log(this.props.statusCode)
      if (this.props.statusCode) {
        return (
          <>
            <ErrorPage statusCode={this.props.statusCode} />
          </>
        )
      }
      return <Component {...this.props} />
    }
  }
}

export default Component
