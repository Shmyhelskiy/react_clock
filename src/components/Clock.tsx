import React from 'react';
import './Clock.scss';

type ClockProps = {
  name: string;
  updateClockName: (newName: string) => void;
};
type State = {
  today: Date;
};

export class Clock extends React.Component<ClockProps> {
  state: State = {
    today: new Date(),
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
    this.timerId = window.setInterval(() => {
      const newDate = new Date();

      // eslint-disable-next-line no-console
      console.log(newDate.toUTCString().slice(-12, -4));

      this.setState({ today: newDate });
    }, 1000);

    this.timerName = window.setInterval(() => {
      const newName = this.getRandomName();

      this.props.updateClockName(newName);
    }, 3300);
  }

  componentDidUpdate(prevProps: Readonly<ClockProps>): void {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
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
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
