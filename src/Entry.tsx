import { TouchableOpacity } from "react-native"
import overrideColorScheme from "react-native-override-color-scheme"

import { REProvider, Box, Text, themeAtom } from "./restyle"

export function Entry() {
  return (
    <REProvider>
      <Box bg="mainBackground" flex={1} alignItems="center" justifyContent="center">
        <Text variant="header">Here</Text>
        <TouchableOpacity
          onPress={() => {
            themeAtom.set("dark")
            overrideColorScheme.setScheme("dark")
          }}
        >
          <Box m="m">
            <Text>Dark</Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            themeAtom.set("light")
            overrideColorScheme.setScheme("light")
          }}
        >
          <Box m="m">
            <Text>Light</Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            themeAtom.set("default")
            overrideColorScheme.setScheme(undefined)
          }}
        >
          <Box m="m">
            <Text>System</Text>
          </Box>
        </TouchableOpacity>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti est quos quam deserunt dignissimos quo laborum soluta eligendi cum officia similique ea veniam
          necessitatibus, nostrum explicabo fugit error itaque molestias.
        </Text>
      </Box>
    </REProvider>
  )
}
