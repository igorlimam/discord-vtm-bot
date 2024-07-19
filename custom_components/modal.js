import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const modal = {
    name: "modal",
    description: "modal to choose character gender and name",
    run: async ({ interaction }) => {
        const modal = new ModalBuilder({
            customId: `charNameGender-${interaction.user.id}`,
            title: "Character data",
        })

        const genderInput = new TextInputBuilder({
            customId: "charGenderInput",
            label: "Gender",
            style: TextInputStyle.Short,
        })

        const nameInput = new TextInputBuilder({
            customId: "charNameInput",
            label: "Name",
            style: TextInputStyle.Short,
        })

        const genderActionRow = new ActionRowBuilder().addComponents(genderInput);
        const nameActionRow = new ActionRowBuilder().addComponents(nameInput);

        modal.addComponents(genderActionRow, nameActionRow);

        await interaction.showModal(modal);
    }

    /*return res.send({
        type: InteractionResponseType.MODAL,
        data: {
          title: "Choose gender and name for you character",
          custom_id: "charIdentityModal",
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  required: true,
                  custom_id: "charGenGender",
                  type: MessageComponentTypes.INPUT_TEXT,
                  label: "Gender",
                  style: TextStyleTypes.SHORT,
                }
              ]
            },
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.INPUT_TEXT,
                  custom_id: "charGenName",
                  label: "Name",
                  style: TextStyleTypes.SHORT,
                }
              ]
            },
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  custom_id: "cancelGen",
                  label: "Cancel",
                  style: ButtonStyleTypes.DANGER,
                },
                {
                  type: MessageComponentTypes.BUTTON,
                  custom_id: "goGen",
                  label: "Generate",
                  style: ButtonStyleTypes.PRIMARY,
                }
              ]
            }
          ]
        },
      });*/
}