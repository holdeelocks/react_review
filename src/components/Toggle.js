import React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext({
	on: false,
	toggle: () => {}
});

function ToggleConsumer(props) {
	return (
		<ToggleContext.Consumer>
			{context => {
				if (!context) {
					throw new Error('Toggle comopund components must be rendered within the Toggle consumer');
				}
				return props.children(context);
			}}
		</ToggleContext.Consumer>
	);
}

class Toggle extends React.Component {
	static On = ({ children }) => (
		<ToggleConsumer>{({ on }) => (on ? children : null)}</ToggleConsumer>
	);
	static Off = ({ children }) => (
		<ToggleConsumer>{({ on }) => (on ? null : children)}</ToggleConsumer>
	);
	static Button = props => (
		<ToggleConsumer>
			{({ on, toggle }) => <Switch on={on} onClick={toggle} {...props} />}
		</ToggleConsumer>
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
