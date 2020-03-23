import React from 'react';
import { Platform } from "react-native";

import {  inject, observer } from "mobx-react";

const IS_WEB = Platform.OS === "web";

const webPaths: any = {
  Home: "/",
  Details: "/details"
}

function resolveHybridPath(screenName: string) {
  // in the case of web we need to return a normal href
  // otherwise it should be the screen name 
  // because on mobile we don't have href's
  return IS_WEB ? webPaths[ screenName ] : screenName;
}



export default function withNavigation(Component: any) {
  function withNavigationRender(props: any) {

    const { routingStore, navigation, ...otherProps } = props;

    const navAdapter = {
        navigate: function(screenName: string) {
            const resolvedPath = resolveHybridPath(screenName);
            const fn = IS_WEB ? props.routingStore.push : props.navigation.navigate;
            fn(resolvedPath);
        },
        push: function(screenName: string) {
            const resolvedPath = resolveHybridPath(screenName);
            const fn = IS_WEB ? props.routingStore.push : props.navigation.push;
            fn(resolvedPath);
        },
        goBack: IS_WEB ? props.routingStore.goBack : props.navigation.goBack
      }
    
    return <Component navigation={navAdapter} {...otherProps}/>
  }

  return IS_WEB ? inject("routingStore")(observer(withNavigationRender)) : withNavigationRender;
}
