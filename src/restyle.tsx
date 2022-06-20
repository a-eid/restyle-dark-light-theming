import * as React from "react"
import { ThemeProvider, createBox, createText, createRestyleComponent, createVariant, VariantProps, createTheme } from "@shopify/restyle"
import { Appearance } from "react-native"
import { StatusBar } from "expo-status-bar"
import { atom, useAtom } from "react-atomic-state"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()
const storedTheme = storage.getString("color-scheme") as "light" | "dark" | "default" | undefined
export const themeAtom = atom<"light" | "dark" | "default">(storedTheme === undefined ? Appearance.getColorScheme() : storedTheme)

themeAtom.subscribe(val => {
  storage.set("color-scheme", val)
})

Appearance.addChangeListener(({ colorScheme }) => {
  if (themeAtom.get() === "default") {
    themeAtom.set(colorScheme)
  }
})

export function REProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useAtom(themeAtom)
  const scheme = colorScheme === "default" ? Appearance.getColorScheme() : colorScheme

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent style={scheme === "dark" ? "light" : "dark"} />
      <ThemeProvider theme={scheme === "dark" ? darkTheme : theme} children={children} />
    </>
  )
}

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  white: "#F0F2F3",
}

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    mainText: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: "mainText",
    },
    subheader: {
      fontWeight: "600",
      fontSize: 28,
      lineHeight: 36,
      color: "mainText",
    },
    body: {
      textAlign: "left",
      fontSize: 16,
      lineHeight: 24,
      color: "mainText",
    },
    defaults: {
      textAlign: "left",
      fontSize: 16,
      lineHeight: 24,
      color: "mainText",
    },
  },
})

const darkTheme = createTheme({
  ...theme,
  colors: {
    mainBackground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    mainText: palette.white,
  },
})

export type Theme = typeof theme

export const Box = createBox<Theme>()
export const Text = createText<Theme>()
