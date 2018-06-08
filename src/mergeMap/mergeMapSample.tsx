import { Observable, from, of, fromEvent, interval, Subscription } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import * as React from 'react';

export class MergeMapSample extends React.Component {
    private _element: HTMLElement;
    private _mmButton: HTMLButtonElement;

    private subscribe : Subscription;

    componentDidMount() {
        console.clear(); this.init();
    }

    componentWillUnmount(){
        this.subscribe.unsubscribe();
    }

    init() {        
        const click$ = fromEvent(this._mmButton, 'click');
        const interval$ = interval(1000);

        // merge map        
        const example = click$.pipe(
            mergeMap((val, index) => interval$.pipe(
                map(t => `${val.timeStamp} ${t}`)
            ))
        )
        
        //output: 11,12,13,14,15
        this.subscribe = example.subscribe(val => console.log(val));
    }

    render() {
        return (
            <div>
                <h1>MergeMap</h1>                
                <p>
                    In this example, we have created an observable from the click event attached to the button below.
                </p>
                <p>
                    We have also defined an interval observable, <i>T</i>, which will generate a sequence of ever-increasing integers, one per second.
                </p>
                <p>
                    Our console log is generated by a subscription on <em>E</em> - that is, we are subscribed to the click event stream.
                </p>
                <p>
                    We have called mergeMap on <em>E</em>, from which we return <em>T</em>. Essentially, we are merging emissions from the observable <em>T</em> into the observable <em>E</em>. 
                    You will observe that the console log output includes the timestamp of the event (that is, when the button was clicked)
                    along with the sequence number from the interval. 
                </p>
                <p>
                    Clicking multiple times will merge multiple intervals into <em>E</em>, each with their own event timestamp. 
                </p>                                
                <button ref={x => this._mmButton = x}>Click me</button>
                <p>
                <code>
                    const example = E.pipe(<br /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;mergeMap((val, index) => T.pipe(<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map(t => `&#123;$val.timeStamp} $&#123;t}`)<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;))<br />
                    );<br />
                    <br />
                    example.subscribe(val => console.log(val));
                </code>
                </p>            
            </div>
        );
    }
}