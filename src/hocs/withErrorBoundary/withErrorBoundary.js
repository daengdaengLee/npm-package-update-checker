import React, { Component } from "react";

const DefaultFallbackComp = () => <div>Something broken!</div>;
const onErrorDefault = () => {};

const withErrorBoundary = (
  Comp,
  FallbackComp = DefaultFallbackComp,
  onError = onErrorDefault
) => {
  const CompWithErrorBoundary = class CompWithErrorBoundary extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };
    }

    render() {
      const {
        props,
        state: { error }
      } = this;

      if (error) return <FallbackComp error={error} originalProps={props} />;

      return <Comp {...props} />;
    }

    componentDidCatch(error, info) {
      onError(error, info);
      this.setState({ error });
    }
  };

  const name = Comp.displayName || Comp.name;
  CompWithErrorBoundary.displayName = `WithErrorBoundary(${name || "noname"})`;

  return CompWithErrorBoundary;
};

export default withErrorBoundary;
