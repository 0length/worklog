import { Observable as Obs, empty, observable } from "rxjs"
import { startWith, finalize } from "rxjs/operators"
const Observable: any = Obs
Observable.fromEventArgs = ( eventArgs: any, uniqueId: string ) => {
    if ( !Observable.fromEventArgs.instances ) {
      Observable.fromEventArgs.instances = []
    }
    // If instance is found, it is already listening to events, so no need to return it
    if ( Observable.fromEventArgs.instances && !( uniqueId in Observable.fromEventArgs.instances ) && event ) {
        // console.log(!(uniqueId in Observable.fromEventArgs.instances) ,event)
      Observable.fromEventArgs.instances[ uniqueId ] =
      Observable.fromEvent( event.target, event.type ).pipe(
        startWith( event ),
        finalize( () => {
            if( Observable.fromEventArgs.instances ){
                delete Observable.fromEventArgs.instances[ uniqueId ]
            }
        })
      )
      return Observable.fromEventArgs.instances[ uniqueId ]
    }
    return empty()
  }
const fromEventArgs = Observable.fromEventArgs
export default fromEventArgs