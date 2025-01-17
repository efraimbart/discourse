import Component from "@ember/component";
import { computed } from "@ember/object";
import { formatUsername } from "discourse/lib/utilities";
import { normalize } from "discourse/components/user-info";
import { prioritizeNameInUx } from "discourse/lib/settings";
import { renderAvatar } from "discourse/helpers/user-avatar";
import { userPath } from "discourse/lib/url";

export default Component.extend({
  usersTemplates: computed("users.[]", function () {
    // debugger
    // window.parent && window.parent.location.reload();
    console.log("this is a test")
    return (this.users || []).map((user) => {
      let name = user.name;
      let username = user.username;
      let prioritizeName = prioritizeNameInUx(name);
      let hideName = false;
      if (name && normalize(username) === normalize(name)) {
        hideName = true;
      }

      return {
        name,
        username,
        userPath: userPath(username),
        avatar: renderAvatar(user, {
          imageSize: "large",
          siteSettings: this.siteSettings,
        }),
        title: user.title || "",
        formatedUsername: formatUsername(username),
        prioritizeName,
        hideName,
      };
    });
  }),
});
