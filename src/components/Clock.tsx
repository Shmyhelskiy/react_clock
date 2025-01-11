import React from 'react';
import './Clock.scss';

type ClockProps = {
  name: string;
  today: Date;
};

export class Clock extends React.Component<ClockProps> {
  timerId = 0;

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        <span className="Clock__time">
          {this.props.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
