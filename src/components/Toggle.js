import React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext();

class Toggle extends React.Component {
	static On = ({ children }) => (
		<ToggleContext.Consumer>
			{contextValue => (contextValue.on ? children : null)}
		</ToggleContext.Consumer>
	);
	static Off = ({ children }) => (
		<ToggleContext.Consumer>
			{contextValue => (contextValue.on ? null : children)}
		</ToggleContext.Consumer>
	);
	static Button = props => (
		<ToggleContext.Consumer>
			{contextValue => <Switch on={contextValue.on} onClick={contextValue.toggle} {...props} />}
		</ToggleContext.Consumer>
	);

	state = {
		on: false
	};

	toggle = () => {
		this.setState(
			({ on }) => ({ on: !on }),
			() => {
				this.props.onToggle(this.state.on);
			}
		);
	};
	render() {
		return (
			<ToggleContext.Provider
				value={{
					on: this.state.on,
					toggle: this.toggle
				}}
			>
				{this.props.children}
			</ToggleContext.Provider>
		);
	}
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
	return (
		<Toggle onToggle={onToggle}>
			<Toggle.On>The button is on</Toggle.On>
			<Toggle.Off>The button is off</Toggle.Off>
			<div>
				<Toggle.Button />
			</div>
		</Toggle>
	);
}
Usage.title = 'Flexible Compound Components';

export { Toggle, Usage as default };
