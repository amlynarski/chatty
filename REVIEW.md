# Adam Młynarski code review

## Init

* Nice readme with step by step setup
* Lack of `.gitignore`
* Everything done on master branch in just few commits
* consts.ts - could be overwriten by env vars to avoid constant edits on each machine
* No .eslintrc or .prettierrc



## Location of schema files

* ConversationContext needs to do deep import from '../../screens/conversation/conversation.schema'
  On the other hand AuthContext has schemas in the same directory. 
  Might be better to group components and context by feature for easier imports and sharing schema
  Or put schemas in top level directory easy to access from all files
	
## App.tsx

* Add index.ts or internal package.json for shorter imports:
`import { ErrorMessagesContextProvider } from './src/globalContexts/ErrorMessages';`
instead of:
`import ErrorMessagesContextProvider from './src/globalContexts/ErrorMessages/ErrorMessagesContextProvider';`

## ApolloContextProvide

* `'OperationDefinition'` and `'subscription'` could be extracted as constant values with descriptive names

## Conversation

* `utils.ts` implementation could be simplified by inverting `if` conditions:

```js
export function getUpdatedConversationsWithReadBy(conversations: Conversation[], message: Message): Conversation[] {
  return conversations.map(conv => {
    if (conv.id !== message.conversation.id) {
        return conv;
    }

    return ({
      ...conv,
      messages: conv.messages.map(msg => {
        if (msg.id !== message.id) {
            return msg
        }
        return ({ ...msg, readBy: message.readBy })
      })
    })
  })
}
```

* `utils.ts.` test is checking only if given message was modified but doesn't check if others are returned intact

* Very similar code is used in `ConversationContextProvider.ts` and `utils.ts`.
	It might be good to write that util function in a bit more reusable way to cover that case as well

## NetworkStatus

* By default state is set to true. What if user start app when offline?


## navigation/Navigation

* Two nested ternary operators are a bit too much. How about this:

```js
export const Navigation = () => {
  const containerRef = React.useRef();

  const {token, loading, me} = useContext<AuthContextType>(AuthContext);

  const renderContent = () => {
    if (loading) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />
    }

    if (token && me) {
      return <Stack.Screen name="Root" component={BottomTabNavigator} />
    }

    return <Stack.Screen name="Login" component={LoginScreen} />
  }

  return(
    <NavigationContainer ref={containerRef}>
      <Stack.Navigator headerMode="none">
        { renderContent() }
      </Stack.Navigator>
    </NavigationContainer>
  )
};
```

## components/Badge

* Why `export Badge` instead of `export default Badge` ? All screens are using `export default`

## screens/conversations/utils

* `reduce` is usually difficult to read, debug and extend. Vanilla JavaScript is lacking a bit with good functional toolkit but could be implemented in simpler way using only sum (from lodash for example) and map:

```js
export function countNotReadMessages(conversation: Conversation, me: User): number {
  return sum(conversation.messages.map((message) => {
    if (message.author.id === me.id) {
      return 0
    }
    if (!!message.readBy.find(user => user.id === me.id)) {
      return 0
    }
    return 1 
  })
}
```

## screens/conversation/Messages and MessageItem

* Mixed StyleSheets and inline styling - better to keep everything organized in nicely separated StyleSheet 

## screens/conversation/ConversationScreen.test

* Does all providers have to be added as a boilerplate to run a few tests on ConversationScreen? Quite a lot of boilerplate


## utils.getFormattedTime

* `date-fns` is pretty nice and very modular, or `moment.js` since we don't have to worry too much about bundle size
* That line is a bit loooong ;)
