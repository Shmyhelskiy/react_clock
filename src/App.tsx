import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

type State = {
  clockName: string;
  today: Date;
  hasClock: boolean;
};

export class App extends React.Component {
  state: State = {
    clockName: 'Clock-0',
    today: new Date(),
    hasClock: true,
  };

  timerId = 0;

  timerName = 0;

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

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

    this.timerId = window.setInterval(() => {
      const newDate = new Date();

      // eslint-disable-next-line no-console
      console.log(newDate.toUTCString().slice(-12, -4));

      this.setState({ today: newDate });
    }, 1000);

    this.timerName = window.setInterval(() => {
      this.setState({ clockName: this.getRandomName() });
    }, 3300);
  }

  componentDidUpdate(prevState: State): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName}to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener(
      'contextmenu',
      this.handleDocumentByContextmenu,
    );

    document.removeEventListener('click', this.handleDocumentByClick);
    window.clearInterval(this.timerId);
    window.clearInterval(this.timerName);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock ? (
          <Clock name={this.state.clockName} today={this.state.today} />
        ) : null}
      </div>
    );
  }
}
