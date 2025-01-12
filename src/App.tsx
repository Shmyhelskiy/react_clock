import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

type State = {
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component {
  state: State = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  updateClockName = (newName: string) => {
    this.setState({ clockName: newName });
  };

  handleDocumentByContextmenu = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({ hasClock: false });
  };

  handleDocumentByClick = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.handleDocumentByContextmenu);

    document.addEventListener('click', this.handleDocumentByClick);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock ? (
          <Clock
            name={this.state.clockName}
            updateClockName={this.updateClockName}
          />
        ) : null}
      </div>
    );
  }
}
