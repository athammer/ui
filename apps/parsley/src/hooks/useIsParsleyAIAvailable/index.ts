import {
  useAdminBetaFeatures,
  useUserBetaFeatures,
} from "@evg-ui/lib/hooks/useBetaFeatures";
import { useLogContext } from "context/LogContext";

/**
 * `useIsParsleyAIAvailable` checks if Parsley AI is available for the current log and user.
 * This matches the Parsley AI button availability logic:
 * - Button only renders for non-uploaded logs (SubHeader/index.tsx:41-58)
 * - Button checks userBetaSettings.parsleyAIEnabled (ToggleChatbotButton.tsx:26)
 * - ChatWrapper only renders drawer when adminBetaSettings.parsleyAIEnabled (LogWindow/index.tsx:42)
 * @returns true if Parsley AI is available and can be toggled
 */
const useIsParsleyAIAvailable = (): boolean => {
  const { isUploadedLog } = useLogContext();
  const { adminBetaSettings } = useAdminBetaFeatures();
  const { userBetaSettings } = useUserBetaFeatures();

  return (
    !isUploadedLog &&
    !!adminBetaSettings?.parsleyAIEnabled &&
    !!userBetaSettings?.parsleyAIEnabled
  );
};

export { useIsParsleyAIAvailable };
