import React from 'react';
import { Switch } from '../switch';

class Toggle extends React.Component {
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
		return <Switch on={this.state.on} />;
	}
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
	return <Toggle onToggle={onToggle} />;
}
