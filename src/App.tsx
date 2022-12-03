// routes
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { PublicRoutes } from "routes";
// ui
import { AppLayout } from "components/layouts";
// providers
import {
  LoginProvider,
  BackupProvider,
  UploadProvider,
  WalletProvider,
  IpfsProvider,
  GalleryProvider,
} from "components/contexts";

import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import BasicStyle from "theme/basicStyle";
import GlobalStyle from "theme/globalStyle";

const theme = extendTheme({
  components: {
    Steps,
  },
});
// TODO: to be deleted
// import { theme } from "theme/Theme.base";

const queryClient = new QueryClient();

function App() {
  return (
    <AppLayout>
      <ChakraProvider theme={theme}>
        <BasicStyle />
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Router>
            <IpfsProvider>
              <WalletProvider>
                <GalleryProvider>
                  <BackupProvider>
                    <LoginProvider>
                      <UploadProvider>
                        <PublicRoutes />
                      </UploadProvider>
                    </LoginProvider>
                  </BackupProvider>
                </GalleryProvider>
              </WalletProvider>
            </IpfsProvider>
          </Router>
        </QueryClientProvider>
      </ChakraProvider>
    </AppLayout>
  );
}

export default App;
