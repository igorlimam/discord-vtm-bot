import 'dotenv/config';
import axios from 'axios';
import express, { response } from 'express';
import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
  TextStyleTypes,
  InteractionResponseFlags,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest, functionGTPRequest } from './utils.js';
import { getPowerDisciplineDescription } from './disciplineCommand.js'

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data, token } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  //handle button press
  if(type == InteractionType.MESSAGE_COMPONENT){
    const componentId = data.custom_id;
    if(componentId.startsWith("generate-char")){
      try {
        return res.send({
          type: InteractionResponseType.MODAL,
          data: {
            title: "Choose gender and name for you character",
            custom_id: `charIdentityModal-${componentId.split('-').slice(-2).join("-")}`,
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
                    required: false,
                    type: MessageComponentTypes.INPUT_TEXT,
                    custom_id: "charGenName",
                    label: "Name",
                    style: TextStyleTypes.SHORT,
                  }
                ]
              }
            ]
          },
        });
      }catch(err){
        console.error('Error sending message:', err);
      }
    }
  }

  //handle modal submit
  if(type == InteractionType.MODAL_SUBMIT){
    const componentId = data.custom_id;
    const clanName = componentId.split('-').slice(-1).shift();
    const gender = data.components[0].components[0].value.toLowerCase();
    const name = data.components[1].components[0].value?.toLowerCase() || "";
    if(componentId.startsWith(`charIdentityModal`)){
      //const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
      //await DiscordRequest(endpoint, { method: 'DELETE' });
      console.log(data);
      functionGTPRequest(clanName);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }
  }

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    if (name === 'ping') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Pong!',
        },
      });
    }

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }

    if(name === 'generate' && id){
      const userId = req.body.member.user.id;
      const clanName = req.body.data.options[0].value;
      console.log(data)
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          flags: InteractionResponseFlags.EPHEMERAL,
          content: 'Generation character of clan ' + clanName,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  custom_id: `generate-char-${userId}-${clanName}`,
                  label: "Continue",
                  style: ButtonStyleTypes.PRIMARY
                }
              ]
            }
          ]
        },
      });
    }

    if(name === 'discipline'){
      console.log(data)
      let inputObject = data.options[0]
      let discipline = inputObject.name
      let power = inputObject.options[0].name;
      console.log(discipline)
      console.log(power)
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
      });
      let response = "";
      try{
        response = await getPowerDisciplineDescription(discipline, power);
      }catch(e){
        response = e;
      }
      console.log(response)
      try {
        const webhookUrl = `https://discord.com/api/v10/webhooks/${process.env.APP_ID}/${token}`;

        await axios.post(webhookUrl, {
            content: "Request processed successfully!"
        });

        console.log('Follow-up message sent.');
    } catch (followUpError) {
        console.error('Failed to send follow-up:', followUpError);
    }
    }

  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
