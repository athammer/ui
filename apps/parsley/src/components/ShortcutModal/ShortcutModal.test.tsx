import { useState } from "react";
import { RenderFakeToastContext } from "@evg-ui/lib/context/toast/__mocks__";
import {
  MockedProvider,
  renderWithRouterMatch as render,
  screen,
  userEvent,
  waitFor,
} from "@evg-ui/lib/test_utils";
import { LogContextProvider } from "context/LogContext";
import ShortcutModal from ".";

const ModalWrapper = () => {
  const [open, setOpen] = useState(false);
  return <ShortcutModal open={open} setOpen={setOpen} />;
};

const wrapper = () => {
  const renderContent = ({ children }: React.PropsWithChildren) => (
    <MockedProvider mocks={[]}>
      <LogContextProvider initialLogLines={[]}>{children}</LogContextProvider>
    </MockedProvider>
  );
  return renderContent;
};

describe("shortcutModal", () => {
  it("should toggle open when user executes keyboard shortcut", async () => {
    const user = userEvent.setup();
    const { Component } = RenderFakeToastContext(<ModalWrapper />);
    render(<Component />, {
      route: "/",
      wrapper: wrapper(),
    });
    expect(screen.getByDataCy("shortcut-modal")).not.toBeVisible();

    await user.keyboard("{Shift>}{?}{/Shift}");
    await waitFor(() => {
      expect(screen.getByDataCy("shortcut-modal")).toBeVisible();
    });
  });

  it("should close when the user clicks outside of the modal", async () => {
    const user = userEvent.setup();
    const { Component } = RenderFakeToastContext(<ModalWrapper />);
    render(<Component />, {
      route: "/",
      wrapper: wrapper(),
    });
    expect(screen.getByDataCy("shortcut-modal")).not.toBeVisible();

    await user.keyboard("{Shift>}{?}{/Shift}");
    await waitFor(() => {
      expect(screen.getByDataCy("shortcut-modal")).toBeVisible();
    });

    await user.click(document.body as HTMLElement);
    await waitFor(() => {
      expect(screen.getByDataCy("shortcut-modal")).not.toBeVisible();
    });
  });
});
