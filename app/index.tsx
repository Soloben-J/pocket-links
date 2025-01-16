import {ScrollView, Text, View} from "react-native";
import WebView from "react-native-webview";
import LinkCard from "@/components/LinkCard";

export default function Index() {
  return (
    <ScrollView>
      <View>
        <LinkCard />
      </View>
    </ScrollView>
  );
}
// export default function Index() {
//   return (
//     <WebView
//       source={{
//         // uri: 'https://kaisery.github.io/trpl-zh-cn/title-page.html'
//         uri: 'https://www.juejin.cn'
//       }}
//     />
//   );
// }
