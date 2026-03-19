//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.63;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.63] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Reference Switches and Reference Variables
 * ============================================================================
 * 
 * Reference Switches and Reference Variables are added in version 1.62 of this
 * plugin. These switches and variables allow you to reference them through
 * strings when using script calls.
 * 
 * By simply naming your switch or variable ((Reference Name)), you can use
 * that 'reference name' in a string to call them for script calls. This is
 * just so you don't need to remember the ID's of every other Switch/Variable.
 * 
 * When referencing the strings in the script calls, case does not matter,
 * which means you can use all capitals or all lower case and they'll still
 * reference the same switch or variable.
 * 
 * ---
 * 
 * For example:
 * 
 *   ---
 * 
 *   Switch 10 Name: ((Priscilla Joined))
 * 
 *   Script Call: $gameSwitches.value('Priscilla Joined')
 *                $gameSwitches.setValue('Priscilla Joined', true)
 * 
 *   ---
 * 
 *   Variable 20 Name: Total ((Goblins Slain))
 * 
 *   Script Call: $gameVariables.value('Goblins Slain')
 *                $gameVariables.setValue('Goblins Slain', 50)
 * 
 *   ---
 * 
 * Remember to put quotes around the name for the script call!
 * 
 * This only applies for the $gameSwitches and $gameVariables functions of
 * value(id) and setValue(id, value). They do not apply to the other
 * $gameSwitches and $gameVariables functions.
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Shadow Visibility Plugin Commands ===
 * 
 * ---
 * 
 * Shadow Hide: Player
 * - Hides the visibility of the player sprite shadow.
 * 
 * ---
 * 
 * Shadow Hide: Followers
 * - Hides the visibility of follower sprite shadows.
 * 
 * ---
 * 
 * Shadow Hide: All Events
 * - Hides the visibility of all event sprite shadows.
 * 
 * ---
 * 
 * Shadow Show: Player
 * - Returns the visibility of the player sprite shadow.
 * - Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * ---
 * 
 * Shadow Show: Followers
 * - Returns the visibility of follower sprite shadows.
 * - Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * ---
 * 
 * Shadow Show: All Events
 * - Returns the visibility of all event sprite shadows.
 * - Does NOT override Plugin Parameter or <Hide Shadow> notetag.
 * 
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 * 
 * Shadows do NOT appear for sprites using a "!" as their leading filename
 * marker. These sprites are environmental and are considered "object"
 * characters by the RPG Maker MZ core scripts. They do not utilize character
 * shadows due.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 * 
 *   Shadow Z Layer:
 *   - What is the sprite Z layer used for the shadow sprites?
 *     - In-game layers are as follows:
 *     - 0 : Lower tiles
 *     - 1 : Lower characters
 *     - 3 : Normal characters
 *     - 4 : Upper tiles
 *     - 5 : Upper characters
 *     - 6 : Airship shadow
 *     - 7 : Balloon
 *     - 8 : Animation
 *     - 9 : Destination
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.63: February 16, 2026
 * * Feature Update!
 * ** When moving by clicking and holding down the mouse button, the touch
 *    input will no longer lock onto any events with empty event lists or
 *    populated by just comments. Update made by Arisu.
 * 
 * Version 1.62: January 19, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added: Reference Switches and Reference Variables
 * *** Reference Switches and Reference Variables are added in version 1.62 of
 *     this plugin. These switches and variables allow you to reference them
 *     through strings when using script calls.
 * *** By simply naming your switch or variable ((Reference Name)), you can use
 *     that 'reference name' in a string to call them for script calls.
 * *** When referencing the strings in the script calls, case does not matter,
 *     which means you can use all capitals or all lower case and they'll still
 *     reference the same switch or variable.
 * **** Example: Switch 10 Name: ((Priscilla Joined))
 * ***** Script Call: $gameSwitches.value('Priscilla Joined')
 * ***** $gameSwitches.setValue('Priscilla Joined', true)
 * **** Variable 20 Name: Total ((Goblins Slain))
 * ***** $gameVariables.value('Goblins Slain')
 * ***** $gameVariables.setValue('Goblins Slain', 50)
 * *** Remember to put quotes around the name for the script call!
 * *** This only applies for the $gameSwitches and $gameVariables functions of
 *     value(id) and setValue(id, value). They do not apply to the other
 *     $gameSwitches and $gameVariables functions.
 * * New Features!
 * ** Added Reference Switches and Reference Variables
 * *** See Help section for more info about Reference Switches and Variables
 * ** New Plugin Commands added:
 * *** Shadow Hide: Player
 * *** Shadow Hide: Followers
 * *** Shadow Hide: All Events
 * **** Hides the visibility of the target sprite shadow.
 * *** Shadow Show: Player
 * *** Shadow Show: Followers
 * *** Shadow Show: All Events
 * **** Returns the visibility of target sprite shadow.
 * **** Does NOT override Plugin Parameter "Shadows > Show" if off.
 * **** Does NOT override <Hide Shadow> notetag.
 * 
 * Version 1.61: December 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where shadows would appear under lower-priority event sprites
 *    making usage of certain tiles awkward looking. This is corrected by the
 *    new Plugin Parameter. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Arisu:
 * *** Parameters > Movement Settings > Shadows > Shadow Z Layer
 * **** What is the sprite Z layer used for the shadow sprites?
 * **** By default, this layer will now be 0.5 instead of 0.
 * * Feature Update!
 * ** If a event is made whose priority is "Below characters" and is a tile
 *    object (ie taking a sprite from the map tileset or a character sprite
 *    with "!" in front of the name), it will be automatically regulated to
 *    a custom Z layer of 0.
 * 
 * Version 1.60: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where events with large hitboxes do not work with crash move.
 *    Fix made by Arisu.
 * ** Fixed a bug where single-mode save games by Save Core would freeze after
 *    executed event movements. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shadow
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHidePlayer
 * @text Shadow Hide: Player
 * @desc Hides the visibility of the player sprite shadow.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHideFollowers
 * @text Shadow Hide: Followers
 * @desc Hides the visibility of follower sprite shadows.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHideAllEvents
 * @text Shadow Hide: All Events
 * @desc Hides the visibility of all event sprite shadows.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowPlayer
 * @text Shadow Show: Player
 * @desc Returns the visibility of the player sprite shadow.
 * Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowFollowers
 * @text Shadow Show: Followers
 * @desc Returns the visibility of follower sprite shadows.
 * Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowAllEvents
 * @text Shadow Show: All Events
 * @desc Returns the visibility of all event sprite shadows.
 * Does NOT override Plugin Parameter or <Hide Shadow> notetag.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param ShadowLayer:num
 * @text Shadow Z Layer
 * @parent Shadows
 * @desc What is the sprite Z layer used for the shadow sprites?
 * @default 0.5
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x44537c=_0x41af;(function(_0x580fa6,_0x283560){const _0x4e910a=_0x41af,_0x2cdf11=_0x580fa6();while(!![]){try{const _0x6756f=-parseInt(_0x4e910a(0x5fc))/0x1+-parseInt(_0x4e910a(0x3a0))/0x2+parseInt(_0x4e910a(0x315))/0x3*(-parseInt(_0x4e910a(0x39b))/0x4)+-parseInt(_0x4e910a(0x238))/0x5*(-parseInt(_0x4e910a(0x554))/0x6)+-parseInt(_0x4e910a(0x1d9))/0x7*(parseInt(_0x4e910a(0x5bb))/0x8)+-parseInt(_0x4e910a(0x20b))/0x9+parseInt(_0x4e910a(0x3aa))/0xa;if(_0x6756f===_0x283560)break;else _0x2cdf11['push'](_0x2cdf11['shift']());}catch(_0x4d5d65){_0x2cdf11['push'](_0x2cdf11['shift']());}}}(_0x47f1,0x18e56));var label=_0x44537c(0x646),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x44537c(0x60f)](function(_0x40d4cc){const _0x5d1c4b=_0x44537c;return _0x40d4cc[_0x5d1c4b(0x46e)]&&_0x40d4cc[_0x5d1c4b(0x507)][_0x5d1c4b(0x680)]('['+label+']');})[0x0];VisuMZ[label][_0x44537c(0x633)]=VisuMZ[label][_0x44537c(0x633)]||{},VisuMZ['ConvertParams']=function(_0x386df9,_0x610177){const _0x281202=_0x44537c;for(const _0x3def2f in _0x610177){if(_0x3def2f[_0x281202(0x276)](/(.*):(.*)/i)){const _0xdeeca3=String(RegExp['$1']),_0x5f35dc=String(RegExp['$2'])[_0x281202(0x526)]()[_0x281202(0x35e)]();let _0x5b3dba,_0x1cef6d,_0x429bbb;switch(_0x5f35dc){case _0x281202(0x417):_0x5b3dba=_0x610177[_0x3def2f]!==''?Number(_0x610177[_0x3def2f]):0x0;break;case _0x281202(0x3e0):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON[_0x281202(0x25d)](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x189551=>Number(_0x189551));break;case'EVAL':_0x5b3dba=_0x610177[_0x3def2f]!==''?eval(_0x610177[_0x3def2f]):null;break;case _0x281202(0x5dc):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON[_0x281202(0x25d)](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x208663=>eval(_0x208663));break;case'JSON':_0x5b3dba=_0x610177[_0x3def2f]!==''?JSON[_0x281202(0x25d)](_0x610177[_0x3def2f]):'';break;case _0x281202(0x3bd):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON[_0x281202(0x25d)](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x1971c6=>JSON[_0x281202(0x25d)](_0x1971c6));break;case'FUNC':_0x5b3dba=_0x610177[_0x3def2f]!==''?new Function(JSON[_0x281202(0x25d)](_0x610177[_0x3def2f])):new Function(_0x281202(0x66a));break;case _0x281202(0x38f):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON['parse'](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x4f5f60=>new Function(JSON['parse'](_0x4f5f60)));break;case _0x281202(0x31f):_0x5b3dba=_0x610177[_0x3def2f]!==''?String(_0x610177[_0x3def2f]):'';break;case _0x281202(0x675):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON['parse'](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x52bcdb=>String(_0x52bcdb));break;case _0x281202(0x519):_0x429bbb=_0x610177[_0x3def2f]!==''?JSON[_0x281202(0x25d)](_0x610177[_0x3def2f]):{},_0x386df9[_0xdeeca3]={},VisuMZ[_0x281202(0x2a5)](_0x386df9[_0xdeeca3],_0x429bbb);continue;case _0x281202(0x38b):_0x1cef6d=_0x610177[_0x3def2f]!==''?JSON['parse'](_0x610177[_0x3def2f]):[],_0x5b3dba=_0x1cef6d[_0x281202(0x5d9)](_0x1a6fb0=>VisuMZ['ConvertParams']({},JSON[_0x281202(0x25d)](_0x1a6fb0)));break;default:continue;}_0x386df9[_0xdeeca3]=_0x5b3dba;}}return _0x386df9;},(_0x26c573=>{const _0x3ae18f=_0x44537c,_0x1bf868=_0x26c573[_0x3ae18f(0x58a)];for(const _0x3579a1 of dependencies){if(!Imported[_0x3579a1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3ae18f(0x48f)](_0x1bf868,_0x3579a1)),SceneManager[_0x3ae18f(0x32c)]();break;}}const _0xb1ddb5=_0x26c573['description'];if(_0xb1ddb5[_0x3ae18f(0x276)](/\[Version[ ](.*?)\]/i)){const _0xb79f97=Number(RegExp['$1']);_0xb79f97!==VisuMZ[label][_0x3ae18f(0x5e3)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3ae18f(0x48f)](_0x1bf868,_0xb79f97)),SceneManager[_0x3ae18f(0x32c)]());}if(_0xb1ddb5[_0x3ae18f(0x276)](/\[Tier[ ](\d+)\]/i)){const _0x483612=Number(RegExp['$1']);_0x483612<tier?(alert(_0x3ae18f(0x5a7)[_0x3ae18f(0x48f)](_0x1bf868,_0x483612,tier)),SceneManager[_0x3ae18f(0x32c)]()):tier=Math[_0x3ae18f(0x423)](_0x483612,tier);}VisuMZ[_0x3ae18f(0x2a5)](VisuMZ[label][_0x3ae18f(0x633)],_0x26c573[_0x3ae18f(0x420)]);})(pluginData),VisuMZ['OperateValues']=function(_0x121166,_0x727d4b,_0x234a8c){switch(_0x234a8c){case'=':return _0x727d4b;break;case'+':return _0x121166+_0x727d4b;break;case'-':return _0x121166-_0x727d4b;break;case'*':return _0x121166*_0x727d4b;break;case'/':return _0x121166/_0x727d4b;break;case'%':return _0x121166%_0x727d4b;break;}return _0x121166;},PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x460),_0x23d689=>{const _0x50521d=_0x44537c;VisuMZ[_0x50521d(0x2a5)](_0x23d689,_0x23d689);switch(_0x23d689[_0x50521d(0x3d6)]){case _0x50521d(0x58b):$gameSystem[_0x50521d(0x468)](!![]);break;case _0x50521d(0x40b):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x50521d(0x263):$gameSystem[_0x50521d(0x468)](!$gameSystem[_0x50521d(0x2fc)]());break;}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x3d7),_0x249758=>{const _0x202678=_0x44537c;VisuMZ[_0x202678(0x2a5)](_0x249758,_0x249758);const _0x50bd98=$gameTemp[_0x202678(0x515)](),_0x16b608={'mapId':_0x249758[_0x202678(0x28b)],'eventId':_0x249758[_0x202678(0x534)]||_0x50bd98[_0x202678(0x4c8)](),'pageId':_0x249758[_0x202678(0x4c5)]};if(_0x16b608[_0x202678(0x4e7)]<=0x0)_0x16b608[_0x202678(0x4e7)]=$gameMap?$gameMap[_0x202678(0x4e7)]():0x1;$gameTemp[_0x202678(0x515)]()[_0x202678(0x60e)](_0x16b608);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x334),_0x1f87e5=>{const _0x3aa8d4=_0x44537c;VisuMZ[_0x3aa8d4(0x2a5)](_0x1f87e5,_0x1f87e5);switch(_0x1f87e5[_0x3aa8d4(0x3d6)]){case _0x3aa8d4(0x3a9):$gameSystem[_0x3aa8d4(0x26b)](!![]);break;case _0x3aa8d4(0x33c):$gameSystem[_0x3aa8d4(0x26b)](![]);break;case _0x3aa8d4(0x263):$gameSystem['setDashingEnabled'](!$gameSystem[_0x3aa8d4(0x214)]());break;}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x3c9),_0x1af4e6=>{const _0x9ed61b=_0x44537c;VisuMZ['ConvertParams'](_0x1af4e6,_0x1af4e6);const _0x35fe92=$gameTemp[_0x9ed61b(0x515)]();_0x1af4e6['MapId']=_0x1af4e6[_0x9ed61b(0x28b)]||$gameMap[_0x9ed61b(0x4e7)](),$gameSystem['setEventIconDataKey'](_0x1af4e6[_0x9ed61b(0x28b)],_0x1af4e6[_0x9ed61b(0x534)]||_0x35fe92['eventId'](),_0x1af4e6['IconIndex'],_0x1af4e6[_0x9ed61b(0x549)],_0x1af4e6[_0x9ed61b(0x581)],_0x1af4e6['IconBlendMode'],![]);}),PluginManager['registerCommand'](pluginData['name'],_0x44537c(0x39f),_0x2629af=>{const _0xaf2d42=_0x44537c;VisuMZ[_0xaf2d42(0x2a5)](_0x2629af,_0x2629af);const _0x599fed=$gameTemp[_0xaf2d42(0x515)]();_0x2629af[_0xaf2d42(0x28b)]=_0x2629af[_0xaf2d42(0x28b)]||$gameMap[_0xaf2d42(0x4e7)](),$gameSystem[_0xaf2d42(0x2a8)](_0x2629af[_0xaf2d42(0x28b)],_0x2629af[_0xaf2d42(0x534)]||_0x599fed[_0xaf2d42(0x4c8)](),_0x2629af[_0xaf2d42(0x3ca)],_0x2629af[_0xaf2d42(0x549)],_0x2629af[_0xaf2d42(0x581)],_0x2629af[_0xaf2d42(0x395)],!![]);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'EventIconDelete',_0x263a8d=>{const _0x13ae4f=_0x44537c;VisuMZ[_0x13ae4f(0x2a5)](_0x263a8d,_0x263a8d);const _0x157b67=$gameTemp[_0x13ae4f(0x515)]();_0x263a8d[_0x13ae4f(0x28b)]=_0x263a8d['MapId']||$gameMap[_0x13ae4f(0x4e7)](),$gameSystem[_0x13ae4f(0x222)](_0x263a8d['MapId'],_0x263a8d[_0x13ae4f(0x534)]||_0x157b67[_0x13ae4f(0x4c8)]());}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x2a9),_0x235b9f=>{const _0x1d4ef7=_0x44537c;VisuMZ['ConvertParams'](_0x235b9f,_0x235b9f);const _0x344549=$gameTemp[_0x1d4ef7(0x515)]();_0x235b9f[_0x1d4ef7(0x28b)]=_0x235b9f['MapId']||$gameMap['mapId'](),$gameSystem['restoreIconsOnEventsDataKey'](_0x235b9f[_0x1d4ef7(0x28b)],_0x235b9f[_0x1d4ef7(0x534)]||_0x344549[_0x1d4ef7(0x4c8)]());}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x46d),_0xd61907=>{const _0x12c76c=_0x44537c;if($gameMap)for(const _0x204d80 of $gameMap['events']()){_0x204d80[_0x12c76c(0x406)](),_0x204d80[_0x12c76c(0x58e)]();}if(SceneManager[_0x12c76c(0x3b0)]()){const _0x1b66b9=SceneManager[_0x12c76c(0x5e7)][_0x12c76c(0x40c)];if(_0x1b66b9)_0x1b66b9[_0x12c76c(0x583)]();}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x3f7),_0x181346=>{const _0x524594=_0x44537c;VisuMZ[_0x524594(0x2a5)](_0x181346,_0x181346);switch(_0x181346[_0x524594(0x1f8)]){case _0x524594(0x529):$gameSystem[_0x524594(0x1e9)](!![]);break;case'Hidden':$gameSystem[_0x524594(0x1e9)](![]);break;case _0x524594(0x263):$gameSystem[_0x524594(0x1e9)](!$gameSystem[_0x524594(0x5b3)]());break;}}),PluginManager[_0x44537c(0x31e)](pluginData['name'],'EventLocationSave',_0x2c7f65=>{const _0x27fe48=_0x44537c;VisuMZ['ConvertParams'](_0x2c7f65,_0x2c7f65);const _0x29465e=$gameTemp[_0x27fe48(0x515)]();if(!$gameMap)return;const _0x536701=$gameMap[_0x27fe48(0x246)](_0x2c7f65['EventId']||_0x29465e[_0x27fe48(0x4c8)]());if(_0x536701)_0x536701[_0x27fe48(0x52f)]();}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],_0x44537c(0x664),_0x5e7279=>{const _0x516769=_0x44537c;VisuMZ[_0x516769(0x2a5)](_0x5e7279,_0x5e7279);const _0x13c116=$gameTemp[_0x516769(0x515)](),_0xccc1d1=_0x5e7279[_0x516769(0x28b)]||$gameMap[_0x516769(0x4e7)](),_0x1cf9a4=_0x5e7279[_0x516769(0x534)]||_0x13c116[_0x516769(0x4c8)](),_0x5567c8=_0x5e7279['PosX']||0x0,_0x3aa752=_0x5e7279[_0x516769(0x624)]||0x0,_0x220951=_0x5e7279[_0x516769(0x3a8)]||0x2,_0x50209f=((_0x5e7279[_0x516769(0x4c5)]||0x1)-0x1)['clamp'](0x0,0x13),_0x4ff5c=_0x5e7279[_0x516769(0x23c)]||0x0;$gameSystem[_0x516769(0x51c)](_0xccc1d1,_0x1cf9a4,_0x5567c8,_0x3aa752,_0x220951,_0x50209f,_0x4ff5c);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'EventLocationDelete',_0x45f31c=>{const _0x58c22e=_0x44537c;VisuMZ['ConvertParams'](_0x45f31c,_0x45f31c);const _0x2ed9d7=$gameTemp[_0x58c22e(0x515)](),_0x173d4d=_0x45f31c[_0x58c22e(0x28b)]||$gameMap[_0x58c22e(0x4e7)](),_0x2e0b33=_0x45f31c['EventId']||_0x2ed9d7[_0x58c22e(0x4c8)]();$gameSystem[_0x58c22e(0x5c2)](_0x173d4d,_0x2e0b33);}),VisuMZ[_0x44537c(0x646)][_0x44537c(0x49f)]=function(_0x5c4432,_0x3cfe85){const _0x3529aa=_0x44537c;_0x3cfe85=_0x3cfe85||{},_0x5c4432[_0x3529aa(0x54f)]={'fadeIn':_0x3cfe85['fadeInDuration']||0x0,'fadeOut':_0x3cfe85['fadeOutDuration']||0x0},_0x5c4432[_0x3529aa(0x416)]={'x':_0x3cfe85[_0x3529aa(0x53f)]||0x0,'y':_0x3cfe85[_0x3529aa(0x53c)]||0x0},_0x5c4432[_0x3529aa(0x49c)]={'x':_0x3cfe85['endOffsetX']||0x0,'y':_0x3cfe85['endOffsetY']||0x0},_0x5c4432[_0x3529aa(0x54b)]={'x':_0x3cfe85['endScaleX']||0x0,'y':_0x3cfe85[_0x3529aa(0x679)]||0x0},_0x5c4432['startScale']={'x':_0x3cfe85[_0x3529aa(0x2b3)]||0x0,'y':_0x3cfe85['startScaleY']||0x0},_0x5c4432[_0x3529aa(0x401)]={'start':_0x3cfe85[_0x3529aa(0x2ce)]||0x0,'end':_0x3cfe85['endAngle']||0x0},_0x5c4432[_0x3529aa(0x4b6)]={'arc':_0x3cfe85[_0x3529aa(0x1fc)]||0x0};},PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],'MsgPopupPlayer',_0x488700=>{const _0x20f2c2=_0x44537c;if(!SceneManager[_0x20f2c2(0x51b)]())return;if(!Imported[_0x20f2c2(0x65c)]){$gameTemp[_0x20f2c2(0x2ee)]()&&alert(_0x20f2c2(0x4a2)+_0x20f2c2(0x67e));return;}VisuMZ[_0x20f2c2(0x2a5)](_0x488700,_0x488700);const _0x4220f0={'text':_0x488700[_0x20f2c2(0x62d)]||'','duration':Math[_0x20f2c2(0x423)](_0x488700[_0x20f2c2(0x201)]||0x3c,0xc)},_0x27473b=_0x488700[_0x20f2c2(0x483)]||{};VisuMZ['EventsMoveCore'][_0x20f2c2(0x49f)](_0x4220f0,_0x27473b);const _0x40a033=SceneManager[_0x20f2c2(0x5e7)][_0x20f2c2(0x40c)];if(_0x40a033){const _0x231389=$gamePlayer;_0x40a033['createEventsMoveCoreMessagePopup'](_0x231389,_0x4220f0);}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'MsgPopupFollower',_0x4b46c3=>{const _0x172838=_0x44537c;if(!SceneManager[_0x172838(0x51b)]())return;if(!Imported[_0x172838(0x65c)]){$gameTemp['isPlaytest']()&&alert(_0x172838(0x4a2)+_0x172838(0x67e));return;}VisuMZ[_0x172838(0x2a5)](_0x4b46c3,_0x4b46c3);const _0x5becda=_0x4b46c3['FollowerIndex']||0x0,_0x4b017c={'text':_0x4b46c3[_0x172838(0x62d)]||'','duration':Math['max'](_0x4b46c3[_0x172838(0x201)]||0x3c,0xc)},_0x1809bd=_0x4b46c3[_0x172838(0x483)]||{};VisuMZ[_0x172838(0x646)][_0x172838(0x49f)](_0x4b017c,_0x1809bd);const _0x442600=SceneManager['_scene'][_0x172838(0x40c)];if(_0x442600){const _0x6590b1=$gamePlayer['followers']()[_0x172838(0x1fb)](_0x5becda);_0x442600[_0x172838(0x4a0)](_0x6590b1,_0x4b017c);}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'MsgPopupEvent',_0x2d784e=>{const _0x51ca72=_0x44537c;if(!SceneManager[_0x51ca72(0x51b)]())return;if(!Imported[_0x51ca72(0x65c)]){$gameTemp[_0x51ca72(0x2ee)]()&&alert(_0x51ca72(0x4a2)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ['ConvertParams'](_0x2d784e,_0x2d784e);const _0x3e6547=$gameTemp['getLastPluginCommandInterpreter'](),_0x27511a=_0x2d784e[_0x51ca72(0x534)]||(_0x3e6547?_0x3e6547['eventId']():0x1),_0x229cad={'text':_0x2d784e[_0x51ca72(0x62d)]||'','duration':Math[_0x51ca72(0x423)](_0x2d784e[_0x51ca72(0x201)]||0x3c,0xc)},_0x1444ca=_0x2d784e['PopupExtra']||{};VisuMZ[_0x51ca72(0x646)][_0x51ca72(0x49f)](_0x229cad,_0x1444ca);const _0x17b895=SceneManager['_scene'][_0x51ca72(0x40c)];if(_0x17b895){const _0x14c119=$gameMap[_0x51ca72(0x246)](_0x27511a);_0x17b895[_0x51ca72(0x4a0)](_0x14c119,_0x229cad);}}),PluginManager['registerCommand'](pluginData['name'],_0x44537c(0x454),_0x4edb82=>{const _0x431ff6=_0x44537c;if(!SceneManager[_0x431ff6(0x51b)]())return;if(!Imported[_0x431ff6(0x65c)]){$gameTemp[_0x431ff6(0x2ee)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x431ff6(0x67e));return;}VisuMZ[_0x431ff6(0x2a5)](_0x4edb82,_0x4edb82);const _0x565510={'text':_0x4edb82[_0x431ff6(0x62d)]||'','duration':Math[_0x431ff6(0x423)](_0x4edb82[_0x431ff6(0x201)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x431ff6(0x4c4)](_0x4edb82['TileX']||0x0),'y':Math[_0x431ff6(0x4c4)](_0x4edb82[_0x431ff6(0x5f8)]||0x0)}},_0x46a09b=_0x4edb82[_0x431ff6(0x483)]||{};VisuMZ[_0x431ff6(0x646)][_0x431ff6(0x49f)](_0x565510,_0x46a09b);const _0x16c4f0=SceneManager[_0x431ff6(0x5e7)][_0x431ff6(0x40c)];_0x16c4f0&&_0x16c4f0[_0x431ff6(0x5f0)](_0x565510);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x631),_0x5457eb=>{const _0x33acf8=_0x44537c;VisuMZ[_0x33acf8(0x2a5)](_0x5457eb,_0x5457eb);const _0x4ae4f0=_0x5457eb[_0x33acf8(0x69f)];$gameTimer[_0x33acf8(0x361)](_0x4ae4f0);}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],_0x44537c(0x2ac),_0x191247=>{const _0x3b2bf9=_0x44537c;$gameTimer[_0x3b2bf9(0x361)](0x0);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x467),_0x5d6c82=>{const _0x3b1c6c=_0x44537c;if(!$gameTimer[_0x3b1c6c(0x561)]())return;VisuMZ[_0x3b1c6c(0x2a5)](_0x5d6c82,_0x5d6c82);let _0x4cc835=0x0;_0x4cc835+=_0x5d6c82['Frames'],_0x4cc835+=_0x5d6c82[_0x3b1c6c(0x544)]*0x3c,_0x4cc835+=_0x5d6c82[_0x3b1c6c(0x65a)]*0x3c*0x3c,_0x4cc835+=_0x5d6c82['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x3b1c6c(0x28d)](_0x4cc835);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'EventTimerFramesSet',_0xe5ee9e=>{const _0x33145b=_0x44537c;if(!$gameTimer['isWorking']())return;VisuMZ[_0x33145b(0x2a5)](_0xe5ee9e,_0xe5ee9e);let _0xfaeff4=0x0;_0xfaeff4+=_0xe5ee9e[_0x33145b(0x6a2)],_0xfaeff4+=_0xe5ee9e['Seconds']*0x3c,_0xfaeff4+=_0xe5ee9e['Minutes']*0x3c*0x3c,_0xfaeff4+=_0xe5ee9e[_0x33145b(0x527)]*0x3c*0x3c*0x3c,$gameTimer[_0x33145b(0x376)](_0xfaeff4);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x628),_0x128503=>{if(!$gameTimer['isWorking']())return;$gameTimer['pause']();}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x530),_0x26ba38=>{const _0x4a4383=_0x44537c;if(!$gameTimer[_0x4a4383(0x561)]())return;$gameTimer['resume']();}),PluginManager[_0x44537c(0x31e)](pluginData['name'],_0x44537c(0x47d),_0x260c66=>{const _0x34b0ec=_0x44537c;VisuMZ[_0x34b0ec(0x2a5)](_0x260c66,_0x260c66);const _0x3b9d4b=_0x260c66[_0x34b0ec(0x5eb)]||0x0;$gameTimer[_0x34b0ec(0x442)](_0x3b9d4b);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x61e),_0x49c9be=>{const _0x32c8f9=_0x44537c;VisuMZ[_0x32c8f9(0x2a5)](_0x49c9be,_0x49c9be);const _0x237f79=!_0x49c9be['Chase'];$gameSystem[_0x32c8f9(0x347)](_0x237f79);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x433),_0x501059=>{const _0x5877b1=_0x44537c;VisuMZ[_0x5877b1(0x2a5)](_0x501059,_0x501059);const _0x157322=(_0x501059[_0x5877b1(0x653)]||0x0)-0x1,_0x4ea3b1=!_0x501059[_0x5877b1(0x1f7)],_0x45557d=$gamePlayer['followers']()['follower'](_0x157322);if(_0x45557d)_0x45557d['setChaseOff'](_0x4ea3b1);}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],_0x44537c(0x29d),_0x40d83d=>{const _0x529e4b=_0x44537c;VisuMZ[_0x529e4b(0x2a5)](_0x40d83d,_0x40d83d);const _0x58463e=_0x40d83d[_0x529e4b(0x653)];$gameSystem[_0x529e4b(0x50e)](_0x58463e);}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],_0x44537c(0x5be),_0x32a8d6=>{const _0x5bc5df=_0x44537c;VisuMZ[_0x5bc5df(0x2a5)](_0x32a8d6,_0x32a8d6),$gameSystem[_0x5bc5df(0x50e)](0x0),$gameSystem[_0x5bc5df(0x347)](![]);for(const _0x1f8b9f of $gamePlayer['followers']()[_0x5bc5df(0x343)]){if(_0x1f8b9f)_0x1f8b9f[_0x5bc5df(0x4ed)](![]);}}),PluginManager[_0x44537c(0x31e)](pluginData['name'],'SwitchGetSelfSwitchABCD',_0x55dbd0=>{const _0x566b44=_0x44537c;VisuMZ[_0x566b44(0x2a5)](_0x55dbd0,_0x55dbd0);const _0x4f57ea=$gameTemp['getLastPluginCommandInterpreter']();_0x55dbd0[_0x566b44(0x28b)]=_0x55dbd0[_0x566b44(0x28b)]||$gameMap['mapId']();const _0x306b0d=[_0x55dbd0[_0x566b44(0x28b)],_0x55dbd0[_0x566b44(0x534)]||_0x4f57ea[_0x566b44(0x4c8)](),_0x55dbd0[_0x566b44(0x667)]],_0x366379=_0x55dbd0['TargetSwitchId'],_0x1bac55=$gameSelfSwitches['value'](_0x306b0d)||![];$gameSwitches[_0x566b44(0x626)](_0x366379,_0x1bac55);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x2fd),_0x3367f1=>{const _0x16ff03=_0x44537c;VisuMZ[_0x16ff03(0x2a5)](_0x3367f1,_0x3367f1);const _0x55d280=$gameTemp['getLastPluginCommandInterpreter']();_0x3367f1[_0x16ff03(0x28b)]=_0x3367f1[_0x16ff03(0x28b)]||$gameMap['mapId']();const _0x41b65f=[_0x3367f1['MapId'],_0x3367f1[_0x16ff03(0x534)]||_0x55d280[_0x16ff03(0x4c8)](),_0x16ff03(0x612)['format'](_0x3367f1[_0x16ff03(0x3f6)])],_0x59da6d=_0x3367f1[_0x16ff03(0x252)],_0x2bd4ed=$gameSelfSwitches['value'](_0x41b65f)||![];$gameSwitches[_0x16ff03(0x626)](_0x59da6d,_0x2bd4ed);}),PluginManager[_0x44537c(0x31e)](pluginData['name'],_0x44537c(0x63c),_0x1d8924=>{const _0x2532f6=_0x44537c;VisuMZ[_0x2532f6(0x2a5)](_0x1d8924,_0x1d8924);const _0x26ca24=$gameTemp[_0x2532f6(0x515)]();_0x1d8924[_0x2532f6(0x28b)]=_0x1d8924[_0x2532f6(0x28b)]||$gameMap[_0x2532f6(0x4e7)]();const _0x2d94dd=[_0x1d8924[_0x2532f6(0x28b)],_0x1d8924[_0x2532f6(0x534)]||_0x26ca24[_0x2532f6(0x4c8)](),_0x2532f6(0x4d7)[_0x2532f6(0x48f)](_0x1d8924[_0x2532f6(0x3ab)])],_0x3cc8b5=_0x1d8924[_0x2532f6(0x615)],_0x504fb4=$gameSelfSwitches[_0x2532f6(0x1f3)](_0x2d94dd)||![];$gameVariables[_0x2532f6(0x626)](_0x3cc8b5,_0x504fb4);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x6ab),_0x10d482=>{const _0x316332=_0x44537c;VisuMZ['ConvertParams'](_0x10d482,_0x10d482);if(!$gameMap)return;const _0xb9f1df=$gameTemp['getLastPluginCommandInterpreter'](),_0x5878c5=_0x10d482['Step2Preserve'];_0x10d482[_0x316332(0x5a8)]=_0x10d482['Step1MapId']||$gameMap[_0x316332(0x4e7)](),_0x10d482[_0x316332(0x4de)]=_0x10d482[_0x316332(0x4de)]||$gameMap[_0x316332(0x4e7)](),_0x10d482[_0x316332(0x2bf)]=_0x10d482[_0x316332(0x2bf)][_0x316332(0x526)]()[_0x316332(0x35e)]();if(!_0x5878c5&&_0x10d482[_0x316332(0x5a8)]!==$gameMap['mapId']())return;if($gameMap[_0x316332(0x4e7)]()===_0x10d482['Step1MapId']){const _0x2ba194=$gameMap[_0x316332(0x246)](_0x10d482['Step1EventId']||_0xb9f1df[_0x316332(0x4c8)]());if(!_0x2ba194)return;_0x10d482[_0x316332(0x2bf)]!==_0x316332(0x3db)?_0x2ba194[_0x316332(0x245)](_0x10d482['TemplateName']):_0x2ba194['morphInto'](_0x10d482['Step2MapId'],_0x10d482[_0x316332(0x1e3)]||_0xb9f1df[_0x316332(0x4c8)]());}_0x5878c5&&$gameSystem[_0x316332(0x3f3)](_0x10d482[_0x316332(0x5a8)],_0x10d482[_0x316332(0x5f4)],_0x10d482[_0x316332(0x2bf)],_0x10d482[_0x316332(0x4de)],_0x10d482[_0x316332(0x1e3)]);}),PluginManager[_0x44537c(0x31e)](pluginData['name'],'MorphEventRemove',_0x3d579c=>{const _0x186c89=_0x44537c;VisuMZ[_0x186c89(0x2a5)](_0x3d579c,_0x3d579c);if(!$gameMap)return;const _0x3dfb8f=$gameTemp[_0x186c89(0x515)]();_0x3d579c[_0x186c89(0x28b)]=_0x3d579c[_0x186c89(0x28b)]||$gameMap[_0x186c89(0x4e7)]();if($gameMap[_0x186c89(0x4e7)]()===_0x3d579c[_0x186c89(0x28b)]){const _0x5da553=$gameMap[_0x186c89(0x246)](_0x3d579c[_0x186c89(0x534)]||_0x3dfb8f['eventId']());_0x5da553[_0x186c89(0x64f)]();}_0x3d579c[_0x186c89(0x241)]&&$gameSystem[_0x186c89(0x698)](_0x3d579c[_0x186c89(0x28b)],_0x3d579c['EventId']||_0x3dfb8f['eventId']());}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'PlayerIconChange',_0x299b4d=>{const _0x55c2ea=_0x44537c;VisuMZ['ConvertParams'](_0x299b4d,_0x299b4d),$gameSystem['setEventIconData']($gamePlayer,_0x299b4d['IconIndex'],_0x299b4d[_0x55c2ea(0x549)],_0x299b4d[_0x55c2ea(0x581)],_0x299b4d[_0x55c2ea(0x395)]);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x3f4),_0x1afe39=>{const _0x219495=_0x44537c;VisuMZ['ConvertParams'](_0x1afe39,_0x1afe39),$gameSystem[_0x219495(0x270)]($gamePlayer);}),PluginManager[_0x44537c(0x31e)](pluginData['name'],_0x44537c(0x36c),_0x2d173b=>{const _0x491fb7=_0x44537c;VisuMZ[_0x491fb7(0x2a5)](_0x2d173b,_0x2d173b),$gameSystem[_0x491fb7(0x4fe)](!_0x2d173b['Enable']);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x557),_0x394fbd=>{const _0xf93bf4=_0x44537c;VisuMZ[_0xf93bf4(0x2a5)](_0x394fbd,_0x394fbd),$gameSystem[_0xf93bf4(0x21c)](_0x394fbd[_0xf93bf4(0x243)]);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x60a),_0x4ea363=>{const _0x50a828=_0x44537c;VisuMZ[_0x50a828(0x2a5)](_0x4ea363,_0x4ea363);const _0x46f5ca=_0x4ea363['MapId']||$gameMap['mapId']();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x46f5ca);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x3b7),_0x1e8bcb=>{const _0x4120d9=_0x44537c;VisuMZ[_0x4120d9(0x2a5)](_0x1e8bcb,_0x1e8bcb);const _0x1d2c93=$gameTemp[_0x4120d9(0x515)]();_0x1e8bcb[_0x4120d9(0x28b)]=_0x1e8bcb[_0x4120d9(0x28b)]||$gameMap[_0x4120d9(0x4e7)]();const _0xf8906d=[_0x1e8bcb[_0x4120d9(0x28b)],_0x1e8bcb[_0x4120d9(0x534)]||_0x1d2c93[_0x4120d9(0x4c8)](),_0x1e8bcb[_0x4120d9(0x667)]];switch(_0x1e8bcb[_0x4120d9(0x3d6)]){case'ON':$gameSelfSwitches[_0x4120d9(0x626)](_0xf8906d,!![]);break;case'OFF':$gameSelfSwitches['setValue'](_0xf8906d,![]);break;case _0x4120d9(0x263):$gameSelfSwitches[_0x4120d9(0x626)](_0xf8906d,!$gameSelfSwitches[_0x4120d9(0x1f3)](_0xf8906d));break;}}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x217),_0xda4ddf=>{const _0x4ce205=_0x44537c;VisuMZ[_0x4ce205(0x2a5)](_0xda4ddf,_0xda4ddf);const _0x4c5674=$gameTemp[_0x4ce205(0x515)]();_0xda4ddf['MapId']=_0xda4ddf[_0x4ce205(0x28b)]||$gameMap[_0x4ce205(0x4e7)]();const _0x50d5b1=[_0xda4ddf[_0x4ce205(0x28b)],_0xda4ddf[_0x4ce205(0x534)]||_0x4c5674[_0x4ce205(0x4c8)](),_0x4ce205(0x612)[_0x4ce205(0x48f)](_0xda4ddf[_0x4ce205(0x3f6)])];switch(_0xda4ddf['Value']){case'ON':$gameSelfSwitches[_0x4ce205(0x626)](_0x50d5b1,!![]);break;case _0x4ce205(0x210):$gameSelfSwitches['setValue'](_0x50d5b1,![]);break;case _0x4ce205(0x263):$gameSelfSwitches[_0x4ce205(0x626)](_0x50d5b1,!$gameSelfSwitches[_0x4ce205(0x1f3)](_0x50d5b1));break;}}),PluginManager[_0x44537c(0x31e)](pluginData['name'],_0x44537c(0x6a7),_0x45bd2c=>{const _0x184737=_0x44537c;VisuMZ[_0x184737(0x2a5)](_0x45bd2c,_0x45bd2c);const _0x59356f=$gameTemp[_0x184737(0x515)]();_0x45bd2c[_0x184737(0x28b)]=_0x45bd2c['MapId']||$gameMap[_0x184737(0x4e7)]();const _0xc3643=[_0x45bd2c[_0x184737(0x28b)],_0x45bd2c[_0x184737(0x534)]||_0x59356f[_0x184737(0x4c8)](),'Self\x20Variable\x20%1'['format'](_0x45bd2c['VariableId'])],_0x2b5604=VisuMZ['OperateValues']($gameSelfSwitches['value'](_0xc3643),_0x45bd2c[_0x184737(0x3d6)],_0x45bd2c[_0x184737(0x1ea)]);$gameSelfSwitches[_0x184737(0x626)](_0xc3643,_0x2b5604);}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],_0x44537c(0x5ce),_0x17ecea=>{const _0x423817=_0x44537c;$gamePlayer[_0x423817(0x26c)]=!![];}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x5d4),_0x21dcc3=>{const _0xc36203=_0x44537c;$gamePlayer[_0xc36203(0x3c4)]=!![];}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x4d9),_0x566b6d=>{const _0x2a40d2=_0x44537c;$gamePlayer[_0x2a40d2(0x6a3)]=!![];}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x4f5),_0x5c772b=>{$gamePlayer['_noMovementShadow']=![];}),PluginManager[_0x44537c(0x31e)](pluginData['name'],_0x44537c(0x2ae),_0x1495a1=>{const _0x20228a=_0x44537c;$gamePlayer[_0x20228a(0x3c4)]=![];}),PluginManager['registerCommand'](pluginData['name'],_0x44537c(0x57e),_0x1068bf=>{$gamePlayer['_noEventMovementShadow']=!![];}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x49d),_0x41922f=>{const _0x7c95fa=_0x44537c;VisuMZ[_0x7c95fa(0x2a5)](_0x41922f,_0x41922f);const _0x552ec0=$gameTemp[_0x7c95fa(0x515)](),_0x3055ee={'template':_0x41922f[_0x7c95fa(0x2bf)],'mapId':_0x41922f[_0x7c95fa(0x28b)]||$gameMap[_0x7c95fa(0x4e7)](),'eventId':_0x41922f[_0x7c95fa(0x534)]||_0x552ec0[_0x7c95fa(0x4c8)](),'x':_0x41922f[_0x7c95fa(0x594)],'y':_0x41922f['PosY'],'spawnPreserved':_0x41922f[_0x7c95fa(0x67c)],'spawnEventId':$gameMap[_0x7c95fa(0x3e6)][_0x7c95fa(0x220)]+0x3e8},_0x1762a6=_0x41922f[_0x7c95fa(0x53a)]||0x0;if(!VisuMZ[_0x7c95fa(0x5d6)][_0x3055ee['mapId']]&&_0x3055ee[_0x7c95fa(0x4e7)]!==$gameMap['mapId']()){let _0x27b2bf=_0x7c95fa(0x5e8)['format'](_0x3055ee['mapId']);_0x27b2bf+=_0x7c95fa(0x478),_0x27b2bf+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x27b2bf+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x27b2bf+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x3055ee[_0x7c95fa(0x4e7)]),alert(_0x27b2bf);return;}const _0x1f541e=$gameMap[_0x7c95fa(0x55e)](_0x3055ee,_0x41922f[_0x7c95fa(0x308)],_0x41922f[_0x7c95fa(0x53d)]);_0x1762a6&&$gameSwitches[_0x7c95fa(0x626)](_0x1762a6,!!_0x1f541e);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x40f),_0x8468aa=>{const _0xa32516=_0x44537c;VisuMZ['ConvertParams'](_0x8468aa,_0x8468aa);const _0x1386bd=$gameTemp[_0xa32516(0x515)](),_0x439da4={'template':_0x8468aa[_0xa32516(0x2bf)],'mapId':_0x8468aa[_0xa32516(0x28b)]||$gameMap[_0xa32516(0x4e7)](),'eventId':_0x8468aa[_0xa32516(0x534)]||_0x1386bd['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x8468aa[_0xa32516(0x67c)],'spawnEventId':$gameMap[_0xa32516(0x3e6)]['length']+0x3e8},_0xd9886e=_0x8468aa[_0xa32516(0x53a)]||0x0;if(!VisuMZ[_0xa32516(0x5d6)][_0x439da4[_0xa32516(0x4e7)]]&&_0x439da4[_0xa32516(0x4e7)]!==$gameMap['mapId']()){let _0x2e72d3='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0xa32516(0x48f)](_0x439da4[_0xa32516(0x4e7)]);_0x2e72d3+=_0xa32516(0x478),_0x2e72d3+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x2e72d3+=_0xa32516(0x622),_0x2e72d3+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x439da4['mapId']),alert(_0x2e72d3);return;}const _0x125ed3=$gameMap[_0xa32516(0x2af)](_0x439da4,_0x8468aa['Region'],_0x8468aa[_0xa32516(0x308)],_0x8468aa[_0xa32516(0x53d)]);_0xd9886e&&$gameSwitches[_0xa32516(0x626)](_0xd9886e,!!_0x125ed3);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x28a),_0x1f95de=>{const _0x536ed0=_0x44537c;VisuMZ[_0x536ed0(0x2a5)](_0x1f95de,_0x1f95de);const _0x3479bf=$gameTemp['getLastPluginCommandInterpreter'](),_0x393a4a={'template':_0x1f95de[_0x536ed0(0x2bf)],'mapId':_0x1f95de[_0x536ed0(0x28b)]||$gameMap[_0x536ed0(0x4e7)](),'eventId':_0x1f95de[_0x536ed0(0x534)]||_0x3479bf[_0x536ed0(0x4c8)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1f95de[_0x536ed0(0x67c)],'spawnEventId':$gameMap[_0x536ed0(0x3e6)][_0x536ed0(0x220)]+0x3e8},_0x2bb1ed=_0x1f95de['SuccessSwitchId']||0x0;if(!VisuMZ[_0x536ed0(0x5d6)][_0x393a4a[_0x536ed0(0x4e7)]]&&_0x393a4a[_0x536ed0(0x4e7)]!==$gameMap['mapId']()){let _0x474bc0='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x536ed0(0x48f)](_0x393a4a[_0x536ed0(0x4e7)]);_0x474bc0+=_0x536ed0(0x478),_0x474bc0+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x474bc0+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x474bc0+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x393a4a[_0x536ed0(0x4e7)]),alert(_0x474bc0);return;}const _0x123617=$gameMap[_0x536ed0(0x36d)](_0x393a4a,_0x1f95de[_0x536ed0(0x3d4)],_0x1f95de[_0x536ed0(0x308)],_0x1f95de['Passability']);_0x2bb1ed&&$gameSwitches[_0x536ed0(0x626)](_0x2bb1ed,!!_0x123617);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'SpawnEventDespawnEventID',_0x9711cf=>{const _0x24eceb=_0x44537c;VisuMZ['ConvertParams'](_0x9711cf,_0x9711cf);const _0x148995=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x24eceb(0x4be)](_0x9711cf[_0x24eceb(0x2d2)]||_0x148995[_0x24eceb(0x4c8)]());}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x5b4),_0x4bb8b6=>{const _0x2b6983=_0x44537c;VisuMZ[_0x2b6983(0x2a5)](_0x4bb8b6,_0x4bb8b6);const _0x2b8498=_0x4bb8b6[_0x2b6983(0x594)],_0x3a5011=_0x4bb8b6[_0x2b6983(0x624)];$gameMap[_0x2b6983(0x226)](_0x2b8498,_0x3a5011);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],'SpawnEventDespawnRegions',_0x4b2925=>{const _0x3be5cc=_0x44537c;VisuMZ[_0x3be5cc(0x2a5)](_0x4b2925,_0x4b2925),$gameMap['despawnRegions'](_0x4b2925[_0x3be5cc(0x29e)]);}),PluginManager[_0x44537c(0x31e)](pluginData[_0x44537c(0x58a)],_0x44537c(0x44c),_0x23ab01=>{const _0x4efd42=_0x44537c;VisuMZ[_0x4efd42(0x2a5)](_0x23ab01,_0x23ab01),$gameMap['despawnTerrainTags'](_0x23ab01[_0x4efd42(0x3d4)]);}),PluginManager['registerCommand'](pluginData[_0x44537c(0x58a)],'SpawnEventDespawnEverything',_0x3ae2ce=>{const _0x491093=_0x44537c;VisuMZ['ConvertParams'](_0x3ae2ce,_0x3ae2ce),$gameMap[_0x491093(0x3d9)]();}),VisuMZ[_0x44537c(0x646)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x44537c(0x32e)],Scene_Boot['prototype'][_0x44537c(0x32e)]=function(){const _0x316347=_0x44537c;VisuMZ[_0x316347(0x646)][_0x316347(0x52a)][_0x316347(0x21e)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x316347(0x5ee)]();if(VisuMZ['EventsMoveCore'][_0x316347(0x596)])VisuMZ[_0x316347(0x646)][_0x316347(0x596)][_0x316347(0x459)]();},VisuMZ[_0x44537c(0x5d6)]=[],VisuMZ[_0x44537c(0x487)]={},Scene_Boot[_0x44537c(0x4aa)][_0x44537c(0x563)]=function(){const _0x827574=_0x44537c;if(DataManager[_0x827574(0x295)]()||DataManager[_0x827574(0x4a1)]())return;const _0x134b4e=VisuMZ[_0x827574(0x646)][_0x827574(0x633)][_0x827574(0x1ef)],_0x22d87d=_0x134b4e[_0x827574(0x514)][_0x827574(0x32b)](0x0);for(const _0x2c24ad of _0x134b4e[_0x827574(0x2e0)]){_0x2c24ad[_0x827574(0x509)]=_0x2c24ad[_0x827574(0x509)]['toUpperCase']()[_0x827574(0x35e)](),VisuMZ[_0x827574(0x487)][_0x2c24ad[_0x827574(0x509)]]=_0x2c24ad;if(!_0x22d87d[_0x827574(0x680)](_0x2c24ad[_0x827574(0x2fb)]))_0x22d87d[_0x827574(0x5ea)](_0x2c24ad['MapID']);}for(const _0x2bc5ab of _0x22d87d){if(VisuMZ[_0x827574(0x5d6)][_0x2bc5ab])continue;const _0x71343c='Map%1.json'['format'](_0x2bc5ab[_0x827574(0x644)](0x3)),_0x3260d8='$preloadedMap_%1'['format'](_0x2bc5ab);DataManager[_0x827574(0x3e1)](_0x3260d8,_0x71343c),setTimeout(this['VisuMZ_Setup_Preload_Map']['bind'](this,_0x2bc5ab,_0x3260d8),0x64);}},Scene_Boot[_0x44537c(0x4aa)]['VisuMZ_Setup_Preload_Map']=function(_0x4f84ec,_0x34eb4c){const _0x54bf31=_0x44537c;window[_0x34eb4c]?(VisuMZ[_0x54bf31(0x5d6)][_0x4f84ec]=window[_0x34eb4c],window[_0x34eb4c]=undefined):setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x54bf31(0x657)](this,_0x4f84ec,_0x34eb4c),0x64);},VisuMZ[_0x44537c(0x572)]=[],VisuMZ[_0x44537c(0x441)]=[],VisuMZ[_0x44537c(0x219)]=[],VisuMZ[_0x44537c(0x4b2)]={},VisuMZ[_0x44537c(0x268)]=[],VisuMZ[_0x44537c(0x56a)]=[],VisuMZ['MapVariables']=[],VisuMZ[_0x44537c(0x59c)]={},Scene_Boot[_0x44537c(0x4aa)][_0x44537c(0x5ee)]=function(){const _0x338bd4=_0x44537c;for(let _0x3cfc2c=0x1;_0x3cfc2c<$dataSystem[_0x338bd4(0x6c0)]['length'];_0x3cfc2c++){if($dataSystem[_0x338bd4(0x6c0)][_0x3cfc2c][_0x338bd4(0x276)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x338bd4(0x572)]['push'](_0x3cfc2c);if($dataSystem[_0x338bd4(0x6c0)][_0x3cfc2c]['match'](/<SELF>/i))VisuMZ[_0x338bd4(0x441)]['push'](_0x3cfc2c);if($dataSystem[_0x338bd4(0x6c0)][_0x3cfc2c][_0x338bd4(0x276)](/<MAP>/i))VisuMZ[_0x338bd4(0x219)]['push'](_0x3cfc2c);if($dataSystem['switches'][_0x3cfc2c][_0x338bd4(0x276)](/\(\((.*)\)\)/i)){const _0x5d9174=String(RegExp['$1'])['toUpperCase']()[_0x338bd4(0x35e)]();VisuMZ[_0x338bd4(0x4b2)][_0x5d9174]=_0x3cfc2c;}else{if($dataSystem['switches'][_0x3cfc2c][_0x338bd4(0x276)](/\（\（(.*)\）\）/i)){const _0x47a1b2=String(RegExp['$1'])[_0x338bd4(0x526)]()[_0x338bd4(0x35e)]();VisuMZ[_0x338bd4(0x4b2)][_0x47a1b2]=_0x3cfc2c;}}}for(let _0xc82066=0x1;_0xc82066<$dataSystem[_0x338bd4(0x551)][_0x338bd4(0x220)];_0xc82066++){if($dataSystem[_0x338bd4(0x551)][_0xc82066][_0x338bd4(0x276)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x338bd4(0x268)][_0x338bd4(0x5ea)](_0xc82066);if($dataSystem[_0x338bd4(0x551)][_0xc82066][_0x338bd4(0x276)](/<SELF>/i))VisuMZ[_0x338bd4(0x56a)][_0x338bd4(0x5ea)](_0xc82066);if($dataSystem[_0x338bd4(0x551)][_0xc82066][_0x338bd4(0x276)](/<MAP>/i))VisuMZ[_0x338bd4(0x5f5)]['push'](_0xc82066);if($dataSystem[_0x338bd4(0x551)][_0xc82066][_0x338bd4(0x276)](/\(\((.*)\)\)/i)){const _0x43e758=String(RegExp['$1'])[_0x338bd4(0x526)]()['trim']();VisuMZ[_0x338bd4(0x59c)][_0x43e758]=_0xc82066;}else{if($dataSystem[_0x338bd4(0x551)][_0xc82066]['match'](/\（\（(.*)\）\）/i)){const _0x5561dd=String(RegExp['$1'])[_0x338bd4(0x526)]()[_0x338bd4(0x35e)]();VisuMZ['RefVariables'][_0x5561dd]=_0xc82066;}}}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x596)]={},VisuMZ[_0x44537c(0x646)]['CustomPageConditions'][_0x44537c(0x459)]=function(){const _0x4bfbad=_0x44537c;this[_0x4bfbad(0x6b1)]=new Game_CPCInterpreter(),this[_0x4bfbad(0x372)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x596)][_0x44537c(0x372)]=function(){const _0x3f6eac=_0x44537c;this[_0x3f6eac(0x4ef)]=[];for(const _0x1fe43f of $dataCommonEvents){if(!_0x1fe43f)continue;VisuMZ[_0x3f6eac(0x646)][_0x3f6eac(0x596)][_0x3f6eac(0x3cf)](_0x1fe43f);if(_0x1fe43f[_0x3f6eac(0x56b)][_0x3f6eac(0x220)]>0x0)this['_commonEvents'][_0x3f6eac(0x5ea)](_0x1fe43f['id']);}},VisuMZ[_0x44537c(0x646)]['CustomPageConditions'][_0x44537c(0x471)]=function(_0x25e043,_0xcdc0c,_0x1b17fd){const _0xba6472=_0x44537c;return this[_0xba6472(0x6b1)][_0xba6472(0x2c8)](_0x25e043,_0xcdc0c),_0x1b17fd?this[_0xba6472(0x6b1)]['executeCommonEvent'](_0x1b17fd):this[_0xba6472(0x6b1)][_0xba6472(0x2d8)](),this[_0xba6472(0x6b1)]['_cpc'];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x596)]['loadCPC']=function(_0x46d311){const _0x1965ef=_0x44537c;let _0x156a78=![];_0x46d311[_0x1965ef(0x56b)]=[];for(const _0x50144f of _0x46d311[_0x1965ef(0x655)]){if([0x6c,0x198][_0x1965ef(0x680)](_0x50144f[_0x1965ef(0x5a4)])){const _0x454ffa=_0x50144f[_0x1965ef(0x420)][0x0];if(_0x454ffa['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x156a78=!![];else _0x454ffa[_0x1965ef(0x276)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x156a78=![]);}_0x156a78&&_0x46d311[_0x1965ef(0x56b)]['push'](_0x50144f);}},getSelfSwitchValue=function(_0x208cf2,_0x56ed6e,_0x5036f4){const _0x3af107=_0x44537c;let _0x3dd70a=[_0x208cf2,_0x56ed6e,'Self\x20Switch\x20%1'['format'](_0x5036f4)];return typeof _0x5036f4===_0x3af107(0x4e5)&&(_0x3dd70a=[_0x208cf2,_0x56ed6e,_0x5036f4['toUpperCase']()[_0x3af107(0x35e)]()]),$gameSelfSwitches['value'](_0x3dd70a);},getMapSwitchValue=function(_0xea5254,_0x1a76fd){const _0x2a5319=_0x44537c;let _0x4176de=[0x0,0x0,_0x2a5319(0x2f8)['format'](_0xea5254,_0x1a76fd)];return $gameSelfSwitches[_0x2a5319(0x1f3)](_0x4176de);},getMapVariableValue=function(_0x1fac8f,_0x423e52){const _0x19ed51=_0x44537c;let _0x29b0e8=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x19ed51(0x48f)](_0x1fac8f,_0x423e52)];return $gameSelfSwitches[_0x19ed51(0x1f3)](_0x29b0e8);},getSelfVariableValue=function(_0x9fcbba,_0xb4e19b,_0xca2445){const _0x17ee1e=_0x44537c,_0x232bb6=[_0x9fcbba,_0xb4e19b,_0x17ee1e(0x4d7)['format'](_0xca2445)];return $gameSelfSwitches[_0x17ee1e(0x1f3)](_0x232bb6);},setSelfSwitchValue=function(_0x43a4a8,_0x582461,_0x3bdbf8,_0x58cc32){const _0x3a4097=_0x44537c;let _0x2bfc99=[_0x43a4a8,_0x582461,_0x3a4097(0x612)[_0x3a4097(0x48f)](_0x3bdbf8)];typeof _0x3bdbf8===_0x3a4097(0x4e5)&&(_0x2bfc99=[_0x43a4a8,_0x582461,_0x3bdbf8[_0x3a4097(0x526)]()[_0x3a4097(0x35e)]()]),$gameSelfSwitches[_0x3a4097(0x626)](_0x2bfc99,_0x58cc32);},setSelfVariableValue=function(_0x3ee159,_0x5b5b22,_0x790ad7,_0x3b2ed9){const _0x167cb2=_0x44537c,_0x1d2082=[_0x3ee159,_0x5b5b22,'Self\x20Variable\x20%1'[_0x167cb2(0x48f)](_0x790ad7)];$gameSelfSwitches['setValue'](_0x1d2082,_0x3b2ed9);},setMapSwitchValue=function(_0x3641f5,_0x1750f3,_0x222438){const _0x456f0c=_0x44537c;let _0xd61d68=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x456f0c(0x48f)](_0x3641f5,_0x1750f3)];$gameSelfSwitches[_0x456f0c(0x626)](_0xd61d68,_0x222438);},setMapVariableValue=function(_0x4902d9,_0x59253a,_0x5c3218){const _0x5a7f7a=_0x44537c;let _0x58632f=[0x0,0x0,_0x5a7f7a(0x64c)[_0x5a7f7a(0x48f)](_0x4902d9,_0x59253a)];$gameSelfSwitches[_0x5a7f7a(0x626)](_0x58632f,_0x5c3218);},DataManager[_0x44537c(0x3be)]=function(_0x46b47b){const _0x414150=_0x44537c;if(SceneManager[_0x414150(0x5e7)][_0x414150(0x69e)]===Scene_Debug)return![];return VisuMZ[_0x414150(0x572)][_0x414150(0x680)](_0x46b47b);},DataManager[_0x44537c(0x59e)]=function(_0x407edd){const _0x270c66=_0x44537c;if(SceneManager[_0x270c66(0x5e7)][_0x270c66(0x69e)]===Scene_Debug)return![];return VisuMZ[_0x270c66(0x268)][_0x270c66(0x680)](_0x407edd);},DataManager[_0x44537c(0x67f)]=function(_0x986784){const _0x5289cc=_0x44537c;if(SceneManager[_0x5289cc(0x5e7)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x5289cc(0x441)][_0x5289cc(0x680)](_0x986784);},DataManager[_0x44537c(0x485)]=function(_0x48b4f9){const _0x374ca8=_0x44537c;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ[_0x374ca8(0x56a)]['includes'](_0x48b4f9);},DataManager[_0x44537c(0x694)]=function(_0x1ed9b7){const _0x35a0ab=_0x44537c;if(BattleManager[_0x35a0ab(0x295)]())return![];return VisuMZ[_0x35a0ab(0x219)][_0x35a0ab(0x680)](_0x1ed9b7);},DataManager[_0x44537c(0x4ac)]=function(_0x13feda){const _0x290801=_0x44537c;if(BattleManager[_0x290801(0x295)]())return![];return VisuMZ[_0x290801(0x5f5)][_0x290801(0x680)](_0x13feda);},ImageManager[_0x44537c(0x429)]=function(_0xb041f0){const _0x3af268=_0x44537c;return _0xb041f0[_0x3af268(0x276)](/\[INV(?:|ISIBLE)\]/i);},SceneManager[_0x44537c(0x3b0)]=function(){const _0x14fc99=_0x44537c;return this[_0x14fc99(0x5e7)]&&this[_0x14fc99(0x5e7)][_0x14fc99(0x69e)]===Scene_Map;},SceneManager[_0x44537c(0x51b)]=function(){const _0x5e3503=_0x44537c;return this['_scene']&&this[_0x5e3503(0x5e7)]instanceof Scene_Map;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x538)]=Game_Temp[_0x44537c(0x4aa)][_0x44537c(0x3a5)],Game_Temp[_0x44537c(0x4aa)][_0x44537c(0x3a5)]=function(_0x42bce3,_0x4c2541){const _0xaa8bcf=_0x44537c;if(this[_0xaa8bcf(0x652)](_0x42bce3,_0x4c2541))return;VisuMZ[_0xaa8bcf(0x646)][_0xaa8bcf(0x538)]['call'](this,_0x42bce3,_0x4c2541);},Game_Temp['prototype'][_0x44537c(0x652)]=function(_0x5519a9,_0x501e73){const _0x3f49ff=_0x44537c,_0x3fe86e=$gameMap['eventsXy'](_0x5519a9,_0x501e73);for(const _0x5d5b78 of _0x3fe86e){if(_0x5d5b78&&_0x5d5b78[_0x3f49ff(0x360)]())return _0x5d5b78[_0x3f49ff(0x5d7)](),!![];}return TouchInput[_0x3f49ff(0x400)]()&&_0x3fe86e['length']>0x0&&_0x3fe86e[_0x3f49ff(0x410)](_0x422c9c=>_0x422c9c&&_0x422c9c[_0x3f49ff(0x567)]())&&TouchInput[_0x3f49ff(0x386)](),![];},Game_Event['prototype'][_0x44537c(0x567)]=function(){const _0x218c89=_0x44537c;if(this[_0x218c89(0x4cd)])return![];let _0x4c8257=this[_0x218c89(0x655)]()[_0x218c89(0x548)]();return _0x4c8257=_0x4c8257[_0x218c89(0x60f)](_0x278b65=>![0x0,0x6c,0x198][_0x218c89(0x680)](_0x278b65['code'])),_0x4c8257[_0x218c89(0x220)]>0x0;},Game_Temp[_0x44537c(0x4aa)][_0x44537c(0x30c)]=function(_0x5985dc){this['_lastPluginCommandInterpreter']=_0x5985dc;},Game_Temp['prototype'][_0x44537c(0x515)]=function(){const _0x2fcaa1=_0x44537c;return this[_0x2fcaa1(0x362)];},Game_Temp[_0x44537c(0x4aa)][_0x44537c(0x450)]=function(_0x1d8fd7){this['_selfTarget']=_0x1d8fd7;},Game_Temp['prototype']['clearSelfTarget']=function(){this['_selfTarget']=undefined;},Game_Temp[_0x44537c(0x4aa)]['getSelfTarget']=function(){const _0x49a8fa=_0x44537c;return this[_0x49a8fa(0x310)];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x431)]=Game_System[_0x44537c(0x4aa)]['initialize'],Game_System[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(){const _0x5c11b9=_0x44537c;VisuMZ[_0x5c11b9(0x646)]['Game_System_initialize'][_0x5c11b9(0x21e)](this),this[_0x5c11b9(0x42f)](),this[_0x5c11b9(0x44a)]();},Game_System['prototype'][_0x44537c(0x42f)]=function(){const _0x1d6ed5=_0x44537c;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x1d6ed5(0x1e6)]={},this[_0x1d6ed5(0x221)]=[],this['_PreservedEventMorphData']={},this[_0x1d6ed5(0x52d)]={},this[_0x1d6ed5(0x33b)]=![],this[_0x1d6ed5(0x627)]=_0x1d6ed5(0x42c);},Game_System[_0x44537c(0x4aa)]['isDashingEnabled']=function(){const _0x43fce5=_0x44537c;if(this[_0x43fce5(0x513)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x43fce5(0x469)]===undefined)this[_0x43fce5(0x42f)]();return this[_0x43fce5(0x513)][_0x43fce5(0x469)];},Game_System['prototype'][_0x44537c(0x26b)]=function(_0x4e9e5a){const _0x71e24=_0x44537c;if(this['_EventsMoveCoreSettings']===undefined)this[_0x71e24(0x42f)]();if(this[_0x71e24(0x513)][_0x71e24(0x469)]===undefined)this['initEventsMoveCore']();this[_0x71e24(0x513)][_0x71e24(0x469)]=_0x4e9e5a;},Game_System[_0x44537c(0x4aa)][_0x44537c(0x2fc)]=function(){const _0x377073=_0x44537c;if(this[_0x377073(0x513)]===undefined)this[_0x377073(0x42f)]();if(this['_EventsMoveCoreSettings'][_0x377073(0x2ec)]===undefined)this[_0x377073(0x42f)]();return this[_0x377073(0x513)][_0x377073(0x2ec)];},Game_System['prototype'][_0x44537c(0x468)]=function(_0x4a2f5e){const _0x31d057=_0x44537c;if(this[_0x31d057(0x513)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x31d057(0x2ec)]===undefined)this[_0x31d057(0x42f)]();this[_0x31d057(0x513)][_0x31d057(0x2ec)]=_0x4a2f5e;},Game_System[_0x44537c(0x4aa)][_0x44537c(0x5b3)]=function(){const _0x435225=_0x44537c;if(this[_0x435225(0x513)]===undefined)this[_0x435225(0x42f)]();if(this[_0x435225(0x513)][_0x435225(0x56d)]===undefined)this[_0x435225(0x42f)]();return this['_EventsMoveCoreSettings'][_0x435225(0x56d)];},Game_System['prototype'][_0x44537c(0x1e9)]=function(_0x3c98f4){const _0xc5f5a2=_0x44537c;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0xc5f5a2(0x513)]['VisibleEventLabels']===undefined)this[_0xc5f5a2(0x42f)]();this[_0xc5f5a2(0x513)]['VisibleEventLabels']=_0x3c98f4;},Game_System[_0x44537c(0x4aa)][_0x44537c(0x1ff)]=function(){const _0x25af19=_0x44537c;return this[_0x25af19(0x33b)]===undefined&&(this['_DisablePlayerControl']=![]),this['_DisablePlayerControl'];},Game_System['prototype']['setPlayerControlDisable']=function(_0x2ecbf0){const _0x5288f2=_0x44537c;this[_0x5288f2(0x33b)]=_0x2ecbf0;},Game_System[_0x44537c(0x4aa)]['getPlayerDiagonalSetting']=function(){const _0x2e57fb=_0x44537c;return this[_0x2e57fb(0x627)];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x21c)]=function(_0x2921ef){const _0x4bd476=_0x44537c;this[_0x4bd476(0x627)]=String(_0x2921ef)[_0x4bd476(0x53b)]()['trim']();},Game_System['prototype'][_0x44537c(0x3f0)]=function(_0x39f59b){const _0x591fe5=_0x44537c;if(this[_0x591fe5(0x1e6)]===undefined)this['initEventsMoveCore']();if(!_0x39f59b)return null;if(_0x39f59b===$gamePlayer)return this[_0x591fe5(0x1e6)][_0x591fe5(0x48d)];else{const _0x3a62b9=VisuMZ['EventsMoveCore'][_0x591fe5(0x633)],_0x1f775b=_0x591fe5(0x34d)[_0x591fe5(0x48f)](_0x39f59b[_0x591fe5(0x2b9)],_0x39f59b[_0x591fe5(0x5c0)]);return this[_0x591fe5(0x1e6)][_0x1f775b]=this['_EventIcons'][_0x1f775b]||{'iconIndex':0x0,'bufferX':_0x3a62b9[_0x591fe5(0x407)][_0x591fe5(0x327)],'bufferY':_0x3a62b9[_0x591fe5(0x407)][_0x591fe5(0x412)],'blendMode':_0x3a62b9[_0x591fe5(0x407)][_0x591fe5(0x20a)]},this[_0x591fe5(0x1e6)][_0x1f775b];}},Game_System[_0x44537c(0x4aa)][_0x44537c(0x4c0)]=function(_0x383820,_0xd21845,_0x128c0f,_0x38e3e8,_0x4ba617){const _0x12c5ce=_0x44537c;if(this[_0x12c5ce(0x1e6)]===undefined)this[_0x12c5ce(0x42f)]();const _0x459a4f=_0x383820===$gamePlayer?'Player':_0x12c5ce(0x34d)['format'](_0x383820[_0x12c5ce(0x2b9)],_0x383820[_0x12c5ce(0x5c0)]);this[_0x12c5ce(0x1e6)][_0x459a4f]={'iconIndex':_0xd21845,'bufferX':_0x128c0f,'bufferY':_0x38e3e8,'blendMode':_0x4ba617};},Game_System[_0x44537c(0x4aa)]['setEventIconDataKey']=function(_0xa733d5,_0x2ddbec,_0x149dfc,_0x139b08,_0x3e440f,_0x26c852,_0x4b17fa){const _0x17c7f2=_0x44537c;if(this['_EventIcons']===undefined)this[_0x17c7f2(0x42f)]();const _0x1d9a5e=_0x17c7f2(0x34d)[_0x17c7f2(0x48f)](_0xa733d5,_0x2ddbec);this['_EventIcons'][_0x1d9a5e]={'iconIndex':_0x149dfc,'forced':_0x4b17fa,'bufferX':_0x139b08,'bufferY':_0x3e440f,'blendMode':_0x26c852};},Game_System[_0x44537c(0x4aa)][_0x44537c(0x270)]=function(_0x5b204b){const _0x853706=_0x44537c;if(this[_0x853706(0x1e6)]===undefined)this[_0x853706(0x42f)]();if(!_0x5b204b)return null;_0x5b204b===$gamePlayer?delete this['_EventIcons'][_0x853706(0x48d)]:this[_0x853706(0x222)](_0x5b204b[_0x853706(0x2b9)],_0x5b204b[_0x853706(0x5c0)]);},Game_System[_0x44537c(0x4aa)]['deleteIconsOnEventsDataKey']=function(_0x35303d,_0x5d9cf6){const _0x5a3b14=_0x44537c;if(this[_0x5a3b14(0x1e6)]===undefined)this[_0x5a3b14(0x42f)]();this[_0x5a3b14(0x2a8)](_0x35303d,_0x5d9cf6,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x44537c(0x4aa)][_0x44537c(0x44d)]=function(_0x40fde2){const _0xce3b51=_0x44537c;if(this[_0xce3b51(0x1e6)]===undefined)this['initEventsMoveCore']();if(!_0x40fde2)return null;_0x40fde2===$gamePlayer?delete this[_0xce3b51(0x1e6)][_0xce3b51(0x48d)]:this[_0xce3b51(0x5d2)](_0x40fde2[_0xce3b51(0x2b9)],_0x40fde2[_0xce3b51(0x5c0)]);},Game_System[_0x44537c(0x4aa)][_0x44537c(0x5d2)]=function(_0x209524,_0x4d64cf){const _0x2348a8=_0x44537c;if(this[_0x2348a8(0x1e6)]===undefined)this[_0x2348a8(0x42f)]();const _0xf48575=_0x2348a8(0x34d)[_0x2348a8(0x48f)](_0x209524,_0x4d64cf);if(this['_EventIcons'][_0xf48575]){if(this[_0x2348a8(0x1e6)][_0xf48575][_0x2348a8(0x5e0)]<0x0)return;if(this[_0x2348a8(0x1e6)][_0xf48575][_0x2348a8(0x353)])return;}delete this['_EventIcons'][_0xf48575];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x63b)]=function(_0x996912,_0x1c234e){const _0x5a2045=_0x44537c;if(this[_0x5a2045(0x1e6)]===undefined)this[_0x5a2045(0x42f)]();const _0x235775=_0x5a2045(0x34d)[_0x5a2045(0x48f)](_0x996912,_0x1c234e);delete this[_0x5a2045(0x1e6)][_0x235775];if(_0x996912!==$gameMap['mapId']())return;const _0x2c90e0=$gameMap[_0x5a2045(0x246)](_0x1c234e);if(!_0x2c90e0)return;_0x2c90e0[_0x5a2045(0x20f)]();},Game_System['prototype'][_0x44537c(0x23a)]=function(_0x821aeb){const _0x71e35=_0x44537c;if(this[_0x71e35(0x52d)]===undefined)this[_0x71e35(0x42f)]();if(!_0x821aeb)return null;const _0x2e0f1b=_0x71e35(0x34d)[_0x71e35(0x48f)](_0x821aeb['_mapId'],_0x821aeb[_0x71e35(0x5c0)]);return this[_0x71e35(0x52d)][_0x2e0f1b];},Game_System['prototype'][_0x44537c(0x52f)]=function(_0x44ab53){const _0x128839=_0x44537c;if(this[_0x128839(0x52d)]===undefined)this[_0x128839(0x42f)]();if(!_0x44ab53)return;const _0x52b83d=_0x128839(0x34d)['format'](_0x44ab53[_0x128839(0x2b9)],_0x44ab53[_0x128839(0x5c0)]);this[_0x128839(0x52d)][_0x52b83d]={'direction':_0x44ab53[_0x128839(0x29f)](),'x':Math['round'](_0x44ab53['x']),'y':Math[_0x128839(0x4c4)](_0x44ab53['y']),'pageIndex':_0x44ab53['_pageIndex'],'moveRouteIndex':_0x44ab53[_0x128839(0x4c2)]};},Game_System[_0x44537c(0x4aa)][_0x44537c(0x38a)]=function(_0xce851a){const _0x14bccd=_0x44537c;if(this['_SavedEventLocations']===undefined)this[_0x14bccd(0x42f)]();if(!_0xce851a)return;this[_0x14bccd(0x5c2)](_0xce851a[_0x14bccd(0x2b9)],_0xce851a[_0x14bccd(0x5c0)]);},Game_System['prototype'][_0x44537c(0x5c2)]=function(_0x1ac828,_0x23dca6){const _0x4f8ad9=_0x44537c;if(this[_0x4f8ad9(0x52d)]===undefined)this[_0x4f8ad9(0x42f)]();const _0x8df017=_0x4f8ad9(0x34d)['format'](_0x1ac828,_0x23dca6);delete this[_0x4f8ad9(0x52d)][_0x8df017];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x51c)]=function(_0x46ca46,_0x29ca9d,_0x4e8331,_0x4e4982,_0x3bea80,_0x16ff37,_0x18b3a3){const _0x3081ad=_0x44537c;if(this[_0x3081ad(0x52d)]===undefined)this['initEventsMoveCore']();const _0x5f45dd=_0x3081ad(0x34d)[_0x3081ad(0x48f)](_0x46ca46,_0x29ca9d);this[_0x3081ad(0x52d)][_0x5f45dd]={'direction':_0x3bea80,'x':Math[_0x3081ad(0x4c4)](_0x4e8331),'y':Math[_0x3081ad(0x4c4)](_0x4e4982),'pageIndex':_0x16ff37,'moveRouteIndex':_0x18b3a3};},Game_System[_0x44537c(0x4aa)]['getPreservedMorphEventData']=function(_0x30558a){const _0x441595=_0x44537c;if(this[_0x441595(0x46c)]===undefined)this[_0x441595(0x42f)]();if(!_0x30558a)return;const _0xcc649=_0x441595(0x34d)[_0x441595(0x48f)](_0x30558a[_0x441595(0x2b9)],_0x30558a['_eventId']);return this['_PreservedEventMorphData'][_0xcc649];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x3f3)]=function(_0x19174b,_0x467a76,_0xf50f40,_0x371eb7,_0x524e6d){const _0x37c111=_0x44537c;if(this[_0x37c111(0x46c)]===undefined)this[_0x37c111(0x42f)]();const _0xc85dff='Map%1-Event%2'['format'](_0x19174b,_0x467a76);this['_PreservedEventMorphData'][_0xc85dff]={'template':_0xf50f40,'mapId':_0x371eb7,'eventId':_0x524e6d};},Game_System[_0x44537c(0x4aa)][_0x44537c(0x698)]=function(_0x3d0a3c,_0x48482a){const _0x20fa6a=_0x44537c;if(this[_0x20fa6a(0x46c)]===undefined)this[_0x20fa6a(0x42f)]();const _0x2c5adf='Map%1-Event%2'[_0x20fa6a(0x48f)](_0x3d0a3c,_0x48482a);delete this[_0x20fa6a(0x46c)][_0x2c5adf];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x520)]=function(_0x111012){const _0x420150=_0x44537c;if(this['_MapSpawnedEventData']===undefined)this[_0x420150(0x42f)]();return this[_0x420150(0x221)][_0x111012]=this[_0x420150(0x221)][_0x111012]||[],this[_0x420150(0x221)][_0x111012];},Game_System[_0x44537c(0x4aa)]['removeTemporaryMapSpawnedEvents']=function(_0x5b1d86){const _0x46a092=_0x44537c,_0x23011b=this[_0x46a092(0x520)](_0x5b1d86);for(const _0x106a96 of _0x23011b){if(!_0x106a96)continue;if(_0x106a96['_spawnPreserved'])continue;const _0x54c109=_0x23011b['indexOf'](_0x106a96);_0x23011b[_0x54c109]=null;}},Game_System[_0x44537c(0x4aa)][_0x44537c(0x44a)]=function(){const _0x4e4614=_0x44537c;this[_0x4e4614(0x428)]=0x0,this[_0x4e4614(0x391)]=![];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x3bb)]=function(){const _0x3889b3=_0x44537c;if(this[_0x3889b3(0x428)]===undefined)this[_0x3889b3(0x44a)]();return this['_followerControlID'];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x50e)]=function(_0x34d449){const _0x497189=_0x44537c;if(this[_0x497189(0x428)]===undefined)this[_0x497189(0x44a)]();this[_0x497189(0x428)]=_0x34d449;;},VisuMZ[_0x44537c(0x646)]['Game_Interpreter_character']=Game_Interpreter['prototype']['character'],Game_Interpreter['prototype']['character']=function(_0x4fd7f5){const _0x535bec=_0x44537c;if(!$gameParty['inBattle']()&&_0x4fd7f5<0x0){let _0x195ccf=$gameSystem[_0x535bec(0x3bb)]();if(_0x195ccf>0x0)return $gamePlayer['followers']()[_0x535bec(0x1fb)](_0x195ccf-0x1);}return VisuMZ[_0x535bec(0x646)]['Game_Interpreter_character'][_0x535bec(0x21e)](this,_0x4fd7f5);},Game_System[_0x44537c(0x4aa)][_0x44537c(0x50b)]=function(){const _0x5e53fd=_0x44537c;if(this[_0x5e53fd(0x391)]===undefined)this[_0x5e53fd(0x44a)]();return this[_0x5e53fd(0x391)];},Game_System[_0x44537c(0x4aa)][_0x44537c(0x347)]=function(_0x26a4ac){const _0x16f3ee=_0x44537c;if(this[_0x16f3ee(0x391)]===undefined)this[_0x16f3ee(0x44a)]();this[_0x16f3ee(0x391)]=_0x26a4ac;;},VisuMZ[_0x44537c(0x646)]['Game_Followers_jumpAll']=Game_Followers[_0x44537c(0x4aa)][_0x44537c(0x2f1)],Game_Followers[_0x44537c(0x4aa)][_0x44537c(0x2f1)]=function(){const _0x54636e=_0x44537c;if($gameSystem[_0x54636e(0x50b)]())return;VisuMZ['EventsMoveCore'][_0x54636e(0x601)][_0x54636e(0x21e)](this);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4b0)]=Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x459)],Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(){const _0x7ead9b=_0x44537c;VisuMZ[_0x7ead9b(0x646)]['Game_Timer_initialize'][_0x7ead9b(0x21e)](this),this[_0x7ead9b(0x42f)]();},Game_Timer[_0x44537c(0x4aa)]['initEventsMoveCore']=function(){const _0x11776f=_0x44537c;this['_paused']=![],this[_0x11776f(0x299)]=-0x1,this[_0x11776f(0x333)]=0x0;},Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x613)]=function(_0x1f2d60){const _0x23f3ca=_0x44537c;if(!_0x1f2d60)return;if(!this[_0x23f3ca(0x224)])return;if(this[_0x23f3ca(0x317)])return;if(this[_0x23f3ca(0x63a)]<=0x0)return;if(this[_0x23f3ca(0x299)]===undefined)this[_0x23f3ca(0x42f)]();this['_frames']+=this[_0x23f3ca(0x299)],this[_0x23f3ca(0x63a)]<=0x0&&this[_0x23f3ca(0x4da)]();},VisuMZ['EventsMoveCore'][_0x44537c(0x265)]=Game_Timer['prototype'][_0x44537c(0x273)],Game_Timer[_0x44537c(0x4aa)]['start']=function(_0x5ec474){const _0x43bb1e=_0x44537c;VisuMZ[_0x43bb1e(0x646)][_0x43bb1e(0x265)][_0x43bb1e(0x21e)](this,_0x5ec474);if(this['_paused']===undefined)this[_0x43bb1e(0x42f)]();this[_0x43bb1e(0x317)]=![];},VisuMZ[_0x44537c(0x646)]['Game_Timer_stop']=Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x42b)],Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x42b)]=function(){const _0x2138c3=_0x44537c;VisuMZ[_0x2138c3(0x646)][_0x2138c3(0x477)]['call'](this);if(this['_paused']===undefined)this[_0x2138c3(0x42f)]();this[_0x2138c3(0x317)]=![];},Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x3bf)]=function(){const _0x5c6c41=_0x44537c;if(this[_0x5c6c41(0x63a)]<=0x0)return;this['_paused']=!![],this['_working']=!![];},Game_Timer['prototype'][_0x44537c(0x5b0)]=function(){const _0x22d25c=_0x44537c;if(this[_0x22d25c(0x63a)]<=0x0)return;this[_0x22d25c(0x317)]=![],this['_working']=!![];},Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x28d)]=function(_0x53a740){const _0x2eb352=_0x44537c;this[_0x2eb352(0x63a)]=this['_frames']||0x0,this[_0x2eb352(0x63a)]+=_0x53a740,this[_0x2eb352(0x224)]=!![],this[_0x2eb352(0x63a)]=Math[_0x2eb352(0x423)](0x1,this[_0x2eb352(0x63a)]);},Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x376)]=function(_0x45415d){const _0x51d9bb=_0x44537c;this[_0x51d9bb(0x63a)]=this[_0x51d9bb(0x63a)]||0x0,this['_frames']=_0x45415d,this['_working']=!![],this[_0x51d9bb(0x63a)]=Math[_0x51d9bb(0x423)](0x1,this[_0x51d9bb(0x63a)]);},Game_Timer[_0x44537c(0x4aa)][_0x44537c(0x442)]=function(_0x3cbe86){const _0x1bc890=_0x44537c;this['_speed']=_0x3cbe86,this[_0x1bc890(0x224)]=!![],_0x3cbe86>0x0&&(this[_0x1bc890(0x63a)]=Math[_0x1bc890(0x423)](this[_0x1bc890(0x63a)],0x1));},Game_Timer['prototype'][_0x44537c(0x361)]=function(_0x24e83d){const _0x356523=_0x44537c;if(this[_0x356523(0x333)]===undefined)this[_0x356523(0x42f)]();this['_expireCommonEvent']=_0x24e83d;},VisuMZ[_0x44537c(0x646)]['Game_Timer_onExpire']=Game_Timer[_0x44537c(0x4aa)]['onExpire'],Game_Timer['prototype'][_0x44537c(0x4da)]=function(){const _0x1afadc=_0x44537c;if(this[_0x1afadc(0x333)]===undefined)this[_0x1afadc(0x42f)]();this[_0x1afadc(0x333)]?$gameTemp[_0x1afadc(0x4fd)](this[_0x1afadc(0x333)]):VisuMZ[_0x1afadc(0x646)][_0x1afadc(0x1d7)][_0x1afadc(0x21e)](this);},VisuMZ['EventsMoveCore'][_0x44537c(0x574)]=Game_Message['prototype']['add'],Game_Message['prototype']['add']=function(_0x49646b){const _0x14787d=_0x44537c;VisuMZ[_0x14787d(0x646)][_0x14787d(0x574)][_0x14787d(0x21e)](this,_0x49646b),this[_0x14787d(0x58c)]=$gameTemp[_0x14787d(0x48e)]();},Game_Message['prototype'][_0x44537c(0x23f)]=function(){const _0x15c4a2=_0x44537c;$gameTemp[_0x15c4a2(0x450)](this[_0x15c4a2(0x58c)]);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x3e3)]=Game_Switches[_0x44537c(0x4aa)]['value'],Game_Switches['prototype'][_0x44537c(0x1f3)]=function(_0x21c131){const _0x53e015=_0x44537c;typeof _0x21c131===_0x53e015(0x4e5)&&(_0x21c131=VisuMZ[_0x53e015(0x4b2)][_0x21c131['toUpperCase']()[_0x53e015(0x35e)]()]||0x1);if(DataManager[_0x53e015(0x3be)](_0x21c131))return!!this[_0x53e015(0x59f)](_0x21c131);else{if(DataManager[_0x53e015(0x67f)](_0x21c131))return!!this[_0x53e015(0x524)](_0x21c131);else return DataManager[_0x53e015(0x694)](_0x21c131)?!!this['mapValue'](_0x21c131):VisuMZ[_0x53e015(0x646)][_0x53e015(0x3e3)][_0x53e015(0x21e)](this,_0x21c131);}},Game_Switches[_0x44537c(0x247)]={},Game_Switches[_0x44537c(0x4aa)][_0x44537c(0x59f)]=function(_0x141ae8){const _0x2ffe3a=_0x44537c;if(!Game_Switches[_0x2ffe3a(0x247)][_0x141ae8]){$dataSystem[_0x2ffe3a(0x6c0)][_0x141ae8][_0x2ffe3a(0x276)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x362170=_0x2ffe3a(0x57f)[_0x2ffe3a(0x48f)](String(RegExp['$1']));Game_Switches[_0x2ffe3a(0x247)][_0x141ae8]=new Function(_0x2ffe3a(0x21f),_0x362170);}const _0x1d3b03=$gameTemp[_0x2ffe3a(0x48e)]()||this;return Game_Switches[_0x2ffe3a(0x247)][_0x141ae8]['call'](_0x1d3b03,_0x141ae8);},Game_Switches['prototype']['selfValue']=function(_0x2e14a5){const _0x5624c0=_0x44537c,_0x204b91=$gameTemp[_0x5624c0(0x48e)]()||this;if(_0x204b91[_0x5624c0(0x69e)]!==Game_Event)return VisuMZ[_0x5624c0(0x646)][_0x5624c0(0x3e3)][_0x5624c0(0x21e)](this,_0x2e14a5);else{const _0x366542=[_0x204b91['_mapId'],_0x204b91[_0x5624c0(0x5c0)],'Self\x20Switch\x20%1'[_0x5624c0(0x48f)](_0x2e14a5)];return $gameSelfSwitches['value'](_0x366542);}},Game_Switches[_0x44537c(0x4aa)]['mapValue']=function(_0x501545){const _0x558e18=_0x44537c,_0x10bd7b=$gameMap?$gameMap[_0x558e18(0x4e7)]():0x0,_0x2b5bd3=[0x0,0x0,_0x558e18(0x2f8)[_0x558e18(0x48f)](_0x10bd7b,_0x501545)];return $gameSelfSwitches['value'](_0x2b5bd3);},VisuMZ['EventsMoveCore'][_0x44537c(0x637)]=Game_Switches[_0x44537c(0x4aa)]['setValue'],Game_Switches[_0x44537c(0x4aa)]['setValue']=function(_0x479d1a,_0x10778d){const _0x1fbc83=_0x44537c;typeof _0x479d1a===_0x1fbc83(0x4e5)&&(_0x479d1a=VisuMZ[_0x1fbc83(0x4b2)][_0x479d1a['toUpperCase']()[_0x1fbc83(0x35e)]()]||0x1);if(DataManager[_0x1fbc83(0x67f)](_0x479d1a))this[_0x1fbc83(0x356)](_0x479d1a,_0x10778d);else DataManager[_0x1fbc83(0x694)](_0x479d1a)?this['setMapValue'](_0x479d1a,_0x10778d):VisuMZ['EventsMoveCore'][_0x1fbc83(0x637)][_0x1fbc83(0x21e)](this,_0x479d1a,_0x10778d);},Game_Switches[_0x44537c(0x4aa)][_0x44537c(0x356)]=function(_0x3d8f8e,_0x2fa71b){const _0x5d9fe5=_0x44537c,_0x5dfe34=$gameTemp[_0x5d9fe5(0x48e)]()||this;if(_0x5dfe34[_0x5d9fe5(0x69e)]!==Game_Event)VisuMZ[_0x5d9fe5(0x646)][_0x5d9fe5(0x637)][_0x5d9fe5(0x21e)](this,_0x3d8f8e,_0x2fa71b);else{const _0x1d772f=[_0x5dfe34[_0x5d9fe5(0x2b9)],_0x5dfe34[_0x5d9fe5(0x5c0)],'Self\x20Switch\x20%1'[_0x5d9fe5(0x48f)](_0x3d8f8e)];$gameSelfSwitches['setValue'](_0x1d772f,_0x2fa71b);}},Game_Switches[_0x44537c(0x4aa)]['setMapValue']=function(_0x36e561,_0x16a5ac){const _0x3c93b8=_0x44537c,_0x563276=$gameMap?$gameMap[_0x3c93b8(0x4e7)]():0x0,_0x428d87=[0x0,0x0,_0x3c93b8(0x2f8)[_0x3c93b8(0x48f)](_0x563276,_0x36e561)];return $gameSelfSwitches[_0x3c93b8(0x626)](_0x428d87,_0x16a5ac);},VisuMZ['EventsMoveCore'][_0x44537c(0x5c1)]=Game_Variables[_0x44537c(0x4aa)][_0x44537c(0x1f3)],Game_Variables[_0x44537c(0x4aa)][_0x44537c(0x1f3)]=function(_0x5e18c4){const _0x5309ec=_0x44537c;typeof _0x5e18c4==='string'&&(_0x5e18c4=VisuMZ[_0x5309ec(0x59c)][switchId[_0x5309ec(0x526)]()[_0x5309ec(0x35e)]()]||0x1);if(DataManager[_0x5309ec(0x59e)](_0x5e18c4))return this['advancedValue'](_0x5e18c4);else{if(DataManager[_0x5309ec(0x485)](_0x5e18c4))return this[_0x5309ec(0x524)](_0x5e18c4);else return DataManager[_0x5309ec(0x4ac)](_0x5e18c4)?this[_0x5309ec(0x4a5)](_0x5e18c4):VisuMZ[_0x5309ec(0x646)][_0x5309ec(0x5c1)]['call'](this,_0x5e18c4);}},Game_Variables['advancedFunc']={},Game_Variables['prototype'][_0x44537c(0x59f)]=function(_0xf2baba){const _0x5d734b=_0x44537c;if(!Game_Variables[_0x5d734b(0x247)][_0xf2baba]){$dataSystem['variables'][_0xf2baba][_0x5d734b(0x276)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3da003=_0x5d734b(0x57f)['format'](String(RegExp['$1']));Game_Variables[_0x5d734b(0x247)][_0xf2baba]=new Function(_0x5d734b(0x47e),_0x3da003);}const _0x364bd7=$gameTemp[_0x5d734b(0x48e)]()||this;return Game_Variables['advancedFunc'][_0xf2baba][_0x5d734b(0x21e)](_0x364bd7,_0xf2baba);},Game_Variables['prototype']['selfValue']=function(_0x2c0708){const _0x545f0f=_0x44537c,_0x5bca40=$gameTemp[_0x545f0f(0x48e)]()||this;if(_0x5bca40[_0x545f0f(0x69e)]!==Game_Event)return VisuMZ[_0x545f0f(0x646)]['Game_Variables_value'][_0x545f0f(0x21e)](this,_0x2c0708);else{const _0x496462=[_0x5bca40['_mapId'],_0x5bca40[_0x545f0f(0x5c0)],_0x545f0f(0x4d7)[_0x545f0f(0x48f)](_0x2c0708)];return $gameSelfSwitches[_0x545f0f(0x1f3)](_0x496462);}},Game_Variables[_0x44537c(0x4aa)][_0x44537c(0x4a5)]=function(_0x5d81f8){const _0x269f64=_0x44537c,_0x45b88c=$gameMap?$gameMap[_0x269f64(0x4e7)]():0x0,_0x5349fb=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x45b88c,_0x5d81f8)];return $gameSelfSwitches[_0x269f64(0x1f3)](_0x5349fb)||0x0;},VisuMZ[_0x44537c(0x646)]['Game_Variables_setValue']=Game_Variables[_0x44537c(0x4aa)][_0x44537c(0x626)],Game_Variables[_0x44537c(0x4aa)]['setValue']=function(_0x110c64,_0xea66d2){const _0x838484=_0x44537c;typeof _0x110c64===_0x838484(0x4e5)&&(_0x110c64=VisuMZ['RefVariables'][switchId[_0x838484(0x526)]()[_0x838484(0x35e)]()]||0x1);if(DataManager[_0x838484(0x485)](_0x110c64))this[_0x838484(0x356)](_0x110c64,_0xea66d2);else DataManager[_0x838484(0x4ac)](_0x110c64)?this[_0x838484(0x3ea)](_0x110c64,_0xea66d2):VisuMZ[_0x838484(0x646)][_0x838484(0x4e6)][_0x838484(0x21e)](this,_0x110c64,_0xea66d2);},Game_Variables[_0x44537c(0x4aa)][_0x44537c(0x356)]=function(_0x34375b,_0x99f450){const _0x297f57=_0x44537c,_0x4c14e1=$gameTemp['getSelfTarget']()||this;if(_0x4c14e1[_0x297f57(0x69e)]!==Game_Event)VisuMZ[_0x297f57(0x646)][_0x297f57(0x4e6)][_0x297f57(0x21e)](this,_0x34375b,_0x99f450);else{const _0x4e0f1d=[_0x4c14e1['_mapId'],_0x4c14e1[_0x297f57(0x5c0)],_0x297f57(0x4d7)[_0x297f57(0x48f)](_0x34375b)];$gameSelfSwitches[_0x297f57(0x626)](_0x4e0f1d,_0x99f450);}},Game_Variables[_0x44537c(0x4aa)]['setMapValue']=function(_0x1b12a4,_0x549487){const _0x157c8f=_0x44537c,_0x3777aa=$gameMap?$gameMap[_0x157c8f(0x4e7)]():0x0,_0x5359bf=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x157c8f(0x48f)](_0x3777aa,_0x1b12a4)];$gameSelfSwitches[_0x157c8f(0x626)](_0x5359bf,_0x549487);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4e4)]=Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x1f3)],Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x1f3)]=function(_0x1ba724){const _0x520316=_0x44537c;if(_0x1ba724[0x2][_0x520316(0x276)](/(?:SELF|MAP)/i))return this['selfValue'](_0x1ba724);else{return VisuMZ[_0x520316(0x646)][_0x520316(0x4e4)][_0x520316(0x21e)](this,_0x1ba724);;}},Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x524)]=function(_0x5d9f22){const _0x5b7572=_0x44537c;return _0x5d9f22[0x2][_0x5b7572(0x276)](/VAR/i)?this[_0x5b7572(0x343)][_0x5d9f22]||0x0:!!this[_0x5b7572(0x343)][_0x5d9f22];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x5a2)]=Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x626)],Game_SelfSwitches['prototype']['setValue']=function(_0x43e5d9,_0x455934){const _0x322f11=_0x44537c;_0x43e5d9[0x2][_0x322f11(0x276)](/(?:SELF|MAP)/i)?this['setSelfValue'](_0x43e5d9,_0x455934):VisuMZ[_0x322f11(0x646)][_0x322f11(0x5a2)]['call'](this,_0x43e5d9,_0x455934);},Game_SelfSwitches['prototype'][_0x44537c(0x356)]=function(_0x6fdb9,_0x5140b2){const _0x4c785e=_0x44537c;this[_0x4c785e(0x343)][_0x6fdb9]=_0x6fdb9[0x2][_0x4c785e(0x276)](/VAR/i)?_0x5140b2:!!_0x5140b2,this['onChange']();},VisuMZ[_0x44537c(0x646)]['Scene_Map_createDisplayObjects']=Scene_Map['prototype'][_0x44537c(0x34f)],Scene_Map['prototype'][_0x44537c(0x34f)]=function(){const _0x26799b=_0x44537c;$gameMap[_0x26799b(0x27a)](),VisuMZ['EventsMoveCore'][_0x26799b(0x24f)][_0x26799b(0x21e)](this);},Game_Map['prototype'][_0x44537c(0x27a)]=function(){const _0x30370a=_0x44537c;if(this[_0x30370a(0x69a)]===this[_0x30370a(0x4e7)]())return;this[_0x30370a(0x69a)]=this[_0x30370a(0x4e7)](),this[_0x30370a(0x4a9)]=undefined;const _0x249405=this['events']();for(const _0x568948 of _0x249405){if(_0x568948)$gameSelfSwitches['resetSelfSwitchesForEvent'](_0x568948);}},Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x22d)]=function(_0x3af5a3){const _0x55bf74=_0x44537c;if(!_0x3af5a3)return;if(!_0x3af5a3[_0x55bf74(0x246)]())return;const _0x51f37c=_0x3af5a3[_0x55bf74(0x246)]()['note']||'';if(_0x51f37c['match'](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x449c48='%1,%2,'[_0x55bf74(0x48f)]($gameMap[_0x55bf74(0x2b9)],_0x3af5a3[_0x55bf74(0x5c0)]),_0x9b29e8=Object[_0x55bf74(0x3f9)](this[_0x55bf74(0x343)])[_0x55bf74(0x60f)](_0x57225c=>_0x57225c[_0x55bf74(0x336)](_0x449c48));while(_0x9b29e8[_0x55bf74(0x220)]>0x0){const _0x26fef5=_0x9b29e8[_0x55bf74(0x6be)]();delete this[_0x55bf74(0x343)][_0x26fef5];}}},Game_SelfSwitches[_0x44537c(0x4aa)][_0x44537c(0x650)]=function(_0x4e2869){const _0x371ab5=_0x44537c,_0x5b8db6=_0x371ab5(0x54e)[_0x371ab5(0x48f)]($gameMap[_0x371ab5(0x2b9)]),_0x5a9639=Object[_0x371ab5(0x3f9)](this[_0x371ab5(0x343)])[_0x371ab5(0x60f)](_0x3e2206=>_0x3e2206[_0x371ab5(0x336)](_0x5b8db6));while(_0x5a9639[_0x371ab5(0x220)]>0x0){const _0x555f50=_0x5a9639['shift']();delete this['_data'][_0x555f50];}_0x4e2869===$gameMap[_0x371ab5(0x4e7)]()&&$gameMap[_0x371ab5(0x2d5)]();},VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype'][_0x44537c(0x303)],Game_Enemy[_0x44537c(0x4aa)]['meetsSwitchCondition']=function(_0x391165){const _0x2965b8=_0x44537c;$gameTemp[_0x2965b8(0x450)](this);const _0x3b08e1=VisuMZ[_0x2965b8(0x646)][_0x2965b8(0x516)][_0x2965b8(0x21e)](this,_0x391165);return $gameTemp[_0x2965b8(0x651)](),_0x3b08e1;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x5b7)]=Game_Party['prototype'][_0x44537c(0x387)],Game_Party[_0x44537c(0x4aa)][_0x44537c(0x387)]=function(){const _0x19d8e1=_0x44537c;if(this['isPlayerWithinEncounterHalfEvents']())return!![];return VisuMZ[_0x19d8e1(0x646)]['Game_Party_hasEncounterHalf'][_0x19d8e1(0x21e)](this);},Game_Party['prototype'][_0x44537c(0x654)]=function(){const _0x3d36a0=_0x44537c;if(this[_0x3d36a0(0x26d)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4a4)]=Game_Party[_0x44537c(0x4aa)][_0x44537c(0x3f5)],Game_Party[_0x44537c(0x4aa)]['hasEncounterNone']=function(){const _0x43c2d7=_0x44537c;if(this['isPlayerWithinEncounterNoneEvents']())return!![];return VisuMZ['EventsMoveCore'][_0x43c2d7(0x4a4)][_0x43c2d7(0x21e)](this);},Game_Party[_0x44537c(0x4aa)][_0x44537c(0x384)]=function(){if(this['_checkEncounterRaw'])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x46d821,_0x55a2d5){const _0x1a300e=_0x44537c;if(!$gameMap)return![];_0x46d821=Math['round'](_0x46d821||0x0),_0x55a2d5=Math[_0x1a300e(0x4c4)](_0x55a2d5||0x0);const _0x2a2458=$gameMap[_0x1a300e(0x35c)]();for(const _0x4bfb61 of _0x2a2458){if(!_0x4bfb61)continue;if(_0x4bfb61[_0x1a300e(0x40a)])continue;const _0x2d20f0=_0x4bfb61[_0x1a300e(0x5e9)](!![]),_0x384468=_0x4bfb61[_0x1a300e(0x677)](!![]);if($gameMap['checkEventProximity'](_0x46d821,_0x55a2d5,_0x4bfb61,_0x2d20f0,_0x384468))return!![];}return![];},$isTileEncounterNone=function(_0x5a65a6,_0x37e562){const _0x18d080=_0x44537c;if(!$gameMap)return![];_0x5a65a6=Math['round'](_0x5a65a6||0x0),_0x37e562=Math[_0x18d080(0x4c4)](_0x37e562||0x0);const _0xb13c77=$gameMap['events']();for(const _0xed3e6b of _0xb13c77){if(!_0xed3e6b)continue;if(_0xed3e6b[_0x18d080(0x40a)])continue;const _0x4db192=_0xed3e6b[_0x18d080(0x5e9)](![]),_0x2256f0=_0xed3e6b[_0x18d080(0x677)](![]);if($gameMap['checkEventProximity'](_0x5a65a6,_0x37e562,_0xed3e6b,_0x4db192,_0x2256f0))return!![];}return![];};VisuMZ[_0x44537c(0x646)]['Game_Troop_meetsConditions']=Game_Troop[_0x44537c(0x4aa)][_0x44537c(0x3e7)],Game_Troop[_0x44537c(0x4aa)]['meetsConditions']=function(_0x4b7c03){const _0x58c4e9=_0x44537c;$gameTemp[_0x58c4e9(0x450)](this);const _0x16cdaa=VisuMZ['EventsMoveCore'][_0x58c4e9(0x68a)]['call'](this,_0x4b7c03);return $gameTemp['clearSelfTarget'](),_0x16cdaa;},VisuMZ[_0x44537c(0x646)]['Game_Map_setup']=Game_Map[_0x44537c(0x4aa)]['setup'],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x2c8)]=function(_0x5b4217){const _0x21d8d7=_0x44537c;this['removeTemporaryMapSpawnedEvents'](_0x5b4217),this[_0x21d8d7(0x346)](),VisuMZ[_0x21d8d7(0x646)][_0x21d8d7(0x62c)]['call'](this,_0x5b4217),this[_0x21d8d7(0x346)](),this[_0x21d8d7(0x5d3)](),this[_0x21d8d7(0x4c6)](),this[_0x21d8d7(0x26e)](),this[_0x21d8d7(0x33f)](),this['setupPlayerVisibilityOverrides'](),this['setupFollowerVisibilityOverrides'](),this[_0x21d8d7(0x640)](),this[_0x21d8d7(0x550)](),this[_0x21d8d7(0x346)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x271)]=Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4f0)],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4f0)]=function(){const _0x2f747e=_0x44537c;VisuMZ['EventsMoveCore'][_0x2f747e(0x271)][_0x2f747e(0x21e)](this),this['refreshIfNeeded']();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x44537c(0x4aa)][_0x44537c(0x290)]=function(){const _0x2b7d76=_0x44537c,_0x4b9fdf=Game_Map[_0x2b7d76(0x451)];this[_0x2b7d76(0x51a)]=this[_0x2b7d76(0x35c)]()[_0x2b7d76(0x220)]>_0x4b9fdf;if(this[_0x2b7d76(0x51a)]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4e3)]=function(){const _0x355401=_0x44537c;return this[_0x355401(0x51a)];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x346)]=function(){const _0x33f365=_0x44537c;this[_0x33f365(0x4a9)]=undefined;},Game_Map[_0x44537c(0x4aa)]['setupDiagonalSupport']=function(){const _0x1a401d=_0x44537c;this[_0x1a401d(0x67a)]=VisuMZ[_0x1a401d(0x646)][_0x1a401d(0x633)][_0x1a401d(0x60d)]['EnableDir8'];const _0x229abd=$dataMap[_0x1a401d(0x670)]||'';if(_0x229abd['match'](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x229abd[_0x1a401d(0x276)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x1a401d(0x67a)]=![]);},Game_Map[_0x44537c(0x229)]=VisuMZ[_0x44537c(0x646)][_0x44537c(0x633)]['Movement'][_0x44537c(0x4b8)]??![],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x36f)]=function(){const _0x496ea6=_0x44537c;if(Utils[_0x496ea6(0x320)]()){if(!Game_Map['MOBILE_DIAGONAL_PATHFINDING'])return![];}const _0x5c4eca=$gameSystem[_0x496ea6(0x503)]();if(_0x5c4eca===_0x496ea6(0x24d))return!![];if(_0x5c4eca===_0x496ea6(0x5d5))return![];if(this[_0x496ea6(0x67a)]===undefined)this[_0x496ea6(0x5d3)]();return this[_0x496ea6(0x67a)];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x2cf)]=function(_0x194a5d,_0x3a06f2){const _0x3838e9=_0x44537c;if([0x1,0x4,0x7][_0x3838e9(0x680)](_0x3a06f2))_0x194a5d-=0x1;if([0x3,0x6,0x9]['includes'](_0x3a06f2))_0x194a5d+=0x1;return this[_0x3838e9(0x5ad)](_0x194a5d);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x536)]=function(_0x57dd00,_0x52d168){const _0x2d221e=_0x44537c;if([0x1,0x2,0x3][_0x2d221e(0x680)](_0x52d168))_0x57dd00+=0x1;if([0x7,0x8,0x9][_0x2d221e(0x680)](_0x52d168))_0x57dd00-=0x1;return this[_0x2d221e(0x2bc)](_0x57dd00);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x418)]=function(_0x1356d8,_0x2e7439,_0x3de3bd,_0x580539){const _0x3c6173=_0x44537c;return Math[_0x3c6173(0x423)](Math[_0x3c6173(0x316)](this[_0x3c6173(0x322)](_0x1356d8,_0x3de3bd)),Math[_0x3c6173(0x316)](this[_0x3c6173(0x5a1)](_0x2e7439,_0x580539)));},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4c6)]=function(){const _0x161dca=_0x44537c,_0x12e052=VisuMZ[_0x161dca(0x646)][_0x161dca(0x633)][_0x161dca(0x29e)],_0x551622={},_0x37b646=[_0x161dca(0x58b),_0x161dca(0x4c3),'Dock'],_0x365d86=['All','Walk',_0x161dca(0x48d),_0x161dca(0x444),_0x161dca(0x5db),_0x161dca(0x31b),_0x161dca(0x620),_0x161dca(0x453)];for(const _0x4d3a08 of _0x37b646){for(const _0x2c6219 of _0x365d86){const _0x3f6535=_0x161dca(0x5d1)[_0x161dca(0x48f)](_0x2c6219,_0x4d3a08);_0x12e052[_0x3f6535]&&(_0x551622[_0x3f6535]=_0x12e052[_0x3f6535]['slice'](0x0));}}const _0x1c14ce=$dataMap[_0x161dca(0x670)]||'',_0x5eacd7=_0x1c14ce[_0x161dca(0x276)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x5eacd7)for(const _0x298da8 of _0x5eacd7){_0x298da8[_0x161dca(0x276)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x4aafad=String(RegExp['$1'])['toLowerCase']()[_0x161dca(0x35e)](),_0x24f620=String(RegExp['$2'])[_0x161dca(0x53b)]()[_0x161dca(0x35e)]();const _0x8bb7bd=JSON['parse']('['+RegExp['$3']['match'](/\d+/g)+']');_0x4aafad=_0x4aafad[_0x161dca(0x480)](0x0)['toUpperCase']()+_0x4aafad['slice'](0x1),_0x24f620=_0x24f620[_0x161dca(0x480)](0x0)[_0x161dca(0x526)]()+_0x24f620[_0x161dca(0x32b)](0x1);const _0x4f3292=_0x161dca(0x5d1)[_0x161dca(0x48f)](_0x4aafad,_0x24f620);if(_0x551622[_0x4f3292])_0x551622[_0x4f3292]=_0x551622[_0x4f3292][_0x161dca(0x4e9)](_0x8bb7bd);}this[_0x161dca(0x50c)]=_0x551622;},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x1e8)]=function(_0x2bb9b0,_0x49191d,_0x4c31aa,_0x30de6f){const _0x15757=_0x44537c,_0x5155f8=this['roundXWithDirection'](_0x2bb9b0,_0x4c31aa),_0x20e393=this['roundYWithDirection'](_0x49191d,_0x4c31aa),_0x52301f=this[_0x15757(0x1fa)](_0x5155f8,_0x20e393),_0xcd1fc7=this[_0x15757(0x50c)];if(_0xcd1fc7[_0x15757(0x517)]['includes'](_0x52301f))return!![];else{if(_0x30de6f===_0x15757(0x1eb))return _0xcd1fc7[_0x15757(0x46f)][_0x15757(0x680)](_0x52301f)||_0xcd1fc7['WalkAllow'][_0x15757(0x680)](_0x52301f);else{if(_0x30de6f===_0x15757(0x246))return _0xcd1fc7[_0x15757(0x2db)][_0x15757(0x680)](_0x52301f)||_0xcd1fc7[_0x15757(0x323)][_0x15757(0x680)](_0x52301f);else{if(_0xcd1fc7['VehicleAllow'][_0x15757(0x680)](_0x52301f))return!![];else{const _0x353119=_0x15757(0x602)[_0x15757(0x48f)](_0x30de6f[_0x15757(0x480)](0x0)[_0x15757(0x526)]()+_0x30de6f['slice'](0x1));if(_0xcd1fc7[_0x353119])return _0xcd1fc7[_0x353119][_0x15757(0x680)](_0x52301f);}}}}return![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x5de)]=function(_0x4b2cb3,_0x4366e2,_0x57dfd4,_0x10746f){const _0x5e248d=_0x44537c,_0x10e1ac=this['roundXWithDirection'](_0x4b2cb3,_0x57dfd4),_0xfb0448=this[_0x5e248d(0x536)](_0x4366e2,_0x57dfd4),_0x4ee914=this[_0x5e248d(0x1fa)](_0x10e1ac,_0xfb0448),_0x58d002=this[_0x5e248d(0x50c)];if(_0x58d002[_0x5e248d(0x54c)][_0x5e248d(0x680)](_0x4ee914))return!![];else{if(_0x10746f===_0x5e248d(0x1eb))return _0x58d002['PlayerForbid'][_0x5e248d(0x680)](_0x4ee914)||_0x58d002[_0x5e248d(0x20c)][_0x5e248d(0x680)](_0x4ee914);else{if(_0x10746f===_0x5e248d(0x246))return _0x58d002[_0x5e248d(0x497)][_0x5e248d(0x680)](_0x4ee914)||_0x58d002[_0x5e248d(0x20c)][_0x5e248d(0x680)](_0x4ee914);else{if(_0x58d002[_0x5e248d(0x562)]['includes'](_0x4ee914))return!![];else{const _0x232e48=_0x5e248d(0x57b)[_0x5e248d(0x48f)](_0x10746f[_0x5e248d(0x480)](0x0)[_0x5e248d(0x526)]()+_0x10746f[_0x5e248d(0x32b)](0x1));if(_0x58d002[_0x232e48])return _0x58d002[_0x232e48]['includes'](_0x4ee914);}}}}return![];},Game_Map['prototype'][_0x44537c(0x4f9)]=function(_0x287a75,_0x110d12,_0x2d1540,_0x2958a2){const _0x3a3003=_0x44537c;_0x2d1540=_0x2958a2===_0x3a3003(0x4ea)?0x5:_0x2d1540;const _0x22ed14=this[_0x3a3003(0x2cf)](_0x287a75,_0x2d1540),_0x285949=this[_0x3a3003(0x536)](_0x110d12,_0x2d1540),_0x1751f8=this[_0x3a3003(0x1fa)](_0x22ed14,_0x285949),_0x4d6fc5=this[_0x3a3003(0x50c)];if(_0x4d6fc5['VehicleDock']['includes'](_0x1751f8))return!![];else{const _0x5a2708='%1Dock'[_0x3a3003(0x48f)](_0x2958a2['charAt'](0x0)[_0x3a3003(0x526)]()+_0x2958a2[_0x3a3003(0x32b)](0x1));if(_0x4d6fc5[_0x5a2708])return _0x4d6fc5[_0x5a2708][_0x3a3003(0x680)](_0x1751f8);}return![];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x258)]=Game_Map[_0x44537c(0x4aa)][_0x44537c(0x406)],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x406)]=function(){const _0x298024=_0x44537c;VisuMZ['EventsMoveCore'][_0x298024(0x258)][_0x298024(0x21e)](this),this[_0x298024(0x55d)]();},Game_Map['prototype'][_0x44537c(0x55d)]=function(){const _0x97bc30=_0x44537c;this[_0x97bc30(0x2ad)]=![];if(this[_0x97bc30(0x35c)]()[_0x97bc30(0x410)](_0x56507a=>_0x56507a[_0x97bc30(0x354)]())){this[_0x97bc30(0x2ad)]=!![];return;}if(this['events']()[_0x97bc30(0x410)](_0x1c2548=>_0x1c2548[_0x97bc30(0x457)]())){this[_0x97bc30(0x2ad)]=!![];return;}if(this['_commonEvents'][_0x97bc30(0x410)](_0x14830a=>_0x14830a[_0x97bc30(0x354)]())){this[_0x97bc30(0x2ad)]=!![];return;}if(this[_0x97bc30(0x4ef)]['some'](_0x5bab21=>_0x5bab21['hasCPCs']())){this[_0x97bc30(0x2ad)]=!![];return;}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x2a7)]=Game_Map[_0x44537c(0x4aa)][_0x44537c(0x613)],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x613)]=function(_0x5b541a){const _0x3e203e=_0x44537c;this[_0x3e203e(0x49e)](),VisuMZ[_0x3e203e(0x646)][_0x3e203e(0x2a7)][_0x3e203e(0x21e)](this,_0x5b541a);},Game_Map[_0x44537c(0x4aa)]['updatePeriodicRefresh']=function(){const _0x284045=_0x44537c;if(!this[_0x284045(0x2ad)])return;this['_periodicRefreshTimer']=this[_0x284045(0x4cf)]||0x3c,this[_0x284045(0x4cf)]--,this['_periodicRefreshTimer']<=0x0&&(this[_0x284045(0x2d5)](),this[_0x284045(0x4cf)]=0x3c);},VisuMZ['EventsMoveCore'][_0x44537c(0x3a3)]=Game_Map['prototype']['isDashDisabled'],Game_Map[_0x44537c(0x4aa)]['isDashDisabled']=function(){const _0x8a4ae3=_0x44537c;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ['EventsMoveCore'][_0x8a4ae3(0x3a3)]['call'](this);},Game_Map[_0x44537c(0x4aa)]['setupSaveEventLocations']=function(){const _0x503b46=_0x44537c;this['_saveEventLocations']=![];const _0x1d30b1=$dataMap[_0x503b46(0x670)]||'';_0x1d30b1['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x547)]=function(){const _0xfdfd75=_0x44537c;if(this[_0xfdfd75(0x1f2)]===undefined)this[_0xfdfd75(0x26e)]();return this[_0xfdfd75(0x1f2)];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x289)]=function(_0x490e35){const _0x1b4152=_0x44537c;_0x490e35!==this[_0x1b4152(0x4e7)]()&&$gamePlayer&&$gameSystem[_0x1b4152(0x289)](this[_0x1b4152(0x4e7)]());},Game_Map['prototype'][_0x44537c(0x33f)]=function(){const _0x183df5=_0x44537c;this[_0x183df5(0x3e6)]=$gameSystem['getMapSpawnedEventData'](this[_0x183df5(0x4e7)]()),this[_0x183df5(0x380)]=!![];},VisuMZ['EventsMoveCore'][_0x44537c(0x269)]=Game_Map[_0x44537c(0x4aa)]['events'],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x35c)]=function(){const _0x46b021=_0x44537c;if(this[_0x46b021(0x4a9)])return this[_0x46b021(0x4a9)];const _0x4751ba=VisuMZ[_0x46b021(0x646)][_0x46b021(0x269)][_0x46b021(0x21e)](this),_0x2a3697=_0x4751ba['concat'](this[_0x46b021(0x3e6)]||[]);return this['_eventCache']=_0x2a3697[_0x46b021(0x60f)](_0x3714a3=>!!_0x3714a3),this[_0x46b021(0x4a9)];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x5b5)]=Game_Map['prototype']['event'],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x246)]=function(_0x4d9fe5){const _0x339fc4=_0x44537c;return _0x4d9fe5>=0x3e8?(_0x4d9fe5-=0x3e8,this[_0x339fc4(0x3e6)][_0x4d9fe5]):VisuMZ['EventsMoveCore'][_0x339fc4(0x5b5)][_0x339fc4(0x21e)](this,_0x4d9fe5);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x2e3)]=function(_0x21e90e){const _0x3a4035=_0x44537c,_0x2525bd=this['event'](_0x21e90e);if(_0x2525bd)_0x2525bd[_0x3a4035(0x256)]();},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x68b)]=function(){const _0x373812=_0x44537c,_0x35486e={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x373812(0x3e6)][_0x373812(0x220)]+0x3e8};this['createSpawnedEventWithData'](_0x35486e);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x278)]=function(_0x3660f8,_0x4da335){const _0xccc824=_0x44537c;if(this[_0xccc824(0x374)](_0x3660f8,_0x4da335)[_0xccc824(0x220)]>0x0)return!![];if($gamePlayer['x']===_0x3660f8&&$gamePlayer['y']===_0x4da335)return!![];if(this['boat']()[_0xccc824(0x493)](_0x3660f8,_0x4da335))return!![];if(this[_0xccc824(0x56f)]()[_0xccc824(0x493)](_0x3660f8,_0x4da335))return!![];return![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x365)]=function(_0x310b99,_0x418892,_0x51363a){const _0x412202=_0x44537c;$gameTemp['_spawnData']=_0x310b99;const _0x4bb555=new Game_Event(_0x310b99[_0x412202(0x4e7)],_0x310b99[_0x412202(0x4c8)]);$gameTemp[_0x412202(0x4b4)]=undefined,_0x4bb555[_0x412202(0x406)]();let _0x4e3c1c=_0x418892-_0x4bb555[_0x412202(0x377)]['left'],_0x4f7ae6=_0x418892+_0x4bb555[_0x412202(0x377)][_0x412202(0x425)],_0x26ad82=_0x51363a-_0x4bb555[_0x412202(0x377)]['up'],_0xd60d90=_0x51363a+_0x4bb555['_addedHitbox'][_0x412202(0x37d)];for(let _0x562aa4=_0x4e3c1c;_0x562aa4<=_0x4f7ae6;_0x562aa4++){for(let _0x364255=_0x26ad82;_0x364255<=_0xd60d90;_0x364255++){if(this[_0x412202(0x278)](_0x562aa4,_0x364255))return![];}}return!![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x3fb)]=function(_0x20fa3b){const _0xcab981=_0x44537c;$gameTemp[_0xcab981(0x4b4)]=_0x20fa3b;const _0x301460=new Game_Event(_0x20fa3b[_0xcab981(0x4e7)],_0x20fa3b[_0xcab981(0x4c8)]);$gameTemp['_spawnData']=undefined,this[_0xcab981(0x3e6)]['push'](_0x301460),_0x301460[_0xcab981(0x388)](_0x20fa3b),this[_0xcab981(0x346)]();},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x55e)]=function(_0x4d500f,_0xcfe25,_0x32bb7e){const _0x49415b=_0x44537c,_0x1e2ba5=_0x4d500f[_0x49415b(0x422)][_0x49415b(0x526)]()[_0x49415b(0x35e)]();if(_0x1e2ba5!==_0x49415b(0x3db)){const _0x22bf61=VisuMZ[_0x49415b(0x487)][_0x1e2ba5];_0x22bf61&&(_0x4d500f['mapId']=_0x22bf61[_0x49415b(0x2fb)],_0x4d500f['eventId']=_0x22bf61[_0x49415b(0x2d2)]);}const _0x360e74=_0x4d500f['x'],_0x1682f2=_0x4d500f['y'];if(!this['isValid'](_0x360e74,_0x1682f2))return![];if(_0xcfe25){if(this['checkExistingEntitiesAt'](_0x360e74,_0x1682f2))return![];if(!this[_0x49415b(0x365)](_0x4d500f,_0x360e74,_0x1682f2))return![];}if(_0x32bb7e){if(!this[_0x49415b(0x1f5)](_0x360e74,_0x1682f2))return![];}return this[_0x49415b(0x3fb)](_0x4d500f),!![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x2af)]=function(_0x242c77,_0x58af0c,_0x4c5f15,_0x571987){const _0x59ce9d=_0x44537c,_0x5596d0=_0x242c77[_0x59ce9d(0x422)]['toUpperCase']()[_0x59ce9d(0x35e)]();if(_0x5596d0!=='UNTITLED'){const _0x1b9f98=VisuMZ[_0x59ce9d(0x487)][_0x5596d0];_0x1b9f98&&(_0x242c77['mapId']=_0x1b9f98['MapID'],_0x242c77[_0x59ce9d(0x4c8)]=_0x1b9f98[_0x59ce9d(0x2d2)]);}const _0x1fce38=[],_0xa15b61=this[_0x59ce9d(0x682)](),_0x4aab04=this[_0x59ce9d(0x23b)]();for(let _0x43f594=0x0;_0x43f594<_0xa15b61;_0x43f594++){for(let _0x473c83=0x0;_0x473c83<_0x4aab04;_0x473c83++){if(!_0x58af0c[_0x59ce9d(0x680)](this[_0x59ce9d(0x1fa)](_0x43f594,_0x473c83)))continue;if(!this[_0x59ce9d(0x4a6)](_0x43f594,_0x473c83))continue;if(_0x4c5f15){if(this[_0x59ce9d(0x278)](_0x43f594,_0x473c83))continue;if(!this[_0x59ce9d(0x365)](_0x242c77,_0x43f594,_0x473c83))continue;}if(_0x571987){if(!this[_0x59ce9d(0x1f5)](_0x43f594,_0x473c83))continue;}_0x1fce38['push']([_0x43f594,_0x473c83]);}}if(_0x1fce38[_0x59ce9d(0x220)]>0x0){const _0x4ea206=_0x1fce38[Math[_0x59ce9d(0x590)](_0x1fce38['length'])];return _0x242c77['x']=_0x4ea206[0x0],_0x242c77['y']=_0x4ea206[0x1],this[_0x59ce9d(0x3fb)](_0x242c77),!![];}return![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x36d)]=function(_0x48b8bd,_0x40b6d,_0x33a660,_0x2a04a6){const _0xff0680=_0x44537c,_0xef94a5=_0x48b8bd[_0xff0680(0x422)][_0xff0680(0x526)]()[_0xff0680(0x35e)]();if(_0xef94a5!==_0xff0680(0x3db)){const _0x42b1d4=VisuMZ['EventTemplates'][_0xef94a5];_0x42b1d4&&(_0x48b8bd[_0xff0680(0x4e7)]=_0x42b1d4[_0xff0680(0x2fb)],_0x48b8bd[_0xff0680(0x4c8)]=_0x42b1d4[_0xff0680(0x2d2)]);}const _0x4965cd=[],_0x5dfb5f=this[_0xff0680(0x682)](),_0x39f4ad=this['height']();for(let _0x4af9cc=0x0;_0x4af9cc<_0x5dfb5f;_0x4af9cc++){for(let _0x2f8bd5=0x0;_0x2f8bd5<_0x39f4ad;_0x2f8bd5++){if(!_0x40b6d[_0xff0680(0x680)](this[_0xff0680(0x216)](_0x4af9cc,_0x2f8bd5)))continue;if(!this[_0xff0680(0x4a6)](_0x4af9cc,_0x2f8bd5))continue;if(_0x33a660){if(this[_0xff0680(0x278)](_0x4af9cc,_0x2f8bd5))continue;if(!this[_0xff0680(0x365)](_0x48b8bd,_0x4af9cc,_0x2f8bd5))continue;}if(_0x2a04a6){if(!this[_0xff0680(0x1f5)](_0x4af9cc,_0x2f8bd5))continue;}_0x4965cd[_0xff0680(0x5ea)]([_0x4af9cc,_0x2f8bd5]);}}if(_0x4965cd['length']>0x0){const _0x1ab5bc=_0x4965cd[Math['randomInt'](_0x4965cd['length'])];return _0x48b8bd['x']=_0x1ab5bc[0x0],_0x48b8bd['y']=_0x1ab5bc[0x1],this[_0xff0680(0x3fb)](_0x48b8bd),!![];}return![];},Game_Map[_0x44537c(0x4aa)]['isPassableByAnyDirection']=function(_0x55339f,_0x3bc22a){const _0x31b34e=_0x44537c;if(this[_0x31b34e(0x405)](_0x55339f,_0x3bc22a,0x2))return!![];if(this['isPassable'](_0x55339f,_0x3bc22a,0x4))return!![];if(this[_0x31b34e(0x405)](_0x55339f,_0x3bc22a,0x6))return!![];if(this[_0x31b34e(0x405)](_0x55339f,_0x3bc22a,0x8))return!![];return![];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4be)]=function(_0x36db9a){const _0x374235=_0x44537c;if(_0x36db9a<0x3e8)return;if(!this[_0x374235(0x3e6)])return;const _0x217aed=this[_0x374235(0x246)](_0x36db9a);_0x217aed['locate'](-0x1,-0x1),_0x217aed[_0x374235(0x256)](),this[_0x374235(0x3e6)][_0x36db9a-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x4bd)]=function(){const _0x161ef5=_0x44537c;for(const _0x321d2f of this[_0x161ef5(0x3e6)]){if(_0x321d2f)return _0x321d2f;}return null;},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x52c)]=function(){const _0x55221f=_0x44537c,_0x327158=this[_0x55221f(0x4bd)]();return _0x327158?_0x327158['_eventId']:0x0;},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x691)]=function(){const _0x57c873=_0x44537c,_0x514aa4=this[_0x57c873(0x3e6)][_0x57c873(0x32b)](0x0)[_0x57c873(0x5b1)]();for(const _0x2a72f4 of _0x514aa4){if(_0x2a72f4)return _0x2a72f4;}return null;},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x48a)]=function(){const _0x4c5b97=_0x44537c,_0x3eae3e=this[_0x4c5b97(0x691)]();return _0x3eae3e?_0x3eae3e['_eventId']:0x0;},Game_Map['prototype'][_0x44537c(0x226)]=function(_0x957241,_0x3c9df9){const _0x1e9800=_0x44537c,_0x138d29=this[_0x1e9800(0x374)](_0x957241,_0x3c9df9);for(const _0x1f3765 of _0x138d29){if(!_0x1f3765)continue;if(_0x1f3765['isSpawnedEvent']())this['despawnEventId'](_0x1f3765[_0x1e9800(0x5c0)]);}},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x2b7)]=function(_0x16e0a4){const _0x51b8a3=_0x44537c;for(const _0xb5aeac of this[_0x51b8a3(0x3e6)]){if(!_0xb5aeac)continue;_0x16e0a4[_0x51b8a3(0x680)](_0xb5aeac[_0x51b8a3(0x1fa)]())&&this[_0x51b8a3(0x4be)](_0xb5aeac[_0x51b8a3(0x5c0)]);}},Game_Map[_0x44537c(0x4aa)]['despawnTerrainTags']=function(_0x5230a9){const _0x2c3e76=_0x44537c;for(const _0x489734 of this[_0x2c3e76(0x3e6)]){if(!_0x489734)continue;_0x5230a9['includes'](_0x489734[_0x2c3e76(0x216)]())&&this['despawnEventId'](_0x489734[_0x2c3e76(0x5c0)]);}},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x3d9)]=function(){const _0x2683b8=_0x44537c;for(const _0x5817ca of this['_spawnedEvents']){if(!_0x5817ca)continue;this[_0x2683b8(0x4be)](_0x5817ca[_0x2683b8(0x5c0)]);}},VisuMZ[_0x44537c(0x646)]['Game_Map_unlockEvent']=Game_Map[_0x44537c(0x4aa)][_0x44537c(0x470)],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x470)]=function(_0xc08451){const _0x45de35=_0x44537c;VisuMZ['EventsMoveCore'][_0x45de35(0x476)][_0x45de35(0x21e)](this,_0xc08451);if(_0xc08451>=0x3e8){const _0x48758e=this[_0x45de35(0x246)](_0xc08451);if(_0x48758e)_0x48758e[_0x45de35(0x3e2)]();}},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x357)]=function(){const _0x30230f=_0x44537c;this[_0x30230f(0x28e)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x334919=$dataMap[_0x30230f(0x670)]||'';if(_0x334919[_0x30230f(0x276)](/<HIDE PLAYER>/i))this[_0x30230f(0x28e)]=![],this[_0x30230f(0x2a0)]=!![];else _0x334919[_0x30230f(0x276)](/<SHOW PLAYER>/i)&&(this[_0x30230f(0x28e)]=!![],this[_0x30230f(0x2a0)]=![]);},Game_Map['prototype'][_0x44537c(0x3fa)]=function(){const _0x4baeba=_0x44537c;return this[_0x4baeba(0x28e)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x4baeba(0x28e)];},Game_Map['prototype'][_0x44537c(0x309)]=function(){const _0x32c104=_0x44537c;return this['_forceHidePlayer']===undefined&&this[_0x32c104(0x357)](),this['_forceHidePlayer'];},VisuMZ['EventsMoveCore'][_0x44537c(0x1f9)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x321)],Game_CharacterBase[_0x44537c(0x4aa)]['isTransparent']=function(){const _0x4e7d6d=_0x44537c;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap['isPlayerForceHidden']())return!![];}return VisuMZ[_0x4e7d6d(0x646)][_0x4e7d6d(0x1f9)][_0x4e7d6d(0x21e)](this);},Game_Map[_0x44537c(0x4aa)]['setupFollowerVisibilityOverrides']=function(){const _0x4decd8=_0x44537c;this['_forceShowFollower']=![],this[_0x4decd8(0x5a3)]=![];if(!$dataMap)return;const _0x46a50f=$dataMap[_0x4decd8(0x670)]||'';if(_0x46a50f[_0x4decd8(0x276)](/<HIDE FOLLOWERS>/i))this[_0x4decd8(0x5fb)]=![],this['_forceHideFollower']=!![];else _0x46a50f[_0x4decd8(0x276)](/<SHOW FOLLOWERS>/i)&&(this[_0x4decd8(0x5fb)]=!![],this[_0x4decd8(0x5a3)]=![]);},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x25f)]=function(){const _0x11dae3=_0x44537c;return this[_0x11dae3(0x5fb)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x11dae3(0x5fb)];},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x61b)]=function(){const _0x326bda=_0x44537c;return this[_0x326bda(0x5a3)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x326bda(0x5a3)];},VisuMZ['EventsMoveCore'][_0x44537c(0x3c5)]=Game_Followers[_0x44537c(0x4aa)][_0x44537c(0x2e5)],Game_Followers[_0x44537c(0x4aa)][_0x44537c(0x2e5)]=function(){const _0x4cb983=_0x44537c;if($gameMap[_0x4cb983(0x25f)]())return!![];if($gameMap[_0x4cb983(0x61b)]())return![];return VisuMZ[_0x4cb983(0x646)][_0x4cb983(0x3c5)]['call'](this);},Game_Map[_0x44537c(0x4aa)]['processEraseEncounterEvents']=function(){const _0x4089ce=_0x44537c,_0x1f85b3=this[_0x4089ce(0x35c)](),_0x45cd2d=[];$gameParty[_0x4089ce(0x26d)]=!![];for(const _0xb97c1e of _0x1f85b3){if(!_0xb97c1e)continue;if(_0xb97c1e[_0x4089ce(0x40a)])continue;_0xb97c1e[_0x4089ce(0x58f)]()&&_0x45cd2d['push'](_0xb97c1e);}$gameParty[_0x4089ce(0x26d)]=undefined;for(const _0x23bdbc of _0x45cd2d){if(!_0x23bdbc)continue;if(_0x23bdbc[_0x4089ce(0x40a)])continue;this[_0x4089ce(0x2e3)](_0x23bdbc['eventId']());}},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x58f)]=function(){const _0x2c56e6=_0x44537c,_0x86d4ed=this[_0x2c56e6(0x246)]()[_0x2c56e6(0x670)]||'';if(_0x86d4ed[_0x2c56e6(0x276)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty['hasEncounterHalf']())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x86d4ed[_0x2c56e6(0x276)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty['hasEncounterNone']())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x396)]=Scene_Map[_0x44537c(0x4aa)][_0x44537c(0x564)],Scene_Map[_0x44537c(0x4aa)][_0x44537c(0x564)]=function(){const _0x579403=_0x44537c;VisuMZ[_0x579403(0x646)][_0x579403(0x396)][_0x579403(0x21e)](this),$gameMap[_0x579403(0x640)]();},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x550)]=function(){const _0x206728=_0x44537c;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x56c2b8=$dataMap[_0x206728(0x670)];if(_0x56c2b8['match'](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0xb5e054=String(RegExp['$1'])[_0x206728(0x1e5)](',')[_0x206728(0x5d9)](_0x4d487e=>Number(_0x4d487e));for(const _0x18b56c of _0xb5e054){$gameTemp['reserveCommonEvent'](_0x18b56c);}}},Game_CommonEvent[_0x44537c(0x4aa)][_0x44537c(0x354)]=function(){const _0x5184f6=_0x44537c,_0x44afff=this[_0x5184f6(0x246)]();return this[_0x5184f6(0x687)]()&&_0x44afff[_0x5184f6(0x605)]>=0x1&&DataManager[_0x5184f6(0x3be)](_0x44afff[_0x5184f6(0x21f)]);},Game_CommonEvent[_0x44537c(0x4aa)][_0x44537c(0x457)]=function(){const _0x461a07=_0x44537c;return VisuMZ[_0x461a07(0x646)]['CustomPageConditions'][_0x461a07(0x4ef)][_0x461a07(0x680)](this[_0x461a07(0x699)]);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x533)]=Game_CommonEvent[_0x44537c(0x4aa)][_0x44537c(0x687)],Game_CommonEvent[_0x44537c(0x4aa)][_0x44537c(0x687)]=function(){const _0x4024d3=_0x44537c;if(VisuMZ[_0x4024d3(0x646)][_0x4024d3(0x533)]['call'](this))return!![];else{const _0x47b949=this['event']();return VisuMZ['EventsMoveCore'][_0x4024d3(0x596)]['metCPC'](this[_0x4024d3(0x246)]()[_0x4024d3(0x56b)],this[_0x4024d3(0x699)],_0x47b949);}},VisuMZ[_0x44537c(0x646)]['Game_Map_parallelCommonEvents']=Game_Map[_0x44537c(0x4aa)][_0x44537c(0x484)],Game_Map[_0x44537c(0x4aa)][_0x44537c(0x484)]=function(){const _0xc87509=_0x44537c,_0x3fb59b=VisuMZ[_0xc87509(0x646)][_0xc87509(0x2ca)][_0xc87509(0x21e)](this),_0x160cbb=VisuMZ[_0xc87509(0x646)][_0xc87509(0x596)][_0xc87509(0x4ef)]['map'](_0x2b521b=>$dataCommonEvents[_0x2b521b]);return _0x3fb59b[_0xc87509(0x4e9)](_0x160cbb)[_0xc87509(0x60f)]((_0x38ff29,_0x4ed077,_0x3ba85a)=>_0x3ba85a['indexOf'](_0x38ff29)===_0x4ed077);},Game_CharacterBase[_0x44537c(0x432)]=VisuMZ[_0x44537c(0x646)][_0x44537c(0x633)][_0x44537c(0x60d)]['DashOnLadder']??![],VisuMZ[_0x44537c(0x646)][_0x44537c(0x3dd)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x313)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x313)]=function(){const _0x5be10c=_0x44537c;VisuMZ[_0x5be10c(0x646)][_0x5be10c(0x3dd)][_0x5be10c(0x21e)](this),this[_0x5be10c(0x2de)]();},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2de)]=function(){const _0x18f25a=_0x44537c;this[_0x18f25a(0x47c)]=0x1,this[_0x18f25a(0x279)]=0x1,this['_patternLocked']=![],this['clearPose'](),this[_0x18f25a(0x202)](),this['clearSpriteOffsets'](),this[_0x18f25a(0x2f3)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x61f)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3b1)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3b1)]=function(){const _0x36193b=_0x44537c;let _0x689413=VisuMZ[_0x36193b(0x646)][_0x36193b(0x61f)][_0x36193b(0x21e)](this);return _0x689413=this['adjustMoveSynchOpacityDelta'](_0x689413),_0x689413;},Game_CharacterBase['prototype'][_0x44537c(0x570)]=function(_0x1c7c26){return _0x1c7c26;},Game_CharacterBase['prototype']['isSpriteVS8dir']=function(){const _0x390ea9=_0x44537c;if(this['constructor']===Game_Player&&this['isInVehicle']())return this['vehicle']()[_0x390ea9(0x445)]()[_0x390ea9(0x276)](/\[VS8\]/i);else return Imported[_0x390ea9(0x281)]&&this[_0x390ea9(0x31a)]()?!![]:this[_0x390ea9(0x445)]()[_0x390ea9(0x276)](/\[VS8\]/i);},VisuMZ[_0x44537c(0x646)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x44537c(0x4aa)]['direction'],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x29f)]=function(){const _0x5ad0cc=_0x44537c;if(!$dataMap)return this[_0x5ad0cc(0x234)]||0x2;if(this['isOnLadder']()&&!this['isJumping']()&&this[_0x5ad0cc(0x4b5)]())return this['directionOnLadderSpriteVS8dir']();else{if(this['isOnLadder']()&&!this[_0x5ad0cc(0x3b8)]())return 0x8;else return this['isPosing']()&&this['isSpriteVS8dir']()?this[_0x5ad0cc(0x67b)]():VisuMZ['EventsMoveCore'][_0x5ad0cc(0x3e5)]['call'](this);}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x619)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x325)],Game_CharacterBase['prototype'][_0x44537c(0x325)]=function(_0x53cfad){const _0x3a63e6=_0x44537c;if(!this['isSpriteVS8dir']())_0x53cfad=this[_0x3a63e6(0x2c1)](_0x53cfad);VisuMZ[_0x3a63e6(0x646)][_0x3a63e6(0x619)][_0x3a63e6(0x21e)](this,_0x53cfad),this[_0x3a63e6(0x1d5)]();},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2c1)]=function(_0x545933){const _0x2cd55f=_0x44537c;if(_0x545933===0x1)return this[_0x2cd55f(0x635)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x545933===0x3)return this[_0x2cd55f(0x635)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x545933===0x7)return this[_0x2cd55f(0x635)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x545933===0x9)return this[_0x2cd55f(0x635)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x545933;},Game_CharacterBase['prototype'][_0x44537c(0x30b)]=function(_0x34dffe){const _0x492e28=_0x44537c;return[0x1,0x3,0x5,0x7,0x9][_0x492e28(0x680)](_0x34dffe);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x206)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x5cd)]=Game_CharacterBase[_0x44537c(0x4aa)]['moveStraight'],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x41a)]=function(_0x1154c6){const _0x15c4ae=_0x44537c;this[_0x15c4ae(0x3f1)]=_0x1154c6,VisuMZ['EventsMoveCore'][_0x15c4ae(0x5cd)]['call'](this,_0x1154c6);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x215)]=function(_0x864fc3){const _0x276f27=_0x44537c;if(!this[_0x276f27(0x30b)](_0x864fc3))return this[_0x276f27(0x41a)](_0x864fc3);let _0x35f360=0x0,_0x4e5f7b=0x0;switch(_0x864fc3){case 0x1:_0x35f360=0x4,_0x4e5f7b=0x2;break;case 0x3:_0x35f360=0x6,_0x4e5f7b=0x2;break;case 0x7:_0x35f360=0x4,_0x4e5f7b=0x8;break;case 0x9:_0x35f360=0x6,_0x4e5f7b=0x8;break;}if(VisuMZ[_0x276f27(0x646)][_0x276f27(0x633)][_0x276f27(0x60d)]['StrictCollision']){if(!this[_0x276f27(0x635)](this['_x'],this['_y'],_0x35f360))return this[_0x276f27(0x41a)](_0x4e5f7b);if(!this[_0x276f27(0x635)](this['_x'],this['_y'],_0x4e5f7b))return this[_0x276f27(0x41a)](_0x35f360);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x35f360,_0x4e5f7b)){let _0x620ca2=VisuMZ[_0x276f27(0x646)]['Settings'][_0x276f27(0x60d)][_0x276f27(0x695)]?_0x35f360:_0x4e5f7b;return this[_0x276f27(0x41a)](_0x620ca2);}}this['_lastMovedDirection']=_0x864fc3,this[_0x276f27(0x643)](_0x35f360,_0x4e5f7b);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4fb)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x27d)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x27d)]=function(){const _0x7b967f=_0x44537c;let _0x374b99=this[_0x7b967f(0x604)];return this[_0x7b967f(0x595)]()&&(_0x374b99+=this[_0x7b967f(0x267)]()),this[_0x7b967f(0x6bb)](_0x374b99);},Game_CharacterBase[_0x44537c(0x4aa)]['dashSpeedModifier']=function(){const _0x5be2e7=_0x44537c,_0x419bb5=VisuMZ[_0x5be2e7(0x646)]['Settings'][_0x5be2e7(0x60d)];return _0x419bb5['DashModifier']!==undefined?_0x419bb5[_0x5be2e7(0x324)]:VisuMZ['EventsMoveCore'][_0x5be2e7(0x4fb)][_0x5be2e7(0x21e)](this)-this['_moveSpeed'];},Game_CharacterBase['prototype']['adjustDir8MovementSpeed']=function(_0x4dced4){const _0x202e6a=_0x44537c,_0x37c7fe=VisuMZ[_0x202e6a(0x646)]['Settings']['Movement'];if(!_0x37c7fe[_0x202e6a(0x558)])return _0x4dced4;return[0x1,0x3,0x7,0x9][_0x202e6a(0x680)](this[_0x202e6a(0x3f1)])&&(_0x4dced4*=_0x37c7fe[_0x202e6a(0x5dd)]||0.01),_0x4dced4;},VisuMZ[_0x44537c(0x646)]['Game_CharacterBase_isDashing']=Game_CharacterBase['prototype'][_0x44537c(0x595)],Game_CharacterBase[_0x44537c(0x4aa)]['isDashing']=function(){const _0x4a3b96=_0x44537c;if(!Game_CharacterBase[_0x4a3b96(0x432)]&&this[_0x4a3b96(0x36a)]())return![];if(this[_0x4a3b96(0x20d)])return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing'][_0x4a3b96(0x21e)](this);},Game_CharacterBase['prototype'][_0x44537c(0x62e)]=function(){const _0x49ff80=_0x44537c;return this[_0x49ff80(0x595)]()&&this[_0x49ff80(0x4ec)]===0x0;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x630)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x54a)],Game_CharacterBase['prototype'][_0x44537c(0x54a)]=function(){const _0x564ba5=_0x44537c;return this[_0x564ba5(0x2a3)]()?this[_0x564ba5(0x3c2)]():VisuMZ['EventsMoveCore'][_0x564ba5(0x630)][_0x564ba5(0x21e)](this);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x66c)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x307)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x307)]=function(){const _0x49f0fb=_0x44537c;VisuMZ[_0x49f0fb(0x646)]['Game_CharacterBase_increaseSteps'][_0x49f0fb(0x21e)](this),this[_0x49f0fb(0x541)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x50d)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x66b)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x66b)]=function(){const _0x3c3f58=_0x44537c;if(this[_0x3c3f58(0x4b5)]())return this[_0x3c3f58(0x41f)]();return VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex'][_0x3c3f58(0x21e)](this);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x41f)]=function(){const _0x18a907=_0x44537c,_0x28a61a=this['direction']();if(this['isJumping']()){if([0x2,0x4,0x6,0x8]['includes'](_0x28a61a))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x28a61a))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x18a907(0x2a3)]())return this[_0x18a907(0x304)]();else{if(this[_0x18a907(0x5cb)]){if([0x2,0x4,0x6,0x8][_0x18a907(0x680)](_0x28a61a))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x28a61a))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x18a907(0x5ec)]()){if([0x2,0x4,0x6,0x8][_0x18a907(0x680)](_0x28a61a))return 0x4;if([0x1,0x3,0x7,0x9][_0x18a907(0x680)](_0x28a61a))return 0x5;}else{if(this[_0x18a907(0x62e)]()){if([0x2,0x4,0x6,0x8][_0x18a907(0x680)](_0x28a61a))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x28a61a))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x18a907(0x680)](_0x28a61a))return 0x0;if([0x1,0x3,0x7,0x9][_0x18a907(0x680)](_0x28a61a))return 0x1;}}}}}}},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x5ec)]=function(){const _0xc6121c=_0x44537c;return VisuMZ[_0xc6121c(0x646)][_0xc6121c(0x633)]['VS8'][_0xc6121c(0x5c8)];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2c5)]=function(){const _0x271f9d=_0x44537c;return this['isOnLadder']()&&this[_0x271f9d(0x216)]()===VisuMZ[_0x271f9d(0x646)]['Settings'][_0x271f9d(0x2b5)]['Rope'];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2dc)]=function(){const _0x23a95c=_0x44537c;return this[_0x23a95c(0x2c5)]()?0x4:0x2;},VisuMZ['EventsMoveCore'][_0x44537c(0x3cb)]=Game_CharacterBase['prototype'][_0x44537c(0x613)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x613)]=function(){const _0x10b9b5=_0x44537c;this[_0x10b9b5(0x2b2)](),VisuMZ[_0x10b9b5(0x646)][_0x10b9b5(0x3cb)][_0x10b9b5(0x21e)](this),this['updatePose']();},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2b2)]=function(){const _0x898fb9=_0x44537c;this[_0x898fb9(0x685)]=this[_0x898fb9(0x47c)]??0x1,this[_0x898fb9(0x45b)]=this[_0x898fb9(0x279)]??0x1;},VisuMZ['EventsMoveCore']['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x4c9)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x4c9)]=function(){const _0x53e6f3=_0x44537c;let _0x5411f6=VisuMZ[_0x53e6f3(0x646)][_0x53e6f3(0x359)][_0x53e6f3(0x21e)](this);return this['_scaleY']!==undefined&&(_0x5411f6/=Math[_0x53e6f3(0x423)](this['_scaleY'],0.00001)),Math[_0x53e6f3(0x249)](_0x5411f6);},Game_CharacterBase[_0x44537c(0x4aa)]['updatePose']=function(){const _0x3fb65=_0x44537c;this[_0x3fb65(0x2d6)]=this[_0x3fb65(0x2d6)]||0x0;if(this[_0x3fb65(0x2d6)]>0x0){this[_0x3fb65(0x2d6)]--;if(this[_0x3fb65(0x2d6)]<=0x0&&this[_0x3fb65(0x394)]!=='ZZZ')this[_0x3fb65(0x541)]();}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x409)]=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x643)],Game_CharacterBase['prototype']['moveDiagonally']=function(_0x509cd2,_0x2bcf06){const _0x497c60=_0x44537c;VisuMZ[_0x497c60(0x646)][_0x497c60(0x409)][_0x497c60(0x21e)](this,_0x509cd2,_0x2bcf06);if(this[_0x497c60(0x4b5)]())this[_0x497c60(0x593)](_0x509cd2,_0x2bcf06);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x593)]=function(_0x235eeb,_0x4c2498){const _0x2d2421=_0x44537c;if(_0x235eeb===0x4&&_0x4c2498===0x2)this[_0x2d2421(0x325)](0x1);if(_0x235eeb===0x6&&_0x4c2498===0x2)this[_0x2d2421(0x325)](0x3);if(_0x235eeb===0x4&&_0x4c2498===0x8)this[_0x2d2421(0x325)](0x7);if(_0x235eeb===0x6&&_0x4c2498===0x8)this[_0x2d2421(0x325)](0x9);},VisuMZ[_0x44537c(0x646)]['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x39c)],Game_CharacterBase[_0x44537c(0x4aa)]['hasStepAnime']=function(){const _0x2cb23d=_0x44537c;if(this[_0x2cb23d(0x2a3)]()&&this['getPose']()===_0x2cb23d(0x24a))return!![];return VisuMZ[_0x2cb23d(0x646)][_0x2cb23d(0x3c0)][_0x2cb23d(0x21e)](this);},Game_CharacterBase['prototype'][_0x44537c(0x3ac)]=function(_0xc3d746,_0x36e844){const _0x553db3=_0x44537c;if(_0xc3d746['match'](/Z/i))_0xc3d746=_0x553db3(0x24a);if(_0xc3d746[_0x553db3(0x276)](/SLEEP/i))_0xc3d746=_0x553db3(0x24a);this[_0x553db3(0x4b5)]()&&(this['_pose']=_0xc3d746['toUpperCase']()[_0x553db3(0x35e)](),this[_0x553db3(0x2d6)]=_0x36e844||Infinity);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x4ae)]=function(){const _0x34bae2=_0x44537c;return this[_0x34bae2(0x4b5)]()?(this[_0x34bae2(0x394)]||'')[_0x34bae2(0x526)]()[_0x34bae2(0x35e)]():''['toUpperCase']()[_0x34bae2(0x35e)]();},Game_CharacterBase['prototype'][_0x44537c(0x3fd)]=function(_0x1fea2c,_0x1cb35b){const _0x2590f9=_0x44537c;if(this['isSpriteVS8dir']()){const _0x4e4fb5=['','EXCLAMATION',_0x2590f9(0x502),_0x2590f9(0x5f1),_0x2590f9(0x375),_0x2590f9(0x5a6),_0x2590f9(0x21b),'COBWEB',_0x2590f9(0x5e5),'LIGHT\x20BULB',_0x2590f9(0x24a),'','','','',''][_0x1fea2c];this[_0x2590f9(0x3ac)](_0x4e4fb5,_0x1cb35b);}},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x541)]=function(){const _0xfea97b=_0x44537c;this[_0xfea97b(0x394)]='',this['_poseDuration']=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x46ea71=_0x44537c;return this[_0x46ea71(0x4b5)]()&&!!this[_0x46ea71(0x394)];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x304)]=function(){const _0x34debf=_0x44537c,_0xc2193e=this[_0x34debf(0x394)]['toUpperCase']();switch(this['_pose'][_0x34debf(0x526)]()[_0x34debf(0x35e)]()){case _0x34debf(0x3a1):case _0x34debf(0x30f):case _0x34debf(0x498):case'HURT':case _0x34debf(0x4f7):case _0x34debf(0x2f4):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x67b)]=function(){const _0xc160df=_0x44537c;switch(this['_pose'][_0xc160df(0x526)]()){case _0xc160df(0x2a2):case'QUESTION':case _0xc160df(0x5f1):case'!':case'?':return 0x2;break;case'HEART':case _0xc160df(0x5a6):case _0xc160df(0x21b):return 0x4;break;case'ITEM':case'HMPH':case'VICTORY':case _0xc160df(0x5c6):case _0xc160df(0x5e5):case'LIGHT\x20BULB':return 0x6;break;case'HURT':case _0xc160df(0x4f7):case _0xc160df(0x2f4):case _0xc160df(0x24a):case _0xc160df(0x55b):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0xc160df(0x619)][_0xc160df(0x21e)](this);break;}},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3c2)]=function(){const _0x422480=_0x44537c;switch(this[_0x422480(0x394)][_0x422480(0x526)]()){case _0x422480(0x3a1):case _0x422480(0x632):case'EXCLAMATION':case'!':case'HEART':case'COBWEB':return 0x0;break;case _0x422480(0x30f):case _0x422480(0x4f7):case _0x422480(0x502):case'?':case _0x422480(0x5a6):case _0x422480(0x5e5):return 0x1;break;case _0x422480(0x498):case _0x422480(0x2f4):case'MUSIC\x20NOTE':case _0x422480(0x21b):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x422480(0x646)][_0x422480(0x630)][_0x422480(0x21e)](this);break;}},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x43d)]=function(){const _0x6f3e2=_0x44537c;this[_0x6f3e2(0x5cb)]=!![];},Game_CharacterBase['prototype']['clearCarrying']=function(){const _0x43e045=_0x44537c;this[_0x43e045(0x5cb)]=![];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x68d)]=function(){const _0x4edef9=_0x44537c;this[_0x4edef9(0x20d)]=!![];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x202)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x35d)]=function(){const _0x5d5ef0=_0x44537c;if(this[_0x5d5ef0(0x6b2)]())return![];if(this[_0x5d5ef0(0x47a)])return![];if(this[_0x5d5ef0(0x3ce)]==='')return![];if(this[_0x5d5ef0(0x69e)]===Game_Vehicle)return![];if(this[_0x5d5ef0(0x321)]())return![];if(this['_noMovementShadow'])return![];return!![];},Game_Follower['prototype']['isShadowVisible']=function(){const _0x303dbb=_0x44537c;if($gamePlayer[_0x303dbb(0x3c4)])return![];return Game_CharacterBase['prototype'][_0x303dbb(0x35d)][_0x303dbb(0x21e)](this);},Game_CharacterBase[_0x44537c(0x4aa)]['isShadowShrink']=function(){const _0x98a5e5=_0x44537c;if(this['isOnLadder']())return!![];if(this[_0x98a5e5(0x69e)]===Game_Player&&this[_0x98a5e5(0x218)]())return!![];return![];},Game_CharacterBase['prototype']['shadowFilename']=function(){const _0x35936f=_0x44537c;return VisuMZ[_0x35936f(0x646)][_0x35936f(0x633)]['Movement']['DefaultShadow'];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x648)]=function(){const _0x29539c=_0x44537c;return this[_0x29539c(0x588)]();},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x348)]=function(){const _0x78d897=_0x44537c,_0x5a80b2=$gameMap[_0x78d897(0x535)]();return Math[_0x78d897(0x249)](this[_0x78d897(0x4a8)]()*_0x5a80b2+_0x5a80b2);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x213)]=function(_0x1bd39f,_0x39c3d6){const _0x3685e6=_0x44537c;if(TouchInput['isPressed']())return![];if(!$gameMap[_0x3685e6(0x36f)]())return![];if($gameMap[_0x3685e6(0x465)](_0x1bd39f,_0x39c3d6)[_0x3685e6(0x220)]>0x0)return![];if(!$gameMap[_0x3685e6(0x1f5)](_0x1bd39f,_0x39c3d6))return![];const _0x352e56=$gameMap['_events'][_0x3685e6(0x220)];if(_0x352e56>=Game_CharacterBase[_0x3685e6(0x2d0)])return![];return!![];},Game_Character['prototype'][_0x44537c(0x66d)]=function(_0x262057,_0x3bd22f){const _0x27d2b6=_0x44537c;let _0x2e07cb=this[_0x27d2b6(0x383)](_0x262057,_0x3bd22f);if(!this['getDiagonalDestination'](_0x262057,_0x3bd22f))return _0x2e07cb;if(this['isCollidedWithEvents'](_0x262057,_0x3bd22f))return _0x2e07cb;const _0x600d37=_0x2e07cb;if(_0x2e07cb===0x2){if(_0x262057>this['x']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x6))_0x2e07cb=0x3;if(_0x262057<this['x']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x4))_0x2e07cb=0x1;}else{if(_0x2e07cb===0x4){if(_0x3bd22f>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x2e07cb=0x1;if(_0x3bd22f<this['y']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x6))_0x2e07cb=0x7;}else{if(_0x2e07cb===0x6){if(_0x3bd22f>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x2e07cb=0x3;if(_0x3bd22f<this['y']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x6))_0x2e07cb=0x9;}else{if(_0x2e07cb===0x8){if(_0x262057>this['x']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x6))_0x2e07cb=0x9;if(_0x262057<this['x']&&this[_0x27d2b6(0x635)](this['x'],this['y'],0x4))_0x2e07cb=0x7;}}}}if(!this[_0x27d2b6(0x635)](this['x'],this['y'],_0x2e07cb))return _0x600d37;const _0x269177=$gameMap[_0x27d2b6(0x2cf)](this['x'],_0x2e07cb),_0x17485e=$gameMap[_0x27d2b6(0x536)](this['y'],_0x2e07cb);if(this[_0x27d2b6(0x255)](_0x269177,_0x17485e))_0x2e07cb=_0x600d37;return _0x2e07cb;},VisuMZ[_0x44537c(0x646)]['Game_CharacterBase_canPass']=Game_CharacterBase['prototype'][_0x44537c(0x635)],Game_CharacterBase['prototype'][_0x44537c(0x635)]=function(_0x3c56d1,_0x1ace58,_0x4d494e){const _0x4ba5f9=_0x44537c;return this[_0x4ba5f9(0x39d)]==='airship'?this['vehicle']()['isAirshipPassable'](_0x3c56d1,_0x1ace58,_0x4d494e):VisuMZ[_0x4ba5f9(0x646)]['Game_CharacterBase_canPass'][_0x4ba5f9(0x21e)](this,_0x3c56d1,_0x1ace58,_0x4d494e);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3c8)]=function(){const _0x4bd62c=_0x44537c;this[_0x4bd62c(0x510)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x3e8)]=Game_CharacterBase[_0x44537c(0x4aa)]['screenX'],Game_CharacterBase[_0x44537c(0x4aa)]['screenX']=function(){const _0x1148b7=_0x44537c;return VisuMZ[_0x1148b7(0x646)][_0x1148b7(0x3e8)][_0x1148b7(0x21e)](this)+(this[_0x1148b7(0x510)]||0x0);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x2ed)]=Game_CharacterBase['prototype']['screenY'],Game_CharacterBase[_0x44537c(0x4aa)]['screenY']=function(){const _0x535a08=_0x44537c;return VisuMZ[_0x535a08(0x646)][_0x535a08(0x2ed)][_0x535a08(0x21e)](this)+(this[_0x535a08(0x6b5)]||0x0);},Game_CharacterBase[_0x44537c(0x266)]=VisuMZ[_0x44537c(0x646)][_0x44537c(0x633)][_0x44537c(0x60d)]['ShiftY']??-0x6,Game_CharacterBase[_0x44537c(0x4aa)]['shiftY']=function(){const _0x1c0582=_0x44537c;let _0x3b65b7=this['isObjectCharacter']()?0x0:-Game_CharacterBase[_0x1c0582(0x266)];return this['_scaleY']&&(_0x3b65b7*=this[_0x1c0582(0x45b)]),Math[_0x1c0582(0x4c4)](_0x3b65b7);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2f3)]=function(){this['_stepPattern']='';},VisuMZ[_0x44537c(0x646)]['Game_CharacterBase_updatePattern']=Game_CharacterBase['prototype'][_0x44537c(0x2dd)],Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2dd)]=function(){const _0x3a2c6b=_0x44537c;if(this[_0x3a2c6b(0x329)])return;if(this[_0x3a2c6b(0x2cc)]())return;VisuMZ[_0x3a2c6b(0x646)]['Game_CharacterBase_updatePattern'][_0x3a2c6b(0x21e)](this);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x2cc)]=function(){const _0xd3c48e=_0x44537c;if(!this[_0xd3c48e(0x39c)]()&&this['_stopCount']>0x0)return![];switch(String(this[_0xd3c48e(0x462)])[_0xd3c48e(0x526)]()['trim']()){case'LEFT\x20TO\x20RIGHT':this[_0xd3c48e(0x3b6)]+=0x1;if(this[_0xd3c48e(0x3b6)]>0x2)this[_0xd3c48e(0x2c2)](0x0);break;case _0xd3c48e(0x1da):this[_0xd3c48e(0x3b6)]-=0x1;if(this[_0xd3c48e(0x3b6)]<0x0)this[_0xd3c48e(0x2c2)](0x2);break;case _0xd3c48e(0x4b7):case _0xd3c48e(0x673):this[_0xd3c48e(0x4f3)]();break;case _0xd3c48e(0x50f):case _0xd3c48e(0x578):case _0xd3c48e(0x349):case'SPIN\x20ACW':this[_0xd3c48e(0x5e6)]();break;default:return![];}return!![];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3f0)]=function(){const _0x70f870=_0x44537c;return $gameSystem[_0x70f870(0x3f0)](this);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x415)]=function(){const _0xb018c8=_0x44537c,_0x453445=this[_0xb018c8(0x3f0)]();if(!_0x453445)return![];return _0x453445[_0xb018c8(0x5e0)]>0x0;},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x62b)]=function(){const _0x428dd3=_0x44537c,_0x4a0b41=this[_0x428dd3(0x29f)]();return $gameMap[_0x428dd3(0x2cf)](this['x'],_0x4a0b41);},Game_CharacterBase[_0x44537c(0x4aa)]['frontY']=function(){const _0x2426e1=_0x44537c,_0x39573f=this[_0x2426e1(0x29f)]();return $gameMap['roundYWithDirection'](this['y'],_0x39573f);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x44e)]=function(){const _0x46a691=_0x44537c,_0xc1fceb=this[_0x46a691(0x264)](this[_0x46a691(0x29f)]());return $gameMap['roundXWithDirection'](this['x'],_0xc1fceb);},Game_CharacterBase['prototype']['backY']=function(){const _0x4b3614=_0x44537c,_0x55809e=this[_0x4b3614(0x264)](this[_0x4b3614(0x29f)]());return $gameMap[_0x4b3614(0x536)](this['y'],_0x55809e);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3ee)]=function(){const _0x4b576e=_0x44537c,_0x39669e=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x4b576e(0x29f)]()];return $gameMap['roundXWithDirection'](this['x'],_0x39669e);},Game_CharacterBase[_0x44537c(0x4aa)]['ccwY']=function(){const _0x5e6f82=_0x44537c,_0x301cd6=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x5e6f82(0x536)](this['y'],_0x301cd6);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x540)]=function(){const _0x981df6=_0x44537c,_0x42b6b3=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x981df6(0x29f)]()];return $gameMap[_0x981df6(0x2cf)](this['x'],_0x42b6b3);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x597)]=function(){const _0xb9e5a0=_0x44537c,_0x557d10=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0xb9e5a0(0x29f)]()];return $gameMap['roundYWithDirection'](this['y'],_0x557d10);},VisuMZ[_0x44537c(0x646)]['Game_Character_setMoveRoute']=Game_Character[_0x44537c(0x4aa)]['setMoveRoute'],Game_Character['prototype'][_0x44537c(0x225)]=function(_0x388873){const _0x52fe4f=_0x44537c;route=JsonEx[_0x52fe4f(0x4f4)](_0x388873),VisuMZ[_0x52fe4f(0x646)]['Game_Character_setMoveRoute']['call'](this,route);},VisuMZ['EventsMoveCore']['Game_Character_forceMoveRoute']=Game_Character[_0x44537c(0x4aa)][_0x44537c(0x2aa)],Game_Character[_0x44537c(0x4aa)][_0x44537c(0x2aa)]=function(_0xd864fb){const _0x4d4548=_0x44537c;route=JsonEx['makeDeepCopy'](_0xd864fb),VisuMZ[_0x4d4548(0x646)][_0x4d4548(0x6b9)][_0x4d4548(0x21e)](this,route);},VisuMZ[_0x44537c(0x646)]['Game_Character_processMoveCommand']=Game_Character[_0x44537c(0x4aa)]['processMoveCommand'],Game_Character[_0x44537c(0x4aa)][_0x44537c(0x424)]=function(_0xc490ae){const _0x28a1a3=_0x44537c,_0x41c991=Game_Character,_0xe47c40=_0xc490ae[_0x28a1a3(0x420)];if(_0xc490ae['code']===_0x41c991['ROUTE_SCRIPT']){let _0xba1494=_0xc490ae[_0x28a1a3(0x420)][0x0];_0xba1494=this[_0x28a1a3(0x43b)](_0xba1494),_0xba1494=this[_0x28a1a3(0x285)](_0xba1494),this[_0x28a1a3(0x42e)](_0xc490ae,_0xba1494);}else VisuMZ[_0x28a1a3(0x646)][_0x28a1a3(0x6ae)][_0x28a1a3(0x21e)](this,_0xc490ae);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x43b)]=function(_0x29cb0b){const _0x36add1=_0x44537c,_0x57b854=/\$gameVariables\.value\((\d+)\)/gi,_0x395a62=/\\V\[(\d+)\]/gi;while(_0x29cb0b[_0x36add1(0x276)](_0x57b854)){_0x29cb0b=_0x29cb0b['replace'](_0x57b854,(_0x4128ee,_0x44eca6)=>$gameVariables[_0x36add1(0x1f3)](parseInt(_0x44eca6)));}while(_0x29cb0b[_0x36add1(0x276)](_0x395a62)){_0x29cb0b=_0x29cb0b[_0x36add1(0x6aa)](_0x395a62,(_0x201409,_0x525ef2)=>$gameVariables[_0x36add1(0x1f3)](parseInt(_0x525ef2)));}return _0x29cb0b;},Game_Character['prototype'][_0x44537c(0x285)]=function(_0x4a0a26){const _0x3f436d=_0x44537c,_0x3018ac=/\\SELFVAR\[(\d+)\]/gi;while(_0x4a0a26[_0x3f436d(0x276)](_0x3018ac)){_0x4a0a26=_0x4a0a26[_0x3f436d(0x6aa)](_0x3018ac,(_0xe4bef2,_0x4ebd0a)=>getSelfVariableValue(this[_0x3f436d(0x2b9)],this[_0x3f436d(0x5c0)],parseInt(_0x4ebd0a)));}return _0x4a0a26;},Game_Character[_0x44537c(0x4aa)]['processMoveCommandEventsMoveCore']=function(_0x5eec8a,_0x5de4de){const _0x2b786c=_0x44537c;if(_0x5de4de[_0x2b786c(0x276)](/ANIMATION:[ ](\d+)/i))return this[_0x2b786c(0x3e9)](Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/BALLOON:[ ](.*)/i))return this[_0x2b786c(0x244)](String(RegExp['$1']));if(_0x5de4de['match'](/FADE IN:[ ](\d+)/i))return this[_0x2b786c(0x37b)](Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/FADE OUT:[ ](\d+)/i))return this[_0x2b786c(0x41e)](Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x5de4de['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x2b786c(0x2ef)]();if(_0x5de4de[_0x2b786c(0x276)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this['forceDashing']();if(_0x5de4de['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x2b786c(0x202)]();if(_0x5de4de[_0x2b786c(0x276)](/HUG:[ ]LEFT/i))return this[_0x2b786c(0x41b)](_0x2b786c(0x211));if(_0x5de4de['match'](/HUG:[ ]RIGHT/i))return this[_0x2b786c(0x41b)](_0x2b786c(0x425));if(_0x5de4de['match'](/INDEX:[ ](\d+)/i))return this[_0x2b786c(0x5fd)](Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x2cfea4=this[_0x2b786c(0x46b)]+Number(RegExp['$1']);return this[_0x2b786c(0x5fd)](_0x2cfea4);}if(_0x5de4de[_0x2b786c(0x276)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x2b786c(0x402)](Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b786c(0x1ed)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5de4de[_0x2b786c(0x276)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x32ba05=$gameMap[_0x2b786c(0x246)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x32ba05);}if(_0x5de4de[_0x2b786c(0x276)](/JUMP TO PLAYER/i))return this[_0x2b786c(0x262)]($gamePlayer);if(_0x5de4de[_0x2b786c(0x276)](/JUMP TO HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x45e78d=this[_0x2b786c(0x658)],_0x3fadc6=this[_0x2b786c(0x647)];return this['processMoveRouteJumpTo'](_0x45e78d,_0x3fadc6);}if(_0x5de4de[_0x2b786c(0x276)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x186354=String(RegExp['$1']),_0xb0c14c=this[_0x2b786c(0x4fc)](_0x5de4de);return this['processMoveRouteMoveUntilStop'](_0x186354,_0xb0c14c);}if(_0x5de4de['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x1af6bd=Number(RegExp['$1']),_0x581368=Number(RegExp['$2']),_0x419ece=this['checkCollisionKeywords'](_0x5de4de);return this[_0x2b786c(0x40d)](_0x1af6bd,_0x581368,_0x419ece);}if(_0x5de4de['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x3cb427=$gameMap['event'](Number(RegExp['$1'])),_0x3ec654=this['checkCollisionKeywords'](_0x5de4de);return this[_0x2b786c(0x683)](_0x3cb427,_0x3ec654);}if(_0x5de4de['match'](/MOVE TO PLAYER/i)){const _0x56047e=this[_0x2b786c(0x4fc)](_0x5de4de);return this[_0x2b786c(0x683)]($gamePlayer,_0x56047e);}if(_0x5de4de[_0x2b786c(0x276)](/MOVE TO HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x4864c1=this[_0x2b786c(0x658)],_0x47532b=this[_0x2b786c(0x647)],_0x242884=this[_0x2b786c(0x4fc)](_0x5de4de);return this[_0x2b786c(0x40d)](_0x4864c1,_0x47532b,_0x242884);}if(_0x5de4de['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x1,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE DOWN:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x2,Number(RegExp['$1']));if(_0x5de4de['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE LEFT:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x4,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x6,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x7,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE UP:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x2b786c(0x1dd)](0x9,Number(RegExp['$1']));if(_0x5de4de[_0x2b786c(0x276)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1030e0=Math[_0x2b786c(0x4c4)](Number(RegExp['$1'])/0x64*0xff);return this[_0x2b786c(0x575)](_0x1030e0[_0x2b786c(0x209)](0x0,0xff));}if(_0x5de4de['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x19cf05=this[_0x2b786c(0x461)]+Math[_0x2b786c(0x4c4)](Number(RegExp['$1'])/0x64*0xff);return this[_0x2b786c(0x575)](_0x19cf05[_0x2b786c(0x209)](0x0,0xff));}if(_0x5de4de[_0x2b786c(0x276)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x5e7d2c=this[_0x2b786c(0x461)]+Number(RegExp['$1']);return this[_0x2b786c(0x575)](_0x5e7d2c['clamp'](0x0,0xff));}if(_0x5de4de[_0x2b786c(0x276)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x2b786c(0x584)](Number(RegExp['$1']));if(_0x5de4de['match'](/PATTERN UNLOCK/i))return this[_0x2b786c(0x329)]=![];if(_0x5de4de[_0x2b786c(0x276)](/POSE:[ ](.*)/i)){const _0x478d90=String(RegExp['$1'])[_0x2b786c(0x526)]()['trim']();return this[_0x2b786c(0x3ac)](_0x478d90);}if(_0x5de4de[_0x2b786c(0x276)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x53bae4=Number(RegExp['$1']),_0x5d5169=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x53bae4,_0x5d5169);}if(_0x5de4de['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0xa36572=$gameMap[_0x2b786c(0x246)](Number(RegExp['$1']));return this[_0x2b786c(0x4f6)](_0xa36572);}if(_0x5de4de[_0x2b786c(0x276)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x5de4de['match'](/STEP TOWARD HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x42d817=this[_0x2b786c(0x658)],_0x58aa51=this[_0x2b786c(0x647)];return this['processMoveRouteStepTo'](_0x42d817,_0x58aa51);}if(_0x5de4de[_0x2b786c(0x276)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5de4de['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x4c91c2=$gameMap[_0x2b786c(0x246)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x4c91c2);}if(_0x5de4de['match'](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x5de4de['match'](/STEP AWAY FROM HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x5cf0be=this[_0x2b786c(0x658)],_0x291ecd=this[_0x2b786c(0x647)];return this['moveAwayFromPoint'](_0x5cf0be,_0x291ecd);}if(_0x5de4de[_0x2b786c(0x276)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5de4de[_0x2b786c(0x276)](/TURN TO EVENT:[ ](\d+)/i)){const _0x1c44bb=$gameMap[_0x2b786c(0x246)](Number(RegExp['$1']));return this[_0x2b786c(0x659)](_0x1c44bb);}if(_0x5de4de['match'](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x5de4de[_0x2b786c(0x276)](/TURN TO HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x4871d3=this[_0x2b786c(0x658)],_0x5013ea=this[_0x2b786c(0x647)];return this['turnTowardPoint'](_0x4871d3,_0x5013ea);}if(_0x5de4de[_0x2b786c(0x276)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5de4de['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x77e52d=$gameMap[_0x2b786c(0x246)](Number(RegExp['$1']));return this[_0x2b786c(0x4dd)](_0x77e52d);}if(_0x5de4de[_0x2b786c(0x276)](/TURN AWAY FROM PLAYER/i))return this[_0x2b786c(0x4dd)]($gamePlayer);if(_0x5de4de[_0x2b786c(0x276)](/TURN AWAY FROM HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x36bfe3=this['_randomHomeX'],_0x160611=this[_0x2b786c(0x647)];return this[_0x2b786c(0x4c1)](_0x36bfe3,_0x160611);}if(_0x5de4de[_0x2b786c(0x276)](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x5de4de[_0x2b786c(0x276)](/TURN LOWER RIGHT/i))return this[_0x2b786c(0x325)](0x3);if(_0x5de4de['match'](/TURN UPPER LEFT/i))return this[_0x2b786c(0x325)](0x7);if(_0x5de4de[_0x2b786c(0x276)](/TURN UPPER RIGHT/i))return this[_0x2b786c(0x325)](0x9);if(_0x5de4de['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x2b786c(0x4af)](RegExp['$1'],RegExp['$2']);if(_0x5de4de[_0x2b786c(0x276)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x2b786c(0x5bc)](RegExp['$1'],RegExp['$2']);if(_0x5de4de[_0x2b786c(0x276)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b786c(0x4d5)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5de4de['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0xc7fac9=$gameMap['event'](Number(RegExp['$1']));return this[_0x2b786c(0x5ff)](_0xc7fac9);}if(_0x5de4de[_0x2b786c(0x276)](/TELEPORT TO PLAYER/i))return this[_0x2b786c(0x5ff)]($gamePlayer);if(_0x5de4de[_0x2b786c(0x276)](/TELEPORT TO HOME/i)&&this[_0x2b786c(0x4c8)]){const _0x20d865=this[_0x2b786c(0x658)],_0x1c79e9=this[_0x2b786c(0x647)];return this[_0x2b786c(0x4d5)](_0x20d865,_0x1c79e9);}try{VisuMZ[_0x2b786c(0x646)][_0x2b786c(0x6ae)][_0x2b786c(0x21e)](this,_0x5eec8a);}catch(_0x369327){if($gameTemp[_0x2b786c(0x2ee)]())console[_0x2b786c(0x26a)](_0x369327);}},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x3e9)]=function(_0x2c99b5){$gameTemp['requestAnimation']([this],_0x2c99b5);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x244)]=function(_0x1bd5b1){const _0x3baae7=_0x44537c;let _0x4f5683=0x0;switch(_0x1bd5b1['toUpperCase']()['trim']()){case'!':case _0x3baae7(0x2a2):_0x4f5683=0x1;break;case'?':case'QUESTION':_0x4f5683=0x2;break;case _0x3baae7(0x2c4):case _0x3baae7(0x2a4):case _0x3baae7(0x5f1):case _0x3baae7(0x3c6):case'MUSICNOTE':_0x4f5683=0x3;break;case _0x3baae7(0x375):case _0x3baae7(0x2e8):_0x4f5683=0x4;break;case _0x3baae7(0x5a6):_0x4f5683=0x5;break;case _0x3baae7(0x21b):_0x4f5683=0x6;break;case _0x3baae7(0x5c6):case _0x3baae7(0x3a7):case _0x3baae7(0x4c7):_0x4f5683=0x7;break;case _0x3baae7(0x5e5):case _0x3baae7(0x48c):_0x4f5683=0x8;break;case _0x3baae7(0x486):case _0x3baae7(0x565):case _0x3baae7(0x355):case _0x3baae7(0x5da):case _0x3baae7(0x5c7):_0x4f5683=0x9;break;case'Z':case'ZZ':case _0x3baae7(0x24a):case _0x3baae7(0x55b):_0x4f5683=0xa;break;case _0x3baae7(0x31d):_0x4f5683=0xb;break;case _0x3baae7(0x34b):_0x4f5683=0xc;break;case _0x3baae7(0x2c7):_0x4f5683=0xd;break;case _0x3baae7(0x638):_0x4f5683=0xe;break;case'USER-DEFINED\x205':_0x4f5683=0xf;break;}$gameTemp[_0x3baae7(0x294)](this,_0x4f5683);},Game_Character[_0x44537c(0x4aa)]['processMoveRouteFadeIn']=function(_0x1e0872){const _0x517eac=_0x44537c;_0x1e0872+=this[_0x517eac(0x461)],this[_0x517eac(0x575)](_0x1e0872[_0x517eac(0x209)](0x0,0xff));if(this['_opacity']<0xff)this['_moveRouteIndex']--;},Game_Character['prototype'][_0x44537c(0x41e)]=function(_0x3b70ff){const _0x3da3b2=_0x44537c;_0x3b70ff=this[_0x3da3b2(0x461)]-_0x3b70ff,this[_0x3da3b2(0x575)](_0x3b70ff[_0x3da3b2(0x209)](0x0,0xff));if(this[_0x3da3b2(0x461)]>0x0)this[_0x3da3b2(0x4c2)]--;},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x41b)]=function(_0x10e85b){const _0x2917c1=_0x44537c,_0x574c92=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0xeed5f0=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x5208e3=this[_0x2917c1(0x29f)](),_0x517fa5=(_0x10e85b===_0x2917c1(0x211)?_0x574c92:_0xeed5f0)[_0x5208e3],_0x2d8132=(_0x10e85b===_0x2917c1(0x211)?_0xeed5f0:_0x574c92)[_0x5208e3];if(this[_0x2917c1(0x635)](this['x'],this['y'],_0x517fa5))_0x10e85b===_0x2917c1(0x211)?this['turnLeft90']():this['turnRight90']();else!this[_0x2917c1(0x635)](this['x'],this['y'],this[_0x2917c1(0x29f)]())&&(this[_0x2917c1(0x635)](this['x'],this['y'],_0x2d8132)?_0x10e85b===_0x2917c1(0x211)?this['turnRight90']():this['turnLeft90']():this[_0x2917c1(0x203)]());this[_0x2917c1(0x635)](this['x'],this['y'],this[_0x2917c1(0x29f)]())&&this[_0x2917c1(0x438)]();},Game_Character[_0x44537c(0x4aa)]['processMoveRouteSetIndex']=function(_0x255d5f){const _0x62f1b1=_0x44537c;if(ImageManager[_0x62f1b1(0x55a)](this[_0x62f1b1(0x3ce)]))return;_0x255d5f=_0x255d5f[_0x62f1b1(0x209)](0x0,0x7),this['setImage'](this['_characterName'],_0x255d5f);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x402)]=function(_0xa9a35f){const _0xe12c50=_0x44537c;switch(this[_0xe12c50(0x29f)]()){case 0x1:this[_0xe12c50(0x1e0)](-_0xa9a35f,_0xa9a35f);break;case 0x2:this[_0xe12c50(0x1e0)](0x0,_0xa9a35f);break;case 0x3:this[_0xe12c50(0x1e0)](_0xa9a35f,_0xa9a35f);break;case 0x4:this[_0xe12c50(0x1e0)](-_0xa9a35f,0x0);break;case 0x6:this['jump'](_0xa9a35f,0x0);break;case 0x7:this[_0xe12c50(0x1e0)](-_0xa9a35f,-_0xa9a35f);break;case 0x8:this[_0xe12c50(0x1e0)](0x0,-_0xa9a35f);break;case 0x9:this[_0xe12c50(0x1e0)](_0xa9a35f,-_0xa9a35f);break;}},Game_Character['prototype'][_0x44537c(0x1ed)]=function(_0x1d7eff,_0x240569){const _0x2de485=_0x44537c,_0x2ade0a=Math[_0x2de485(0x4c4)](_0x1d7eff-this['x']),_0x43177b=Math['round'](_0x240569-this['y']);this['jump'](_0x2ade0a,_0x43177b);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x262)]=function(_0x454fe2){const _0x15534e=_0x44537c;if(_0x454fe2)this[_0x15534e(0x1ed)](_0x454fe2['x'],_0x454fe2['y']);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x272)]=function(_0x4ff20b,_0x5d787b,_0x1c8750){const _0x1fc3d3=_0x44537c;let _0x4b9f01=0x0;if(_0x1c8750)$gameTemp[_0x1fc3d3(0x69b)]=!![];$gameMap[_0x1fc3d3(0x36f)]()?_0x4b9f01=this[_0x1fc3d3(0x66d)](_0x4ff20b,_0x5d787b):_0x4b9f01=this[_0x1fc3d3(0x383)](_0x4ff20b,_0x5d787b);if(_0x1c8750)$gameTemp[_0x1fc3d3(0x69b)]=![];this[_0x1fc3d3(0x215)](_0x4b9f01),this[_0x1fc3d3(0x2d4)](!![]);},Game_Character[_0x44537c(0x4aa)]['processMoveRouteStepToCharacter']=function(_0x2b3bc6){const _0x9796b8=_0x44537c;if(_0x2b3bc6)this[_0x9796b8(0x272)](_0x2b3bc6['x'],_0x2b3bc6['y']);},Game_Character[_0x44537c(0x4aa)]['processMoveRouteStepFrom']=function(_0x5197de,_0x5191e1){const _0xdeb3b8=_0x44537c,_0xef89a7=this['deltaXFrom'](_0x5197de),_0x1d7b4d=this[_0xdeb3b8(0x261)](_0x5191e1);},Game_Character[_0x44537c(0x4aa)]['checkCollisionKeywords']=function(_0x31e7d2){const _0x17f728=_0x44537c;if(_0x31e7d2[_0x17f728(0x276)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x31e7d2[_0x17f728(0x276)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x3bc)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x50a)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x50a)]=function(_0x57571d,_0x11c5a7){const _0x4071f4=_0x44537c;if($gameTemp[_0x4071f4(0x69b)])return![];return VisuMZ['EventsMoveCore'][_0x4071f4(0x3bc)][_0x4071f4(0x21e)](this,_0x57571d,_0x11c5a7);},Game_Character['prototype'][_0x44537c(0x69d)]=function(_0x5dfe35,_0x514417){const _0x4a8738=_0x44537c,_0x211403=['','LOWER\x20LEFT',_0x4a8738(0x1df),_0x4a8738(0x368),_0x4a8738(0x51f),'',_0x4a8738(0x4d6),_0x4a8738(0x3b3),'UP',_0x4a8738(0x645)],_0x2073aa=_0x211403[_0x4a8738(0x4e1)](_0x5dfe35[_0x4a8738(0x526)]()['trim']());if(_0x2073aa<=0x0)return;_0x514417&&($gameTemp[_0x4a8738(0x69b)]=!![]),this[_0x4a8738(0x635)](this['x'],this['y'],_0x2073aa)&&(_0x514417&&($gameTemp[_0x4a8738(0x69b)]=![]),this[_0x4a8738(0x215)](_0x2073aa),this[_0x4a8738(0x4c2)]-=0x1),_0x514417&&($gameTemp[_0x4a8738(0x69b)]=![]);},VisuMZ['EventsMoveCore'][_0x44537c(0x3c1)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x2b8)],Game_Event['prototype']['checkEventTriggerTouch']=function(_0x91e1c8,_0x262927){const _0x53231c=_0x44537c;if(VisuMZ['EventsMoveCore'][_0x53231c(0x3c1)][_0x53231c(0x21e)](this,_0x91e1c8,_0x262927))return!![];if($gameMap[_0x53231c(0x296)]())return![];for(let _0x128fb2=-this[_0x53231c(0x377)][_0x53231c(0x211)];_0x128fb2<=this[_0x53231c(0x377)]['right'];_0x128fb2++){for(let _0x5b8400=-this['_addedHitbox']['up'];_0x5b8400<=this['_addedHitbox'][_0x53231c(0x37d)];_0x5b8400++){if(VisuMZ[_0x53231c(0x646)][_0x53231c(0x3c1)][_0x53231c(0x21e)](this,_0x91e1c8+_0x128fb2,_0x262927+_0x5b8400))return!![];}}return![];},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x40d)]=function(_0x37e7a1,_0x7605c1,_0x2eda53){const _0x1e3237=_0x44537c;this['processMoveRouteStepTo'](_0x37e7a1,_0x7605c1,_0x2eda53);if(this['x']!==_0x37e7a1||this['y']!==_0x7605c1)this[_0x1e3237(0x4c2)]--;},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x683)]=function(_0x1c3a27,_0x5d94f1){const _0x3b58c0=_0x44537c;if(_0x1c3a27&&!_0x1c3a27[_0x3b58c0(0x40a)]){this[_0x3b58c0(0x40d)](_0x1c3a27['x'],_0x1c3a27['y'],_0x5d94f1);if(_0x1c3a27['isNormalPriority']()&&this[_0x3b58c0(0x64b)]()){const _0x30e872=$gameMap[_0x3b58c0(0x2a6)](this['x'],this['y'],_0x1c3a27['x'],_0x1c3a27['y']);if(_0x30e872<=0x1)this['_moveRouteIndex']++;}}},Game_Character['prototype']['processMoveRouteMoveRepeat']=function(_0x54b490,_0x382439){const _0x57a5eb=_0x44537c;_0x382439=_0x382439||0x0;const _0x42194c={'code':0x1,'indent':null,'parameters':[]};_0x42194c[_0x57a5eb(0x5a4)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x54b490],this['_moveRoute']['list'][this[_0x57a5eb(0x4c2)]][_0x57a5eb(0x420)][0x0]='';while(_0x382439--){this[_0x57a5eb(0x34c)][_0x57a5eb(0x655)][_0x57a5eb(0x5ac)](this[_0x57a5eb(0x4c2)]+0x1,0x0,_0x42194c);}},Game_Character[_0x44537c(0x4aa)]['processMoveRoutePatternLock']=function(_0x1657c5){const _0x30d977=_0x44537c;this[_0x30d977(0x329)]=!![],this[_0x30d977(0x2c2)](_0x1657c5);},Game_Character[_0x44537c(0x4aa)]['processMoveRouteSelfSwitch']=function(_0x543a25,_0x1a87ea){const _0x4bcd02=_0x44537c;if(this===$gamePlayer)return;const _0x2d848c=[this['_mapId'],this['_eventId'],'A'];_0x543a25[_0x4bcd02(0x276)](/\b[ABCD]\b/i)?_0x2d848c[0x2]=String(_0x543a25)['charAt'](0x0)[_0x4bcd02(0x526)]()[_0x4bcd02(0x35e)]():_0x2d848c[0x2]='Self\x20Switch\x20%1'[_0x4bcd02(0x48f)](_0x543a25);switch(_0x1a87ea[_0x4bcd02(0x526)]()[_0x4bcd02(0x35e)]()){case'ON':case _0x4bcd02(0x2e7):$gameSelfSwitches[_0x4bcd02(0x626)](_0x2d848c,!![]);break;case _0x4bcd02(0x210):case _0x4bcd02(0x618):$gameSelfSwitches['setValue'](_0x2d848c,![]);break;case _0x4bcd02(0x33d):$gameSelfSwitches['setValue'](_0x2d848c,!$gameSelfSwitches[_0x4bcd02(0x1f3)](_0x2d848c));break;}},Game_Character['prototype'][_0x44537c(0x5bc)]=function(_0x1e45dc,_0x5c0442){const _0x52e6d9=_0x44537c;if(this===$gamePlayer)return;const _0x44182f=[this[_0x52e6d9(0x2b9)],this['_eventId'],_0x52e6d9(0x4d7)['format'](_0x1e45dc)];$gameSelfSwitches['setValue'](_0x44182f,Number(_0x5c0442));},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x4d5)]=function(_0x476794,_0x1a3630){const _0x26692f=_0x44537c;this[_0x26692f(0x335)](_0x476794,_0x1a3630);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x5ff)]=function(_0xc9868b){const _0x21e340=_0x44537c;if(_0xc9868b)this[_0x21e340(0x4d5)](_0xc9868b['x'],_0xc9868b['y']);},Game_Character['prototype']['turnRight90']=function(){const _0x19bfac=_0x44537c;switch(this[_0x19bfac(0x29f)]()){case 0x1:this[_0x19bfac(0x325)](0x7);break;case 0x2:this[_0x19bfac(0x325)](0x4);break;case 0x3:this[_0x19bfac(0x325)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x19bfac(0x325)](0x2);break;case 0x7:this[_0x19bfac(0x325)](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0x19bfac(0x325)](0x3);break;}},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x5e6)]=function(){const _0x4182b1=_0x44537c;switch(this[_0x4182b1(0x29f)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x4182b1(0x325)](0x6);break;case 0x3:this[_0x4182b1(0x325)](0x9);break;case 0x4:this[_0x4182b1(0x325)](0x2);break;case 0x6:this[_0x4182b1(0x325)](0x8);break;case 0x7:this[_0x4182b1(0x325)](0x1);break;case 0x8:this[_0x4182b1(0x325)](0x4);break;case 0x9:this[_0x4182b1(0x325)](0x7);break;}},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x6ac)]=function(_0x7cf45c,_0x5cadc4,_0x1cda6a){const _0x41a801=_0x44537c,_0x96a97b=this['deltaXFrom'](_0x7cf45c),_0x57d13c=this[_0x41a801(0x261)](_0x5cadc4);if($gameMap[_0x41a801(0x36f)]()){if(_0x1cda6a||this[_0x41a801(0x4b5)]()){if(_0x96a97b>0x0&&_0x57d13c<0x0)return 0x1;if(_0x96a97b<0x0&&_0x57d13c<0x0)return 0x3;if(_0x96a97b>0x0&&_0x57d13c>0x0)return 0x7;if(_0x96a97b<0x0&&_0x57d13c>0x0)return 0x9;}}if(Math['abs'](_0x96a97b)>Math[_0x41a801(0x316)](_0x57d13c))return _0x96a97b>0x0?0x4:0x6;else{if(_0x57d13c!==0x0)return _0x57d13c>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x25b)]=function(_0x338f9e,_0x4eacf6,_0x58b201){const _0x2d7ed8=_0x44537c,_0x421495=this['deltaXFrom'](_0x338f9e),_0x211de2=this[_0x2d7ed8(0x261)](_0x4eacf6);if($gameMap[_0x2d7ed8(0x36f)]()){if(_0x58b201||this[_0x2d7ed8(0x4b5)]()){if(_0x421495>0x0&&_0x211de2<0x0)return 0x9;if(_0x421495<0x0&&_0x211de2<0x0)return 0x7;if(_0x421495>0x0&&_0x211de2>0x0)return 0x3;if(_0x421495<0x0&&_0x211de2>0x0)return 0x1;}}if(Math[_0x2d7ed8(0x316)](_0x421495)>Math['abs'](_0x211de2))return _0x421495>0x0?0x6:0x4;else{if(_0x211de2!==0x0)return _0x211de2>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x301)]=function(_0x592952,_0x19a996){const _0x49aa0f=_0x44537c,_0x96cc3e=this[_0x49aa0f(0x6ac)](_0x592952,_0x19a996,!![]);if(_0x96cc3e)this[_0x49aa0f(0x215)](_0x96cc3e);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x3ba)]=function(_0x950bf7,_0x4801ec){const _0x231547=_0x44537c,_0x20e7de=this['getDirectionFromPoint'](_0x950bf7,_0x4801ec,!![]);if(_0x20e7de)this[_0x231547(0x215)](_0x20e7de);},Game_Character[_0x44537c(0x4aa)]['turnTowardPoint']=function(_0x12f689,_0x51eddb){const _0x5b7828=_0x44537c,_0x5c5cc2=this[_0x5b7828(0x6ac)](_0x12f689,_0x51eddb,![]);if(_0x5c5cc2)this[_0x5b7828(0x325)](_0x5c5cc2);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x4c1)]=function(_0x3a6944,_0x10efa4){const _0x2ab7bd=_0x44537c,_0xfab307=this[_0x2ab7bd(0x25b)](_0x3a6944,_0x10efa4,![]);if(_0xfab307)this[_0x2ab7bd(0x325)](_0xfab307);},Game_Character['prototype']['moveTowardCharacter']=function(_0x51b10d){const _0x3ec67e=_0x44537c;if(_0x51b10d)this[_0x3ec67e(0x301)](_0x51b10d['x'],_0x51b10d['y']);},Game_Character['prototype'][_0x44537c(0x439)]=function(_0x5b949e){const _0x4bcaaa=_0x44537c;if(_0x5b949e)this[_0x4bcaaa(0x3ba)](_0x5b949e['x'],_0x5b949e['y']);},Game_Character['prototype']['turnTowardCharacter']=function(_0xcb225){const _0x58b1e8=_0x44537c;if(_0xcb225)this[_0x58b1e8(0x65f)](_0xcb225['x'],_0xcb225['y']);},Game_Character[_0x44537c(0x4aa)][_0x44537c(0x4dd)]=function(_0x604d06){const _0x125201=_0x44537c;if(_0x604d06)this[_0x125201(0x4c1)](_0x604d06['x'],_0x604d06['y']);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x1d8)]=Game_Player[_0x44537c(0x4aa)][_0x44537c(0x595)],Game_Player[_0x44537c(0x4aa)][_0x44537c(0x595)]=function(){const _0x108512=_0x44537c;if(!Game_CharacterBase[_0x108512(0x432)]&&this['isOnLadder']())return![];if(this[_0x108512(0x20d)])return!![];return VisuMZ[_0x108512(0x646)]['Game_Player_isDashing'][_0x108512(0x21e)](this);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x59d)]=Game_Player[_0x44537c(0x4aa)][_0x44537c(0x28c)],Game_Player['prototype'][_0x44537c(0x28c)]=function(){const _0x37cfd3=_0x44537c;return $gameMap[_0x37cfd3(0x36f)]()?this[_0x37cfd3(0x543)]():VisuMZ[_0x37cfd3(0x646)][_0x37cfd3(0x59d)][_0x37cfd3(0x21e)](this);},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x543)]=function(){const _0x68691f=_0x44537c;return Input[_0x68691f(0x24e)];},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x38c)]=function(){const _0x5134a5=_0x44537c;if($gameSystem['isPlayerControlDisabled']())return 0x0;if(!this[_0x5134a5(0x63e)]()&&this[_0x5134a5(0x3c3)]()){let _0x532ec8=this['getInputDirection']();if(_0x532ec8>0x0)$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){const _0x5b20c2=$gameTemp['destinationX'](),_0x1f1e98=$gameTemp[_0x5134a5(0x6b4)]();this[_0x5134a5(0x213)](_0x5b20c2,_0x1f1e98)?_0x532ec8=this[_0x5134a5(0x66d)](_0x5b20c2,_0x1f1e98):_0x532ec8=this[_0x5134a5(0x383)](_0x5b20c2,_0x1f1e98);}}_0x532ec8>0x0?(this['_inputTime']=this[_0x5134a5(0x5a0)]||0x0,this[_0x5134a5(0x411)]()?this[_0x5134a5(0x325)](_0x532ec8):this[_0x5134a5(0x51d)](_0x532ec8),this[_0x5134a5(0x5a0)]++):this['_inputTime']=0x0;}},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x411)]=function(){const _0x59069b=_0x44537c,_0x1a4237=VisuMZ[_0x59069b(0x646)]['Settings']['Movement'];if(!_0x1a4237[_0x59069b(0x501)])return![];if($gameTemp[_0x59069b(0x25a)]())return![];if(this[_0x59069b(0x595)]()||this['isMoving']()||this['isOnLadder']())return![];return this[_0x59069b(0x5a0)]<_0x1a4237[_0x59069b(0x330)];},VisuMZ['EventsMoveCore'][_0x44537c(0x472)]=Game_Player['prototype']['executeMove'],Game_Player[_0x44537c(0x4aa)]['executeMove']=function(_0x586fbc){const _0x40fdec=_0x44537c;$gameMap[_0x40fdec(0x36f)]()?this[_0x40fdec(0x215)](_0x586fbc):VisuMZ[_0x40fdec(0x646)]['Game_Player_executeMove'][_0x40fdec(0x21e)](this,_0x586fbc);},VisuMZ['EventsMoveCore'][_0x44537c(0x49b)]=Game_Player[_0x44537c(0x4aa)]['isMapPassable'],Game_Player[_0x44537c(0x4aa)][_0x44537c(0x3d1)]=function(_0x538300,_0x382d6f,_0x101c29){const _0x327574=_0x44537c;if($gameMap[_0x327574(0x1e8)](_0x538300,_0x382d6f,_0x101c29,_0x327574(0x1eb)))return this['isInVehicle']()&&this['vehicle']()?this[_0x327574(0x617)]()[_0x327574(0x3d1)](_0x538300,_0x382d6f,_0x101c29):!![];if($gameMap[_0x327574(0x5de)](_0x538300,_0x382d6f,_0x101c29,_0x327574(0x1eb)))return![];return VisuMZ[_0x327574(0x646)]['Game_Player_isMapPassable'][_0x327574(0x21e)](this,_0x538300,_0x382d6f,_0x101c29);},VisuMZ['EventsMoveCore'][_0x44537c(0x1de)]=Game_Player[_0x44537c(0x4aa)]['checkEventTriggerHere'],Game_Player['prototype'][_0x44537c(0x42a)]=function(_0x7177d8){const _0x22eb7c=_0x44537c;VisuMZ[_0x22eb7c(0x646)]['Game_Player_checkEventTriggerHere']['call'](this,_0x7177d8);if(this['canStartLocalEvents']()){this[_0x22eb7c(0x61d)](_0x7177d8);if(_0x7177d8[_0x22eb7c(0x680)](0x0)&&this[_0x22eb7c(0x337)]()==='standing')this[_0x22eb7c(0x350)](this['x'],this['y']);else(_0x7177d8[_0x22eb7c(0x680)](0x1)||_0x7177d8[_0x22eb7c(0x680)](0x2))&&this[_0x22eb7c(0x297)]();}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x59a)]=Game_Player['prototype'][_0x44537c(0x3da)],Game_Player[_0x44537c(0x4aa)][_0x44537c(0x3da)]=function(_0x38dddd){const _0x27e232=_0x44537c;VisuMZ[_0x27e232(0x646)][_0x27e232(0x59a)][_0x27e232(0x21e)](this,_0x38dddd);if(this[_0x27e232(0x4cb)]()&&_0x38dddd['includes'](0x0)&&this[_0x27e232(0x337)]()===_0x27e232(0x2e2)){const _0x1672ad=this[_0x27e232(0x29f)](),_0x418c0d=$gameMap[_0x27e232(0x2cf)](this['x'],_0x1672ad),_0x2b105a=$gameMap[_0x27e232(0x536)](this['y'],_0x1672ad);this[_0x27e232(0x350)](_0x418c0d,_0x2b105a);}},Game_Player[_0x44537c(0x4aa)]['checkEventTriggerEventsMoveCore']=function(_0x2443b8){const _0x3baa20=_0x44537c;if($gameMap[_0x3baa20(0x296)]())return;if($gameMap[_0x3baa20(0x3ad)]())return;const _0x39957b=$gameMap[_0x3baa20(0x35c)]();for(const _0x392e0e of _0x39957b){if(!_0x392e0e)continue;if(!_0x392e0e[_0x3baa20(0x3f8)](_0x2443b8))continue;if(this[_0x3baa20(0x312)](_0x392e0e))return _0x392e0e[_0x3baa20(0x273)]();if(this[_0x3baa20(0x287)](_0x392e0e))return _0x392e0e['start']();}},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x312)]=function(_0x5972b0){const _0x402783=_0x44537c;if($gameMap[_0x402783(0x296)]())return![];if($gameMap['isAnyEventStarting']())return![];return _0x5972b0[_0x402783(0x616)]()['includes'](this[_0x402783(0x1fa)]());},Game_Player[_0x44537c(0x4aa)]['meetActivationProximityConditions']=function(_0x4fabda){const _0x2a509e=_0x44537c;if($gameMap['isEventRunning']())return![];if($gameMap[_0x2a509e(0x3ad)]())return![];if([_0x2a509e(0x42d),_0x2a509e(0x5d0)][_0x2a509e(0x680)](_0x4fabda[_0x2a509e(0x1e4)]()))return![];const _0x29e0f2=_0x4fabda[_0x2a509e(0x1e4)](),_0x49dd9b=_0x4fabda['activationProximityDistance']();return this['checkEventProximity'](_0x4fabda,_0x29e0f2,_0x49dd9b);},Game_Map[_0x44537c(0x4aa)]['checkEventProximity']=function(_0x2fbcd2,_0x3a634b,_0x4892a7,_0x39fcd5,_0xf84f2){const _0x50a8b8=_0x44537c;switch(_0x39fcd5){case'square':return _0xf84f2>=Math[_0x50a8b8(0x316)](_0x4892a7[_0x50a8b8(0x314)](_0x2fbcd2))&&_0xf84f2>=Math[_0x50a8b8(0x316)](_0x4892a7[_0x50a8b8(0x261)](_0x3a634b));break;case _0x50a8b8(0x62f):const _0x129991=Math['pow'](_0x4892a7['x']-_0x2fbcd2,0x2),_0x31550f=Math[_0x50a8b8(0x5f9)](_0x4892a7['y']-_0x3a634b,0x2);return _0xf84f2>=Math[_0x50a8b8(0x4c4)](Math['sqrt'](_0x129991+_0x31550f));break;case _0x50a8b8(0x523):case _0x50a8b8(0x326):case _0x50a8b8(0x231):const _0xf496bd=$gameMap[_0x50a8b8(0x2a6)](_0x2fbcd2,_0x3a634b,_0x4892a7['x'],_0x4892a7['y']);return _0xf84f2>=_0xf496bd;break;case _0x50a8b8(0x3a6):return _0xf84f2>=Math[_0x50a8b8(0x316)](_0x4892a7[_0x50a8b8(0x261)](_0x3a634b));break;case'column':return _0xf84f2>=Math[_0x50a8b8(0x316)](_0x4892a7[_0x50a8b8(0x314)](_0x2fbcd2));break;}return![];},Game_Player['prototype'][_0x44537c(0x319)]=function(_0x3507a8,_0x1f8278,_0x47cc5a){const _0x1fed15=this['x'],_0x128990=this['y'];return $gameMap['checkEventProximity'](_0x1fed15,_0x128990,_0x3507a8,_0x1f8278,_0x47cc5a);},Game_Player[_0x44537c(0x4aa)]['startMapCommonEventOnOK']=function(_0xdf41a0,_0x1b3118){const _0x17ac86=_0x44537c;if($gameMap[_0x17ac86(0x296)]())return;if($gameMap[_0x17ac86(0x3ad)]())return;let _0x3ec611=VisuMZ[_0x17ac86(0x646)]['Settings']['RegionOk'],_0x593708=$gameMap['regionId'](_0xdf41a0,_0x1b3118);const _0x5a09a1=_0x17ac86(0x1ee)['format'](_0x593708);_0x3ec611[_0x5a09a1]&&$gameTemp[_0x17ac86(0x4fd)](_0x3ec611[_0x5a09a1]);},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x337)]=function(){const _0x1327b7=_0x44537c;return VisuMZ[_0x1327b7(0x646)][_0x1327b7(0x633)][_0x1327b7(0x2da)];},Game_Player[_0x44537c(0x4aa)]['startMapCommonEventOnTouch']=function(){const _0x5b3b34=_0x44537c;if($gameMap[_0x5b3b34(0x296)]())return;if($gameMap[_0x5b3b34(0x3ad)]())return;let _0x32861b=VisuMZ[_0x5b3b34(0x646)]['Settings'][_0x5b3b34(0x2ab)];const _0x1f491c=_0x5b3b34(0x1ee)[_0x5b3b34(0x48f)](this[_0x5b3b34(0x1fa)]());_0x32861b[_0x1f491c]&&$gameTemp[_0x5b3b34(0x4fd)](_0x32861b[_0x1f491c]);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x6b3)]=Game_Player['prototype'][_0x44537c(0x307)],Game_Player[_0x44537c(0x4aa)][_0x44537c(0x307)]=function(){const _0x4baf61=_0x44537c;VisuMZ['EventsMoveCore'][_0x4baf61(0x6b3)]['call'](this),VisuMZ[_0x4baf61(0x30e)](0x0);},Game_Player[_0x44537c(0x4aa)][_0x44537c(0x1d5)]=function(){const _0x587e73=_0x44537c;VisuMZ[_0x587e73(0x636)](0x0);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x57d)]=Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x459)],Game_Follower[_0x44537c(0x4aa)]['initialize']=function(_0x12abc8){const _0x11b9f7=_0x44537c;VisuMZ[_0x11b9f7(0x646)][_0x11b9f7(0x57d)]['call'](this,_0x12abc8),this[_0x11b9f7(0x494)]=![];},Game_Follower[_0x44537c(0x4aa)]['isDashing']=function(){const _0x550410=_0x44537c;if(this[_0x550410(0x494)])return Game_Character[_0x550410(0x4aa)][_0x550410(0x595)][_0x550410(0x21e)](this);return $gamePlayer['isDashing']();},Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x62e)]=function(){const _0x13dd7f=_0x44537c;if(this['_chaseOff'])return Game_Character[_0x13dd7f(0x4aa)]['isDashingAndMoving'][_0x13dd7f(0x21e)](this);return $gamePlayer[_0x13dd7f(0x62e)]()&&this['_actuallyMoving'];},Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x27d)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x21d)]=function(){const _0x4b4e4f=_0x44537c;Game_Character[_0x4b4e4f(0x4aa)][_0x4b4e4f(0x21d)][_0x4b4e4f(0x21e)](this),this[_0x4b4e4f(0x4ec)]>0x0&&(this['_actuallyMoving']=![]);},Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x4ed)]=function(_0x43db11){const _0x47ccba=_0x44537c;this[_0x47ccba(0x494)]=_0x43db11;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x508)]=Game_Follower[_0x44537c(0x4aa)]['chaseCharacter'],Game_Follower[_0x44537c(0x4aa)][_0x44537c(0x1f0)]=function(_0x54f3ab){const _0x42e9f8=_0x44537c;if(this[_0x42e9f8(0x494)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x42e9f8(0x646)][_0x42e9f8(0x508)][_0x42e9f8(0x21e)](this,_0x54f3ab),this['_actuallyMoving']=!![];},VisuMZ[_0x44537c(0x646)]['Game_Vehicle_isMapPassable']=Game_Vehicle['prototype'][_0x44537c(0x3d1)],Game_Vehicle[_0x44537c(0x4aa)][_0x44537c(0x3d1)]=function(_0x3b4988,_0x4af927,_0x50be24){const _0x43ff4b=_0x44537c;if($gameMap[_0x43ff4b(0x1e8)](_0x3b4988,_0x4af927,_0x50be24,this[_0x43ff4b(0x2e1)]))return!![];if($gameMap[_0x43ff4b(0x5de)](_0x3b4988,_0x4af927,_0x50be24,this[_0x43ff4b(0x2e1)]))return![];return VisuMZ[_0x43ff4b(0x646)][_0x43ff4b(0x22a)]['call'](this,_0x3b4988,_0x4af927,_0x50be24);},Game_Vehicle[_0x44537c(0x4aa)]['isAirshipPassable']=function(_0x2f62dd,_0x5f3320,_0x4a6642){const _0x81479b=_0x44537c;if($gameMap[_0x81479b(0x1e8)](_0x2f62dd,_0x5f3320,_0x4a6642,this['_type']))return!![];if($gameMap[_0x81479b(0x5de)](_0x2f62dd,_0x5f3320,_0x4a6642,this[_0x81479b(0x2e1)]))return![];return VisuMZ['EventsMoveCore'][_0x81479b(0x37f)][_0x81479b(0x21e)]($gamePlayer,_0x2f62dd,_0x5f3320,_0x4a6642);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x5a5)]=Game_Vehicle[_0x44537c(0x4aa)]['isLandOk'],Game_Vehicle[_0x44537c(0x4aa)][_0x44537c(0x542)]=function(_0x482850,_0x13b2aa,_0x3bbef1){const _0x36a82d=_0x44537c;if($gameMap['isRegionDockable'](_0x482850,_0x13b2aa,_0x3bbef1,this[_0x36a82d(0x2e1)]))return!![];const _0xf88ae8=this['_type'][_0x36a82d(0x480)](0x0)[_0x36a82d(0x526)]()+this[_0x36a82d(0x2e1)][_0x36a82d(0x32b)](0x1),_0x52cd1f='%1DockRegionOnly'[_0x36a82d(0x48f)](_0xf88ae8);return VisuMZ[_0x36a82d(0x646)][_0x36a82d(0x633)]['Region'][_0x52cd1f]?![]:VisuMZ[_0x36a82d(0x646)][_0x36a82d(0x5a5)][_0x36a82d(0x21e)](this,_0x482850,_0x13b2aa,_0x3bbef1);},VisuMZ['EventsMoveCore'][_0x44537c(0x382)]=Game_Vehicle['prototype']['initMoveSpeed'],Game_Vehicle[_0x44537c(0x4aa)][_0x44537c(0x3ec)]=function(){const _0x15e74e=_0x44537c;VisuMZ[_0x15e74e(0x646)][_0x15e74e(0x382)][_0x15e74e(0x21e)](this);const _0x337427=VisuMZ[_0x15e74e(0x646)][_0x15e74e(0x633)][_0x15e74e(0x60d)];if(this[_0x15e74e(0x495)]()){if(_0x337427[_0x15e74e(0x582)])this[_0x15e74e(0x59b)](_0x337427['BoatSpeed']);}else{if(this[_0x15e74e(0x35b)]()){if(_0x337427['ShipSpeed'])this['setMoveSpeed'](_0x337427['ShipSpeed']);}else{if(this[_0x15e74e(0x288)]()){if(_0x337427[_0x15e74e(0x48b)])this[_0x15e74e(0x59b)](_0x337427[_0x15e74e(0x48b)]);}}}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x580)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x459)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(_0x1d9009,_0xca655d){const _0xbee712=_0x44537c;this[_0xbee712(0x230)]=!![],VisuMZ['EventsMoveCore']['Game_Event_initialize'][_0xbee712(0x21e)](this,_0x1d9009,_0xca655d),this[_0xbee712(0x230)]=undefined,this[_0xbee712(0x522)](),this[_0xbee712(0x2fa)](),this[_0xbee712(0x2b1)]();},Game_Map[_0x44537c(0x4aa)][_0x44537c(0x3de)]=function(_0x2ff329,_0x11cdf1){const _0x39973b=_0x44537c;return _0x2ff329===$gameMap[_0x39973b(0x4e7)]()?$dataMap[_0x39973b(0x35c)][_0x11cdf1]:VisuMZ[_0x39973b(0x5d6)][_0x2ff329][_0x39973b(0x35c)][_0x11cdf1];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x204)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x246)],Game_Event['prototype'][_0x44537c(0x246)]=function(){const _0xf79be2=_0x44537c;if(this[_0xf79be2(0x5ae)]!==undefined){const _0xa31a64=this[_0xf79be2(0x5ae)][_0xf79be2(0x4e7)],_0x2c8f4b=this[_0xf79be2(0x5ae)][_0xf79be2(0x4c8)];return $gameMap['referEvent'](_0xa31a64,_0x2c8f4b);}if(this[_0xf79be2(0x2eb)]!==undefined){const _0x246476=this[_0xf79be2(0x2eb)][_0xf79be2(0x4e7)],_0x191a2e=this[_0xf79be2(0x2eb)][_0xf79be2(0x4c8)];return $gameMap[_0xf79be2(0x3de)](_0x246476,_0x191a2e);}if(this[_0xf79be2(0x3ae)]!==undefined){const _0x47bb13=this['_eventSpawnData'][_0xf79be2(0x4e7)],_0x4a282b=this[_0xf79be2(0x3ae)][_0xf79be2(0x4c8)];return $gameMap[_0xf79be2(0x3de)](_0x47bb13,_0x4a282b);}if($gameTemp[_0xf79be2(0x4b4)]!==undefined){const _0x44d28c=$gameTemp['_spawnData']['mapId'],_0x330e8b=$gameTemp['_spawnData']['eventId'];return $gameMap[_0xf79be2(0x3de)](_0x44d28c,_0x330e8b);}return VisuMZ['EventsMoveCore'][_0xf79be2(0x204)][_0xf79be2(0x21e)](this);},Game_Event[_0x44537c(0x4aa)]['checkValidEventerMap']=function(_0x25efda,_0x487593){const _0x40574f=_0x44537c;if(_0x25efda===0x0||_0x487593===0x0)return![];if(_0x25efda===$gameMap[_0x40574f(0x4e7)]())return!![];if(!VisuMZ[_0x40574f(0x5d6)][_0x25efda]&&_0x25efda!==$gameMap['mapId']())return $gameTemp[_0x40574f(0x2ee)]()&&console[_0x40574f(0x26a)](_0x40574f(0x4d0)[_0x40574f(0x48f)](_0x25efda)),![];return!![];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x51e)]=Game_Event['prototype'][_0x44537c(0x273)],Game_Event['prototype'][_0x44537c(0x273)]=function(){const _0x53736d=_0x44537c;VisuMZ[_0x53736d(0x646)][_0x53736d(0x51e)][_0x53736d(0x21e)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x53736d(0x669)](VisuMZ[_0x53736d(0x2bd)]['Settings']['General'][_0x53736d(0x2f5)])&&Input[_0x53736d(0x386)]();},Game_Event[_0x44537c(0x4aa)]['setupCopyEvent']=function(){const _0x38185e=_0x44537c,_0x3118aa=this['event']()[_0x38185e(0x670)];if(_0x3118aa==='')return;if(DataManager[_0x38185e(0x295)]()||DataManager[_0x38185e(0x4a1)]())return;const _0x551795=VisuMZ[_0x38185e(0x646)][_0x38185e(0x633)][_0x38185e(0x1ef)];let _0x2fcc7f=null,_0x3cfd6d=0x0,_0x475f76=0x0;if(_0x3118aa[_0x38185e(0x276)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x3cfd6d=Number(RegExp['$1']),_0x475f76=Number(RegExp['$2']);if(_0x3cfd6d===0x0)_0x3cfd6d=$gameMap[_0x38185e(0x4e7)]();}else{if(_0x3118aa[_0x38185e(0x276)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x3cfd6d=Number(RegExp['$1']),_0x475f76=Number(RegExp['$2']);if(_0x3cfd6d===0x0)_0x3cfd6d=$gameMap[_0x38185e(0x4e7)]();}else{if(_0x3118aa['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x51d943=String(RegExp['$1'])[_0x38185e(0x526)]()[_0x38185e(0x35e)]();_0x2fcc7f=VisuMZ[_0x38185e(0x487)][_0x51d943];if(!_0x2fcc7f)return;_0x3cfd6d=_0x2fcc7f['MapID'],_0x475f76=_0x2fcc7f['EventID'];}}}if(!this['checkValidEventerMap'](_0x3cfd6d,_0x475f76))return;_0x551795['PreCopyJS'][_0x38185e(0x21e)](this,_0x3cfd6d,_0x475f76,this);if(_0x2fcc7f)_0x2fcc7f[_0x38185e(0x66f)][_0x38185e(0x21e)](this,_0x3cfd6d,_0x475f76,this);this[_0x38185e(0x2eb)]={'mapId':_0x3cfd6d,'eventId':_0x475f76},this[_0x38185e(0x6a6)]=-0x2,this[_0x38185e(0x406)](),_0x551795[_0x38185e(0x2c6)][_0x38185e(0x21e)](this,_0x3cfd6d,_0x475f76,this);if(_0x2fcc7f)_0x2fcc7f[_0x38185e(0x2c6)][_0x38185e(0x21e)](this,_0x3cfd6d,_0x475f76,this);$gameMap[_0x38185e(0x346)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x2fa)]=function(){const _0x293170=_0x44537c,_0x141884=$gameSystem[_0x293170(0x490)](this);if(!_0x141884)return;const _0x2141e8=_0x141884['template'][_0x293170(0x526)]()['trim']();_0x2141e8!==_0x293170(0x3db)?this[_0x293170(0x245)](_0x2141e8,!![]):this[_0x293170(0x45d)](_0x141884['mapId'],_0x141884[_0x293170(0x4c8)],!![]);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x45d)]=function(_0x5542f5,_0xe936bb,_0x4dc937){const _0x9dc567=_0x44537c;if(!this['checkValidEventerMap'](_0x5542f5,_0xe936bb))return;const _0x544b7c=VisuMZ[_0x9dc567(0x646)]['Settings'][_0x9dc567(0x1ef)];if(!_0x4dc937)_0x544b7c[_0x9dc567(0x642)][_0x9dc567(0x21e)](this,_0x5542f5,_0xe936bb,this);this['_eventMorphData']={'mapId':_0x5542f5,'eventId':_0xe936bb},this[_0x9dc567(0x6a6)]=-0x2,this[_0x9dc567(0x406)]();if(!_0x4dc937)_0x544b7c['PostMorphJS']['call'](this,_0x5542f5,_0xe936bb,this);$gameMap[_0x9dc567(0x346)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x245)]=function(_0xa579c8,_0x304423){const _0x499de4=_0x44537c;_0xa579c8=_0xa579c8[_0x499de4(0x526)]()[_0x499de4(0x35e)]();const _0x303606=VisuMZ[_0x499de4(0x487)][_0xa579c8];if(!_0x303606)return;const _0x39bb24=_0x303606['MapID'],_0xa2c9ff=_0x303606[_0x499de4(0x2d2)];if(!this['checkValidEventerMap'](_0x39bb24,_0xa2c9ff))return;if(!_0x304423)_0x303606[_0x499de4(0x642)][_0x499de4(0x21e)](this,_0x39bb24,_0xa2c9ff,this);this[_0x499de4(0x45d)](_0x39bb24,_0xa2c9ff,_0x304423);if(!_0x304423)_0x303606[_0x499de4(0x31c)][_0x499de4(0x21e)](this,_0x39bb24,_0xa2c9ff,this);if($gameMap)$gameMap[_0x499de4(0x346)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x64f)]=function(){const _0x1e09ae=_0x44537c;this[_0x1e09ae(0x5ae)]=undefined,this[_0x1e09ae(0x6a6)]=-0x2,this[_0x1e09ae(0x406)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x388)]=function(_0x33448e){const _0x415c74=_0x44537c,_0xbece56=VisuMZ['EventsMoveCore'][_0x415c74(0x633)][_0x415c74(0x1ef)],_0x7900c9=_0x33448e[_0x415c74(0x422)]['toUpperCase']()[_0x415c74(0x35e)](),_0x466dbe=!['',_0x415c74(0x3db)][_0x415c74(0x680)](_0x7900c9);let _0x34594b=0x0,_0x15d409=0x0;if(_0x466dbe){const _0x3f1b62=VisuMZ[_0x415c74(0x487)][_0x7900c9];if(!_0x3f1b62)return;_0x34594b=_0x3f1b62[_0x415c74(0x2fb)],_0x15d409=_0x3f1b62['EventID'];}else _0x34594b=_0x33448e['mapId'],_0x15d409=_0x33448e[_0x415c74(0x4c8)];if(!this[_0x415c74(0x521)](_0x34594b,_0x15d409))return;if(_0x466dbe){const _0x270efc=VisuMZ['EventTemplates'][_0x7900c9];_0x270efc['PreSpawnJS']['call'](this,_0x34594b,_0x15d409,this);}_0xbece56['PreSpawnJS'][_0x415c74(0x21e)](this,_0x34594b,_0x15d409,this),this['_eventSpawnData']=_0x33448e,this[_0x415c74(0x6a6)]=-0x2,this['_mapId']=$gameMap['mapId'](),this['_eventId']=_0x33448e[_0x415c74(0x4d3)],this['_spawnPreserved']=_0x33448e['spawnPreserved'],this['locate'](_0x33448e['x'],_0x33448e['y']),this['setDirection'](_0x33448e[_0x415c74(0x29f)]),this[_0x415c74(0x406)]();if(_0x466dbe){const _0x24b244=VisuMZ[_0x415c74(0x487)][_0x7900c9];if(!_0x24b244)return;_0x24b244[_0x415c74(0x4e8)][_0x415c74(0x21e)](this,_0x34594b,_0x15d409,this);}_0xbece56[_0x415c74(0x4e8)][_0x415c74(0x21e)](this,_0x34594b,_0x15d409,this);const _0x131d23=SceneManager['_scene'];if(_0x131d23&&_0x131d23[_0x415c74(0x40c)])_0x131d23[_0x415c74(0x40c)][_0x415c74(0x305)](this);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x200)]=function(){return!!this['_eventSpawnData'];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x273)]=function(){const _0x3283c4=_0x44537c;if(!this[_0x3283c4(0x655)]())return;const _0x4edd3c=this['list']()[_0x3283c4(0x60f)](_0x485a97=>_0x485a97[_0x3283c4(0x5a4)]!==0x6c&&_0x485a97[_0x3283c4(0x5a4)]!==0x198);_0x4edd3c[_0x3283c4(0x220)]>0x1&&(this['_starting']=!![],this['isTriggerIn']([0x0,0x1,0x2])&&this[_0x3283c4(0x623)]());},VisuMZ[_0x44537c(0x646)]['Game_Event_clearPageSettings']=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x500)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x500)]=function(){const _0x4ade71=_0x44537c;VisuMZ[_0x4ade71(0x646)]['Game_Event_clearPageSettings'][_0x4ade71(0x21e)](this),this[_0x4ade71(0x5c3)](),this[_0x4ade71(0x3d8)]();},VisuMZ['EventsMoveCore'][_0x44537c(0x661)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x20f)],Game_Event[_0x44537c(0x4aa)]['setupPageSettings']=function(){const _0x2f0ddf=_0x44537c;this[_0x2f0ddf(0x3a2)]=!![],VisuMZ[_0x2f0ddf(0x646)][_0x2f0ddf(0x661)][_0x2f0ddf(0x21e)](this),this[_0x2f0ddf(0x5f7)](),this['autosaveEventLocation'](),this[_0x2f0ddf(0x3a2)]=![];},Game_Event[_0x44537c(0x4aa)]['setupEventsMoveCoreEffects']=function(){const _0x18420f=_0x44537c;if(!this[_0x18420f(0x246)]())return;this[_0x18420f(0x5c3)](),this[_0x18420f(0x68e)](),this[_0x18420f(0x2c3)](),this[_0x18420f(0x479)]();},Game_Event['prototype'][_0x44537c(0x68e)]=function(){const _0x396ecb=_0x44537c,_0x2c4836=this['event']()[_0x396ecb(0x670)];if(_0x2c4836==='')return;this[_0x396ecb(0x1ec)](_0x2c4836);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x2c3)]=function(){const _0x2a153d=_0x44537c;if(!this['page']())return;const _0x498afc=this[_0x2a153d(0x655)]();let _0x19d08a='';for(const _0x4479d5 of _0x498afc){if([0x6c,0x198]['includes'](_0x4479d5[_0x2a153d(0x5a4)])){if(_0x19d08a!=='')_0x19d08a+='\x0a';_0x19d08a+=_0x4479d5[_0x2a153d(0x420)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x19d08a);},Game_Event[_0x44537c(0x4aa)]['initEventsMoveCoreEffects']=function(){const _0x236293=_0x44537c,_0x46cc4f=VisuMZ[_0x236293(0x646)][_0x236293(0x633)];this[_0x236293(0x5ed)]={'type':_0x236293(0x42d),'distance':0x0,'regionList':[]},this[_0x236293(0x546)]=![],this[_0x236293(0x4cd)]=![],this[_0x236293(0x585)](),this[_0x236293(0x464)]=![],this[_0x236293(0x2ba)]=![],(this['isTile']()||this[_0x236293(0x629)]())&&this[_0x236293(0x568)]===0x0&&(this['_customZ']=0x0),this[_0x236293(0x377)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x236293(0x44f)]={'type':_0x236293(0x42d),'distance':0x0},this['_encounterNoneProximity']={'type':_0x236293(0x42d),'distance':0x0},$gameSystem['resetIconsOnEventsData'](this),this[_0x236293(0x65b)]=$gameSystem[_0x236293(0x3f0)](this),this[_0x236293(0x381)]={'originalText':'','text':'','visibleRange':_0x46cc4f[_0x236293(0x463)][_0x236293(0x242)],'rangeType':_0x46cc4f[_0x236293(0x463)][_0x236293(0x3fc)],'offsetX':_0x46cc4f[_0x236293(0x463)]['OffsetX'],'offsetY':_0x46cc4f[_0x236293(0x463)]['OffsetY'],'hueShift':0x0},this['_mirrorSprite']=![],this[_0x236293(0x60b)]=[],this[_0x236293(0x338)]={'target':-0x1,'type':_0x236293(0x393),'delay':0x1,'opacityDelta':0x0},this[_0x236293(0x427)]=_0x46cc4f[_0x236293(0x60d)][_0x236293(0x248)]??0x0,this[_0x236293(0x57a)]=![],this[_0x236293(0x47c)]=0x1,this[_0x236293(0x279)]=0x1,this[_0x236293(0x4ff)]=![],this['_screenParallel']=![],this[_0x236293(0x436)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x46cc4f[_0x236293(0x60d)][_0x236293(0x4b9)]},this[_0x236293(0x233)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x236293(0x3c8)](),this[_0x236293(0x2f3)]();},Game_Event['prototype']['checkEventsMoveCoreStringTags']=function(_0x52f9d8){const _0x12f78b=_0x44537c;if(_0x52f9d8[_0x12f78b(0x276)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x12f78b(0x5ed)][_0x12f78b(0x227)]=JSON[_0x12f78b(0x25d)]('['+RegExp['$1'][_0x12f78b(0x276)](/\d+/g)+']'),this['_activationProximity'][_0x12f78b(0x676)]=_0x12f78b(0x5d0);else _0x52f9d8[_0x12f78b(0x276)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x12f78b(0x35e)](),this[_0x12f78b(0x5ed)]['type']=type,this[_0x12f78b(0x5ed)]['distance']=Number(RegExp['$2']));_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x552)]=String(RegExp['$1']),this[_0x12f78b(0x4cc)]['type']='picture');if(_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0xe12b84=String(RegExp['$1'])[_0x12f78b(0x526)]()[_0x12f78b(0x35e)](),_0x43c9b8=[_0x12f78b(0x4bc),_0x12f78b(0x2f6),_0x12f78b(0x63f),_0x12f78b(0x458)];this[_0x12f78b(0x4cc)][_0x12f78b(0x592)]=_0x43c9b8[_0x12f78b(0x4e1)](_0xe12b84)[_0x12f78b(0x209)](0x0,0x3);}_0x52f9d8['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x690)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x5bf)]=Number(RegExp['$1']));_0x52f9d8['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x3d2)]=Number(RegExp['$1']));_0x52f9d8['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x5bf)]=Number(RegExp['$1']),this[_0x12f78b(0x4cc)][_0x12f78b(0x3d2)]=Number(RegExp['$2']));_0x52f9d8['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x12f78b(0x4cc)]['scale']=Number(RegExp['$1'])*0.01);_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x12f78b(0x4cc)][_0x12f78b(0x676)]=String(RegExp['$1'])[_0x12f78b(0x53b)]()[_0x12f78b(0x35e)]());_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x12f78b(0x4cc)]['filename']=String(RegExp['$1']),this[_0x12f78b(0x4cc)][_0x12f78b(0x676)]=_0x12f78b(0x466));_0x52f9d8[_0x12f78b(0x276)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this['_attachPicture']['filename']=String(RegExp['$1']),this[_0x12f78b(0x4cc)]['type']=_0x12f78b(0x4eb));_0x52f9d8['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x12f78b(0x546)]=!![]);_0x52f9d8[_0x12f78b(0x276)](/<BYPASS CLICK STOP>/i)&&(this[_0x12f78b(0x4cd)]=!![]);_0x52f9d8['match'](/<CLICK TRIGGER>/i)&&(this[_0x12f78b(0x464)]=!![]);_0x52f9d8[_0x12f78b(0x276)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x12f78b(0x2ba)]=Number(RegExp['$1'])||0x0);_0x52f9d8[_0x12f78b(0x276)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x12f78b(0x53b)]()[_0x12f78b(0x35e)](),this['_encounterHalfProximity'][_0x12f78b(0x676)]=type,this[_0x12f78b(0x44f)][_0x12f78b(0x2a6)]=Number(RegExp['$2']));_0x52f9d8['match'](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x12f78b(0x53b)]()[_0x12f78b(0x35e)](),this['_encounterNoneProximity'][_0x12f78b(0x676)]=type,this[_0x12f78b(0x1dc)]['distance']=Number(RegExp['$2']));const _0x24d8e8=_0x52f9d8[_0x12f78b(0x276)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x24d8e8)for(const _0x23ad17 of _0x24d8e8){if(_0x23ad17['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x166d52=String(RegExp['$1'])['toLowerCase']()[_0x12f78b(0x35e)](),_0x546032=Number(RegExp['$2']);this['_addedHitbox'][_0x166d52]=_0x546032;}}if(this[_0x12f78b(0x65b)]['iconIndex']>=0x0&&!this[_0x12f78b(0x65b)]['forced']){_0x52f9d8[_0x12f78b(0x276)](/<ICON:[ ](\d+)>/i)&&(this[_0x12f78b(0x65b)][_0x12f78b(0x5e0)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x12f78b(0x693)]=Number(RegExp['$1']));_0x52f9d8['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x12f78b(0x2df)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x12f78b(0x693)]=Number(RegExp['$1']),this[_0x12f78b(0x65b)]['bufferY']=Number(RegExp['$2']));if(_0x52f9d8[_0x12f78b(0x276)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x5379d9=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x10144c=[_0x12f78b(0x4bc),'ADDITIVE','MULTIPLY','SCREEN'];this[_0x12f78b(0x65b)][_0x12f78b(0x592)]=_0x10144c[_0x12f78b(0x4e1)](_0x5379d9)[_0x12f78b(0x209)](0x0,0x3);}$gameSystem[_0x12f78b(0x4c0)](this,this[_0x12f78b(0x65b)][_0x12f78b(0x5e0)],this[_0x12f78b(0x65b)][_0x12f78b(0x693)],this[_0x12f78b(0x65b)][_0x12f78b(0x2df)],this[_0x12f78b(0x65b)]['blendMode']);}if(_0x52f9d8[_0x12f78b(0x276)](/<LABEL:[ ](.*?)>/i)){let _0x28e0b4=String(RegExp['$1'])['trim']();this[_0x12f78b(0x381)]['text']=_0x28e0b4,this[_0x12f78b(0x381)][_0x12f78b(0x3dc)]=_0x28e0b4;}if(_0x52f9d8['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x360e0a=String(RegExp['$1'])[_0x12f78b(0x35e)]();this[_0x12f78b(0x381)][_0x12f78b(0x61a)]=_0x360e0a,this['_labelWindow'][_0x12f78b(0x3dc)]=_0x360e0a;}_0x52f9d8['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x12f78b(0x5bf)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x381)]['offsetY']=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x381)][_0x12f78b(0x5bf)]=Number(RegExp['$1']),this[_0x12f78b(0x381)][_0x12f78b(0x3d2)]=Number(RegExp['$2']));_0x52f9d8[_0x12f78b(0x276)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x12f78b(0x381)][_0x12f78b(0x610)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x12f78b(0x381)][_0x12f78b(0x30d)]=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<LABEL RANGE TYPE: SQUARE>/i)&&(this['_labelWindow'][_0x12f78b(0x32a)]=_0x12f78b(0x6bc));_0x52f9d8[_0x12f78b(0x276)](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x12f78b(0x381)][_0x12f78b(0x32a)]=_0x12f78b(0x326));_0x52f9d8[_0x12f78b(0x276)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this[_0x12f78b(0x381)][_0x12f78b(0x32a)]=_0x12f78b(0x62f));this['updateEventLabelText']();_0x52f9d8[_0x12f78b(0x276)](/<MIRROR SPRITE>/i)&&(this[_0x12f78b(0x26f)]=!![]);if(_0x52f9d8[_0x12f78b(0x276)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x1af6e=JSON['parse']('['+RegExp['$1'][_0x12f78b(0x276)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x12f78b(0x60b)]['concat'](_0x1af6e),this[_0x12f78b(0x60b)]['remove'](0x0);}if(_0x52f9d8[_0x12f78b(0x276)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x46f1c3=String(RegExp['$1']);if(_0x46f1c3[_0x12f78b(0x276)](/PLAYER/i))this[_0x12f78b(0x338)]['target']=0x0;else _0x46f1c3[_0x12f78b(0x276)](/EVENT[ ](\d+)/i)&&(this[_0x12f78b(0x338)][_0x12f78b(0x674)]=Number(RegExp['$1']));}_0x52f9d8[_0x12f78b(0x276)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x12f78b(0x676)]=String(RegExp['$1'])[_0x12f78b(0x53b)]()[_0x12f78b(0x35e)]());_0x52f9d8[_0x12f78b(0x276)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x12f78b(0x338)]['delay']=Number(RegExp['$1']));_0x52f9d8[_0x12f78b(0x276)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x12f78b(0x338)]['opacityDelta']=Number(RegExp['$1']));if(_0x52f9d8[_0x12f78b(0x276)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x52f9d8[_0x12f78b(0x276)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x12f78b(0x427)]=Number(RegExp['$1'])||0x0);_0x52f9d8[_0x12f78b(0x276)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);_0x52f9d8[_0x12f78b(0x276)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x12f78b(0x47c)]=Number(RegExp['$1'])*0.01);_0x52f9d8['match'](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x12f78b(0x279)]=Number(RegExp['$1'])*0.01);if(_0x52f9d8[_0x12f78b(0x276)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x583a7e=Number(RegExp['$1'])*0.01;this[_0x12f78b(0x47c)]=_0x583a7e,this[_0x12f78b(0x279)]=_0x583a7e;}_0x52f9d8[_0x12f78b(0x276)](/<SCREEN ACTIVATION>/i)&&(this[_0x12f78b(0x4ff)]=!![],this[_0x12f78b(0x639)]=![],this[_0x12f78b(0x436)]=![]);if(_0x52f9d8[_0x12f78b(0x276)](/<SCREEN PARALLEL>/i))this[_0x12f78b(0x4ff)]=![],this[_0x12f78b(0x639)]=!![],this[_0x12f78b(0x436)]=![];else _0x52f9d8[_0x12f78b(0x276)](/<SCREEN PARALLEL ONCE>/i)&&(this[_0x12f78b(0x4ff)]=![],this[_0x12f78b(0x639)]=!![],this['_screenParallelOnce']=!![]);_0x52f9d8[_0x12f78b(0x276)](/<HIDE SHADOW>/i)&&(this[_0x12f78b(0x41d)][_0x12f78b(0x481)]=![]),_0x52f9d8['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x12f78b(0x41d)][_0x12f78b(0x552)]=String(RegExp['$1'])),_0x52f9d8[_0x12f78b(0x276)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0x52f9d8[_0x12f78b(0x276)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x6b5)]=Number(RegExp['$1'])),_0x52f9d8[_0x12f78b(0x276)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x12f78b(0x510)]=Number(RegExp['$1']),this[_0x12f78b(0x6b5)]=Number(RegExp['$2'])),_0x52f9d8[_0x12f78b(0x276)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x12f78b(0x462)]=String(RegExp['$1'])['toUpperCase']()[_0x12f78b(0x35e)]()),_0x52f9d8[_0x12f78b(0x276)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this[_0x12f78b(0x233)]=this[_0x12f78b(0x233)]||{},this['_tileExpand']['up']=Number(RegExp['$1'])),_0x52f9d8['match'](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this[_0x12f78b(0x233)]=this[_0x12f78b(0x233)]||{},this['_tileExpand'][_0x12f78b(0x37d)]=Number(RegExp['$1'])),_0x52f9d8[_0x12f78b(0x276)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this[_0x12f78b(0x233)]=this[_0x12f78b(0x233)]||{},this[_0x12f78b(0x233)][_0x12f78b(0x211)]=Number(RegExp['$1'])),_0x52f9d8['match'](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x12f78b(0x233)]||{},this[_0x12f78b(0x233)]['right']=Number(RegExp['$1']));},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x58e)]=function(){const _0x317e42=_0x44537c;$gameTemp[_0x317e42(0x450)](this),this['_labelWindow'][_0x317e42(0x61a)]=this['_labelWindow'][_0x317e42(0x3dc)];for(;;){if(this[_0x317e42(0x381)][_0x317e42(0x61a)][_0x317e42(0x276)](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x317e42(0x61a)]=this[_0x317e42(0x381)][_0x317e42(0x3dc)][_0x317e42(0x6aa)](/\\V\[(\d+)\]/gi,(_0x4f9d4c,_0x523666)=>$gameVariables[_0x317e42(0x1f3)](parseInt(_0x523666)));else break;}$gameTemp[_0x317e42(0x651)]();},Game_Event['prototype'][_0x44537c(0x479)]=function(){const _0x59041e=_0x44537c;this[_0x59041e(0x599)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x63d)]=function(){const _0x965d25=_0x44537c;if(this['_alwaysUpdateMove'])return!![];return Game_Character['prototype'][_0x965d25(0x63d)][_0x965d25(0x21e)](this);},VisuMZ[_0x44537c(0x646)]['Game_Event_updateSelfMovement']=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x560)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x560)]=function(){const _0x18c162=_0x44537c;if(this['isPreventSelfMovement']())return;VisuMZ[_0x18c162(0x646)][_0x18c162(0x413)][_0x18c162(0x21e)](this),this[_0x18c162(0x63e)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x18c162(0x5c0)]);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x571)]=function(){const _0x17899d=_0x44537c,_0x497801=VisuMZ[_0x17899d(0x646)][_0x17899d(0x633)][_0x17899d(0x60d)];if($gameMap[_0x17899d(0x296)]()&&_0x497801[_0x17899d(0x672)])return!![];if($gameMessage[_0x17899d(0x47b)]()&&_0x497801[_0x17899d(0x525)])return!![];if(!$gameSystem[_0x17899d(0x2fc)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];if(!SceneManager[_0x17899d(0x5e7)][_0x17899d(0x4ba)])return!![];return![];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x599)]=function(){const _0x3906b6=_0x44537c,_0x465986=SceneManager[_0x3906b6(0x5e7)][_0x3906b6(0x40c)];if(_0x465986){const _0x28fed2=_0x465986[_0x3906b6(0x5c5)](this);_0x28fed2&&_0x28fed2[_0x3906b6(0x492)]&&_0x28fed2['_shadowSprite']['_filename']!==this[_0x3906b6(0x491)]()&&(_0x28fed2[_0x3906b6(0x492)][_0x3906b6(0x2f7)]=this['shadowFilename'](),_0x28fed2[_0x3906b6(0x492)]['bitmap']=ImageManager[_0x3906b6(0x4bb)](_0x28fed2['_shadowSprite'][_0x3906b6(0x2f7)]));}},Game_Event[_0x44537c(0x4aa)]['shadowFilename']=function(){const _0x190991=_0x44537c;return this[_0x190991(0x41d)][_0x190991(0x552)];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x35d)]=function(){const _0x53ae59=_0x44537c;if(!this[_0x53ae59(0x41d)][_0x53ae59(0x481)])return![];if($gamePlayer['_noEventMovementShadow'])return![];return Game_CharacterBase[_0x53ae59(0x4aa)][_0x53ae59(0x35d)][_0x53ae59(0x21e)](this);},Game_Event['prototype']['labelWindowText']=function(){const _0x5bdf50=_0x44537c;return this[_0x5bdf50(0x381)][_0x5bdf50(0x61a)];},Game_Event['prototype']['labelWindowRange']=function(){const _0x4b4785=_0x44537c;return this[_0x4b4785(0x381)][_0x4b4785(0x30d)]??VisuMZ[_0x4b4785(0x646)][_0x4b4785(0x633)][_0x4b4785(0x463)][_0x4b4785(0x242)];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x5e4)]=function(){const _0x217659=_0x44537c;return this[_0x217659(0x381)]['rangeType']??VisuMZ[_0x217659(0x646)][_0x217659(0x633)]['Label']['RangeType']??_0x217659(0x6bc);},VisuMZ['EventsMoveCore']['isInsideLabelRange']=function(_0x3bcaf2){const _0x176f6f=_0x44537c,_0x4df654=_0x3bcaf2[_0x176f6f(0x5e4)](),_0x5026d1=_0x3bcaf2['labelWindowRange']();return $gameMap[_0x176f6f(0x319)]($gamePlayer['x'],$gamePlayer['y'],_0x3bcaf2,_0x4df654,_0x5026d1);},Game_Event[_0x44537c(0x4aa)]['isMapPassable']=function(_0x22592d,_0x4f2311,_0x1a60a5){const _0x228db1=_0x44537c;if(this[_0x228db1(0x621)]())return this[_0x228db1(0x4b1)](_0x22592d,_0x4f2311,_0x1a60a5);if($gameMap[_0x228db1(0x1e8)](_0x22592d,_0x4f2311,_0x1a60a5,_0x228db1(0x246)))return!![];if($gameMap[_0x228db1(0x5de)](_0x22592d,_0x4f2311,_0x1a60a5,_0x228db1(0x246)))return![];return Game_Character[_0x228db1(0x4aa)][_0x228db1(0x3d1)][_0x228db1(0x21e)](this,_0x22592d,_0x4f2311,_0x1a60a5);},Game_Event['prototype'][_0x44537c(0x621)]=function(){const _0x1048a2=_0x44537c;if(this[_0x1048a2(0x60b)]===undefined)this['initEventsMoveCoreEffects']();return this[_0x1048a2(0x60b)][_0x1048a2(0x220)]>0x0;},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x4b1)]=function(_0x238345,_0x4ace55,_0x40dbc7){const _0x3a563d=_0x44537c,_0x2d64d0=$gameMap[_0x3a563d(0x2cf)](_0x238345,_0x40dbc7),_0x452627=$gameMap[_0x3a563d(0x536)](_0x4ace55,_0x40dbc7),_0x47ab9c=$gameMap[_0x3a563d(0x1fa)](_0x2d64d0,_0x452627);return this[_0x3a563d(0x60b)]['includes'](_0x47ab9c);},VisuMZ['EventsMoveCore'][_0x44537c(0x205)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x435)],Game_Event[_0x44537c(0x4aa)]['findProperPageIndex']=function(){const _0x1f4017=_0x44537c;if(this[_0x1f4017(0x246)]()&&!$gameTemp[_0x1f4017(0x2ee)]()){if(this['event']()[_0x1f4017(0x670)][_0x1f4017(0x276)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this['_advancedSwitchVariable']=![],this['_CPCs']=![],this[_0x1f4017(0x246)]()?VisuMZ[_0x1f4017(0x646)][_0x1f4017(0x205)][_0x1f4017(0x21e)](this):-0x1;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4b3)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x3e7)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x3e7)]=function(_0x25d820){const _0x41aeca=_0x44537c;this[_0x41aeca(0x56c)](_0x25d820),$gameTemp[_0x41aeca(0x450)](this);const _0x5c1fb9=VisuMZ[_0x41aeca(0x646)][_0x41aeca(0x4b3)][_0x41aeca(0x21e)](this,_0x25d820);return $gameTemp[_0x41aeca(0x651)](),_0x5c1fb9;},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x354)]=function(){const _0x47ca37=_0x44537c;return this[_0x47ca37(0x3cc)];},Game_Event['prototype']['checkAdvancedSwitchVariablePresent']=function(_0x4ad6fa){const _0x1f5d6e=_0x44537c,_0x5f26e7=_0x4ad6fa[_0x1f5d6e(0x366)];if(_0x5f26e7[_0x1f5d6e(0x4f2)]&&DataManager[_0x1f5d6e(0x3be)](_0x5f26e7[_0x1f5d6e(0x4e0)]))this[_0x1f5d6e(0x3cc)]=!![];else{if(_0x5f26e7[_0x1f5d6e(0x603)]&&DataManager['isAdvancedSwitch'](_0x5f26e7[_0x1f5d6e(0x3c7)]))this[_0x1f5d6e(0x3cc)]=!![];else _0x5f26e7[_0x1f5d6e(0x379)]&&DataManager['isAdvancedVariable'](_0x5f26e7[_0x1f5d6e(0x47e)])&&(this[_0x1f5d6e(0x3cc)]=!![]);}},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x360)]=function(){const _0x51d35c=_0x44537c;if(this[_0x51d35c(0x40a)])return![];return this['_clickTrigger'];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x5d7)]=function(){const _0x347a8e=_0x44537c;$gameTemp[_0x347a8e(0x5d8)](),this[_0x347a8e(0x273)]();},Game_Event['prototype'][_0x44537c(0x328)]=function(_0x7f271b,_0x2f404a){const _0xdd4c50=_0x44537c;return this['_addedHitbox']?this[_0xdd4c50(0x392)](_0x7f271b,_0x2f404a):Game_Character[_0xdd4c50(0x4aa)][_0xdd4c50(0x328)][_0xdd4c50(0x21e)](this,_0x7f271b,_0x2f404a);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x392)]=function(_0x4ca5b1,_0x184e61){const _0x504159=_0x44537c;var _0x111224=this['x']-this[_0x504159(0x377)][_0x504159(0x211)],_0x108667=this['x']+this[_0x504159(0x377)][_0x504159(0x425)],_0x3ad8da=this['y']-this[_0x504159(0x377)]['up'],_0xd32bb4=this['y']+this[_0x504159(0x377)][_0x504159(0x37d)];return _0x111224<=_0x4ca5b1&&_0x4ca5b1<=_0x108667&&_0x3ad8da<=_0x184e61&&_0x184e61<=_0xd32bb4;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x257)]=Game_Event['prototype'][_0x44537c(0x635)],Game_Event['prototype'][_0x44537c(0x635)]=function(_0x2a66d7,_0x38b810,_0x59da82){const _0x3cd699=_0x44537c;for(let _0x395c2a=-this[_0x3cd699(0x377)][_0x3cd699(0x211)];_0x395c2a<=this[_0x3cd699(0x377)][_0x3cd699(0x425)];_0x395c2a++){for(let _0x2bd356=-this[_0x3cd699(0x377)]['up'];_0x2bd356<=this[_0x3cd699(0x377)]['down'];_0x2bd356++){if(!Game_Character['prototype'][_0x3cd699(0x635)][_0x3cd699(0x21e)](this,_0x2a66d7+_0x395c2a,_0x38b810+_0x2bd356,_0x59da82))return![];}}return!![];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x255)]=function(_0x4cbe9e,_0x26669d){const _0x307d25=_0x44537c;if(Imported[_0x307d25(0x5ef)]&&this[_0x307d25(0x2c0)]())return this[_0x307d25(0x689)](_0x4cbe9e,_0x26669d);else{const _0x2e138f=$gameMap['eventsXyNt'](_0x4cbe9e,_0x26669d)[_0x307d25(0x60f)](_0x10d23c=>_0x10d23c!==this);return _0x2e138f[_0x307d25(0x220)]>0x0;}},Game_Event['prototype']['checkSmartEventCollision']=function(_0xd3a9a4,_0x377c5a){const _0x4f0a87=_0x44537c;if(!this['isNormalPriority']())return![];else{const _0x370950=$gameMap[_0x4f0a87(0x465)](_0xd3a9a4,_0x377c5a)[_0x4f0a87(0x60f)](_0x1c69d8=>_0x1c69d8!==this&&_0x1c69d8['isNormalPriority']());return _0x370950[_0x4f0a87(0x220)]>0x0;}},Game_Event[_0x44537c(0x4aa)]['activationProximityType']=function(){const _0x351a61=_0x44537c;if(!this[_0x351a61(0x5ed)])return _0x351a61(0x42d);return this[_0x351a61(0x5ed)][_0x351a61(0x676)]||_0x351a61(0x42d);},Game_Event[_0x44537c(0x4aa)]['activationProximityDistance']=function(){const _0x518498=_0x44537c;if(!this[_0x518498(0x5ed)])return 0x0;return this[_0x518498(0x5ed)][_0x518498(0x2a6)]||0x0;},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x616)]=function(){const _0x4c87d5=_0x44537c;if(!this['_activationProximity'])return[];return this[_0x4c87d5(0x5ed)][_0x4c87d5(0x227)]||[];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x307)]=function(){const _0x20af74=_0x44537c;Game_Character['prototype'][_0x20af74(0x307)][_0x20af74(0x21e)](this);if([_0x20af74(0x42d),_0x20af74(0x5d0)][_0x20af74(0x680)](this[_0x20af74(0x1e4)]()))return;$gamePlayer[_0x20af74(0x61d)]([0x2]);},Game_Event['prototype'][_0x44537c(0x49a)]=function(){const _0x496266=_0x44537c,_0x207d64=Math['round']($gameMap['_displayX']),_0x4a87d9=_0x207d64+Math[_0x496266(0x426)]($gameMap[_0x496266(0x545)]())-0x1,_0x13e82d=Math[_0x496266(0x4c4)]($gameMap[_0x496266(0x29a)]),_0x3d216c=_0x13e82d+Math['ceil']($gameMap[_0x496266(0x665)]())-0x1;return this['x']>=_0x207d64&&this['x']<=_0x4a87d9&&this['y']>=_0x13e82d&&this['y']<=_0x3d216c;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x399)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x5c9)],Game_Event['prototype'][_0x44537c(0x5c9)]=function(){const _0x1c91f7=_0x44537c;if(this[_0x1c91f7(0x4ff)]||this[_0x1c91f7(0x639)]){if(this[_0x1c91f7(0x49a)]()){if(!this[_0x1c91f7(0x370)]){this[_0x1c91f7(0x370)]=!![];if(this['_screenActivation'])this['start']();else this[_0x1c91f7(0x639)]&&(!this[_0x1c91f7(0x6b1)]&&(this[_0x1c91f7(0x6b1)]=new Game_Interpreter()),this[_0x1c91f7(0x6b1)][_0x1c91f7(0x2c8)](this[_0x1c91f7(0x655)](),this['_eventId']));}return;}else{this[_0x1c91f7(0x370)]=![];return;}}if(this[_0x1c91f7(0x57c)]!==0x3)return;if(this[_0x1c91f7(0x3a2)])return;if(!this[_0x1c91f7(0x25c)](![]))return;if(!this[_0x1c91f7(0x228)](![]))return;VisuMZ[_0x1c91f7(0x646)][_0x1c91f7(0x399)][_0x1c91f7(0x21e)](this);},VisuMZ['EventsMoveCore'][_0x44537c(0x4d1)]=Game_Event['prototype']['updateParallel'],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x306)]=function(){const _0x3be05f=_0x44537c;if(!this[_0x3be05f(0x6b1)])return;if(!this[_0x3be05f(0x25c)](!![]))return;if(!this[_0x3be05f(0x228)](!![]))return;if(this[_0x3be05f(0x6b1)]&&!this[_0x3be05f(0x6b1)][_0x3be05f(0x625)]()&&this['_screenParallel']){!this[_0x3be05f(0x436)]&&(this[_0x3be05f(0x370)]=![]);return;}VisuMZ[_0x3be05f(0x646)][_0x3be05f(0x4d1)]['call'](this);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x25c)]=function(_0x33703c){const _0x1e7ac5=_0x44537c;if(!_0x33703c&&$gameMap[_0x1e7ac5(0x296)]())return![];if(!_0x33703c&&$gameMap['isAnyEventStarting']())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x1e7ac5(0x312)](this);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x228)]=function(_0x11b15f){const _0x10e125=_0x44537c;if(!_0x11b15f&&$gameMap[_0x10e125(0x296)]())return![];if(!_0x11b15f&&$gameMap[_0x10e125(0x3ad)]())return![];if([_0x10e125(0x42d),_0x10e125(0x5d0)][_0x10e125(0x680)](this[_0x10e125(0x1e4)]()))return!![];return $gamePlayer[_0x10e125(0x287)](this);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x5e9)]=function(_0x408e2b){const _0x297aec=_0x44537c,_0x1dcd8e=_0x408e2b?this['_encounterHalfProximity']:this[_0x297aec(0x1dc)];return _0x1dcd8e?_0x1dcd8e[_0x297aec(0x676)]:_0x297aec(0x42d);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x677)]=function(_0x4a71b6){const _0x5e5a74=_0x44537c,_0x4d782a=_0x4a71b6?this[_0x5e5a74(0x44f)]:this[_0x5e5a74(0x1dc)];return _0x4d782a?_0x4d782a[_0x5e5a74(0x2a6)]:0x0;},VisuMZ[_0x44537c(0x30e)]=function(_0x34b732){const _0x117445=_0x44537c;for(const _0xb1d80d of $gameMap[_0x117445(0x35c)]()){if(!_0xb1d80d)continue;_0xb1d80d['moveSynchTarget']()===_0x34b732&&_0xb1d80d['updateMoveSynch']();}},VisuMZ[_0x44537c(0x5b2)]=function(_0x5397d0){const _0x2c480f=_0x44537c;if(_0x5397d0===0x0)return $gamePlayer;return $gameMap[_0x2c480f(0x246)](_0x5397d0);},Game_CharacterBase[_0x44537c(0x4aa)]['updateMoveSynchDirection']=function(){},Game_Event['prototype']['updateMoveSynchDirection']=function(){VisuMZ['FaceSynchAllSynchTargets'](this['_eventId']);},VisuMZ[_0x44537c(0x636)]=function(_0x5f309b){const _0x46bb8b=_0x44537c;for(const _0x385319 of $gameMap[_0x46bb8b(0x35c)]()){if(!_0x385319)continue;_0x385319['moveSynchTarget']()===_0x5f309b&&_0x385319['processMoveSynchDirection']();}},Game_Event['prototype'][_0x44537c(0x23e)]=function(){const _0x23820e=_0x44537c;return this[_0x23820e(0x338)][_0x23820e(0x674)];},Game_Event['prototype']['moveSynchType']=function(){const _0x1d3b80=_0x44537c;return this['_moveSynch'][_0x1d3b80(0x676)];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x27d)]=function(){const _0x530413=_0x44537c;if(this[_0x530413(0x23e)]()>=0x0){const _0x39999e=VisuMZ['GetMoveSynchTarget'](this[_0x530413(0x23e)]());if(_0x39999e)return _0x39999e['realMoveSpeed']();}return Game_Character[_0x530413(0x4aa)][_0x530413(0x27d)][_0x530413(0x21e)](this);},Game_Event[_0x44537c(0x4aa)]['updateMoveSynch']=function(){const _0x558724=_0x44537c;this[_0x558724(0x338)][_0x558724(0x3f2)]=this[_0x558724(0x338)][_0x558724(0x3f2)]||0x0,this[_0x558724(0x338)]['timer']--;if(this[_0x558724(0x338)]['timer']>0x0)return;this[_0x558724(0x338)][_0x558724(0x3f2)]=this[_0x558724(0x338)][_0x558724(0x25e)],this['processMoveSynch']();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x570)]=function(_0x27f8cb){const _0x33bcb0=_0x44537c;if(this[_0x33bcb0(0x23e)]()>=0x0){const _0x1f23cd=VisuMZ['GetMoveSynchTarget'](this[_0x33bcb0(0x23e)]());if(_0x1f23cd){const _0x119c78=$gameMap[_0x33bcb0(0x2a6)](this[_0x33bcb0(0x506)],this[_0x33bcb0(0x4ab)],_0x1f23cd[_0x33bcb0(0x506)],_0x1f23cd[_0x33bcb0(0x4ab)])-0x1,_0x301ed0=Math['min']($gameMap[_0x33bcb0(0x587)](),$gameMap['tileHeight']()),_0x4e1cb9=this['_moveSynch'][_0x33bcb0(0x47f)]||0x0;_0x27f8cb-=Math[_0x33bcb0(0x423)](0x0,_0x119c78)*_0x301ed0*_0x4e1cb9;}}return _0x27f8cb;},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x64e)]=function(){const _0x1bca7b=_0x44537c;switch(this[_0x1bca7b(0x668)]()){case _0x1bca7b(0x393):this[_0x1bca7b(0x66e)]();break;case'approach':this[_0x1bca7b(0x404)]();break;case _0x1bca7b(0x65e):this[_0x1bca7b(0x4a7)]();break;case _0x1bca7b(0x1db):this[_0x1bca7b(0x443)]();break;case _0x1bca7b(0x6b8):case'copy':this[_0x1bca7b(0x35f)]();break;case _0x1bca7b(0x331):case _0x1bca7b(0x681):this['processMoveSynchReverseMimic']();break;case'mirror\x20horizontal':case _0x1bca7b(0x36e):case _0x1bca7b(0x352):case _0x1bca7b(0x212):this[_0x1bca7b(0x61c)]();break;case _0x1bca7b(0x2d9):case _0x1bca7b(0x32d):case _0x1bca7b(0x3eb):case _0x1bca7b(0x4ee):this[_0x1bca7b(0x5fe)]();break;default:this[_0x1bca7b(0x66e)]();break;}this[_0x1bca7b(0x613)]();},Game_Event[_0x44537c(0x4aa)]['processMoveSynchRandom']=function(){const _0x24c0a4=_0x44537c,_0x4b7271=[0x2,0x4,0x6,0x8];$gameMap[_0x24c0a4(0x36f)]()&&_0x4b7271['push'](0x1,0x3,0x7,0x9);const _0x2a5238=[];for(const _0x3a53c0 of _0x4b7271){if(this[_0x24c0a4(0x635)](this['x'],this['y'],_0x3a53c0))_0x2a5238['push'](_0x3a53c0);}if(_0x2a5238[_0x24c0a4(0x220)]>0x0){const _0x33b767=_0x2a5238[Math['randomInt'](_0x2a5238[_0x24c0a4(0x220)])];this['executeMoveDir8'](_0x33b767);}},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x404)]=function(){const _0x3f746c=_0x44537c,_0x346ac8=VisuMZ[_0x3f746c(0x5b2)](this[_0x3f746c(0x23e)]());this[_0x3f746c(0x634)](_0x346ac8);},Game_Event['prototype']['processMoveSynchAway']=function(){const _0x68d76e=_0x44537c,_0x2cb268=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x68d76e(0x439)](_0x2cb268);},Game_Event[_0x44537c(0x4aa)]['processMoveSynchCustom']=function(){const _0x52dfcb=_0x44537c;this[_0x52dfcb(0x300)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x35f)]=function(){const _0x102631=_0x44537c,_0x205adf=VisuMZ[_0x102631(0x5b2)](this['moveSynchTarget']());this[_0x102631(0x215)](_0x205adf['lastMovedDirection']());},Game_Event['prototype'][_0x44537c(0x408)]=function(){const _0x42944d=_0x44537c,_0x34619f=VisuMZ['GetMoveSynchTarget'](this[_0x42944d(0x23e)]());this[_0x42944d(0x215)](this[_0x42944d(0x264)](_0x34619f[_0x42944d(0x206)]()));},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x61c)]=function(){const _0x48e1d8=_0x44537c,_0x218f61=VisuMZ['GetMoveSynchTarget'](this[_0x48e1d8(0x23e)]()),_0x1f51de=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x218f61[_0x48e1d8(0x206)]()];this[_0x48e1d8(0x215)](_0x1f51de);},Game_Event[_0x44537c(0x4aa)]['processMoveSynchMirrorVert']=function(){const _0x83b2d0=_0x44537c,_0x4f8646=VisuMZ['GetMoveSynchTarget'](this[_0x83b2d0(0x23e)]()),_0x316043=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4f8646['lastMovedDirection']()];this[_0x83b2d0(0x215)](_0x316043);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x456)]=function(){const _0x269473=_0x44537c,_0x4c1c60=VisuMZ['GetMoveSynchTarget'](this[_0x269473(0x23e)]()),_0x4b6cf5=_0x4c1c60[_0x269473(0x29f)]();switch(this[_0x269473(0x668)]()){case _0x269473(0x6b8):case _0x269473(0x4a3):this[_0x269473(0x325)](_0x4b6cf5);break;case _0x269473(0x331):case'reverse\x20copy':this['setDirection'](this[_0x269473(0x264)](_0x4b6cf5));break;case _0x269473(0x482):case'horizontal\x20mirror':case'mirror\x20horz':case _0x269473(0x212):this[_0x269473(0x325)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x4b6cf5]);break;case'mirror\x20vertical':case _0x269473(0x32d):case _0x269473(0x3eb):case _0x269473(0x4ee):this['setDirection']([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4b6cf5]);break;default:return;}this['update']();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x2b1)]=function(){const _0x157b4b=_0x44537c,_0x1b9583=$gameSystem[_0x157b4b(0x23a)](this);if(!_0x1b9583)return;this[_0x157b4b(0x254)](_0x1b9583['x'],_0x1b9583['y']),this[_0x157b4b(0x614)](),this[_0x157b4b(0x325)](_0x1b9583[_0x157b4b(0x29f)]),this['_pageIndex']===_0x1b9583[_0x157b4b(0x1f4)]&&(this[_0x157b4b(0x4c2)]=_0x1b9583[_0x157b4b(0x345)]);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x537)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x613)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x613)]=function(){const _0x221297=_0x44537c;VisuMZ['EventsMoveCore']['Game_Event_update']['call'](this),!Utils[_0x221297(0x320)]()&&this[_0x221297(0x608)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x611)]=function(){const _0x208d1f=_0x44537c;Game_Character[_0x208d1f(0x4aa)][_0x208d1f(0x611)][_0x208d1f(0x21e)](this),this[_0x208d1f(0x3d8)]();},Game_Event[_0x44537c(0x4aa)]['isSaveEventLocation']=function(){const _0x153d37=_0x44537c;if($gameMap[_0x153d37(0x547)]())return!![];return this[_0x153d37(0x57a)];},Game_Event[_0x44537c(0x4aa)]['autosaveEventLocation']=function(){const _0x2c7409=_0x44537c;if(!this[_0x2c7409(0x22f)]())return;this[_0x2c7409(0x52f)]();},Game_Event['prototype'][_0x44537c(0x52f)]=function(){this['_requestSaveEventLocation']=!![];},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x608)]=function(){const _0x439a1d=_0x44537c;this[_0x439a1d(0x3e4)]&&this[_0x439a1d(0x6b6)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x6b6)]=function(){const _0x310af4=_0x44537c;this[_0x310af4(0x3e4)]=![],$gameSystem[_0x310af4(0x52f)](this);},Game_Event['prototype'][_0x44537c(0x692)]=function(){const _0x3da950=_0x44537c;$gameSystem[_0x3da950(0x38a)](this);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x3f0)]=function(){const _0x449c54=_0x44537c;return $gameSystem[_0x449c54(0x3f0)](this)?Game_Character[_0x449c54(0x4aa)][_0x449c54(0x3f0)]['call'](this):{'iconIndex':0x0,'bufferX':settings[_0x449c54(0x407)][_0x449c54(0x327)],'bufferY':settings[_0x449c54(0x407)][_0x449c54(0x412)],'blendMode':settings[_0x449c54(0x407)][_0x449c54(0x20a)]};},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x457)]=function(){const _0x5e441a=_0x44537c;return this[_0x5e441a(0x52e)];},VisuMZ['EventsMoveCore'][_0x44537c(0x3d5)]=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x3e7)],Game_Event[_0x44537c(0x4aa)][_0x44537c(0x3e7)]=function(_0x1a005f){const _0x5879c6=_0x44537c,_0x52994d=VisuMZ[_0x5879c6(0x646)]['Game_Event_meetsConditionsCPC'][_0x5879c6(0x21e)](this,_0x1a005f);if(!_0x52994d)return![];return this[_0x5879c6(0x437)](_0x1a005f);},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x437)]=function(_0x25652f){const _0x3cd4c9=_0x44537c;VisuMZ['EventsMoveCore'][_0x3cd4c9(0x596)]['loadCPC'](_0x25652f),this[_0x3cd4c9(0x52e)]=_0x25652f[_0x3cd4c9(0x56b)][_0x3cd4c9(0x220)]>0x0;_0x25652f[_0x3cd4c9(0x56b)]===undefined&&VisuMZ['EventsMoveCore'][_0x3cd4c9(0x596)]['loadCPC'](_0x25652f);if(_0x25652f[_0x3cd4c9(0x56b)]['length']>0x0)return $gameMap[_0x3cd4c9(0x246)](this[_0x3cd4c9(0x5c0)])&&VisuMZ[_0x3cd4c9(0x646)]['CustomPageConditions'][_0x3cd4c9(0x471)](_0x25652f['CPC'],this[_0x3cd4c9(0x5c0)]);return!![];},VisuMZ[_0x44537c(0x646)][_0x44537c(0x4db)]=Game_Troop['prototype'][_0x44537c(0x3e7)],Game_Troop['prototype'][_0x44537c(0x3e7)]=function(_0x240010){const _0x521892=_0x44537c;var _0xefc1cc=VisuMZ[_0x521892(0x646)][_0x521892(0x4db)][_0x521892(0x21e)](this,_0x240010);return _0xefc1cc&&this['CPCsMet'](_0x240010);},Game_Troop['prototype'][_0x44537c(0x67d)]=function(_0x18218c){const _0xddd897=_0x44537c;_0x18218c[_0xddd897(0x56b)]===undefined&&VisuMZ[_0xddd897(0x646)][_0xddd897(0x596)]['loadCPC'](_0x18218c);if(_0x18218c[_0xddd897(0x56b)][_0xddd897(0x220)]>0x0)return VisuMZ[_0xddd897(0x646)][_0xddd897(0x596)]['metCPC'](_0x18218c[_0xddd897(0x56b)],0x0);return!![];},VisuMZ[_0x44537c(0x646)]['Game_Event_locate']=Game_Event[_0x44537c(0x4aa)][_0x44537c(0x335)],Game_Event['prototype'][_0x44537c(0x335)]=function(_0x505520,_0x3fbb27){const _0x152e82=_0x44537c;if(this['_checkRelocateNotetag']){const _0x5e741a=this['event']()[_0x152e82(0x670)]||'';if(_0x5e741a[_0x152e82(0x276)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x1c6215=String(RegExp['$1'])[_0x152e82(0x1e5)](',')['map'](_0x461223=>Number(_0x461223));_0x505520+=Number(_0x1c6215[0x0]||0x0)||0x0,_0x3fbb27+=Number(_0x1c6215[0x1]||0x0)||0x0;}_0x5e741a[_0x152e82(0x276)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x505520+=Number(RegExp['$1'])),_0x5e741a[_0x152e82(0x276)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x3fbb27+=Number(RegExp['$1']));}VisuMZ[_0x152e82(0x646)][_0x152e82(0x4d8)]['call'](this,_0x505520,_0x3fbb27),this[_0x152e82(0x658)]=_0x505520,this[_0x152e82(0x647)]=_0x3fbb27,this[_0x152e82(0x3d8)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x30a)]=Game_Event['prototype'][_0x44537c(0x62a)],Game_Event['prototype'][_0x44537c(0x62a)]=function(){const _0x611266=_0x44537c,_0x5d78f0=$gameMap[_0x611266(0x2a6)](this['x'],this['y'],this[_0x611266(0x658)],this['_randomHomeY']),_0x42bcb2=_0x5d78f0*(this[_0x611266(0x427)]||0x0);Math[_0x611266(0x393)]()>=_0x42bcb2?VisuMZ[_0x611266(0x646)][_0x611266(0x30a)][_0x611266(0x21e)](this):this[_0x611266(0x22c)]();},Game_Event[_0x44537c(0x4aa)][_0x44537c(0x22c)]=function(){const _0x15c3be=_0x44537c,_0x1c69b8=this[_0x15c3be(0x314)](this[_0x15c3be(0x658)]),_0x3c4444=this['deltaYFrom'](this[_0x15c3be(0x647)]);if(Math[_0x15c3be(0x316)](_0x1c69b8)>Math[_0x15c3be(0x316)](_0x3c4444))this[_0x15c3be(0x41a)](_0x1c69b8>0x0?0x4:0x6),!this[_0x15c3be(0x239)]()&&_0x3c4444!==0x0&&this[_0x15c3be(0x41a)](_0x3c4444>0x0?0x8:0x2);else _0x3c4444!==0x0&&(this[_0x15c3be(0x41a)](_0x3c4444>0x0?0x8:0x2),!this[_0x15c3be(0x239)]()&&_0x1c69b8!==0x0&&this[_0x15c3be(0x41a)](_0x1c69b8>0x0?0x4:0x6));},Game_CharacterBase[_0x44537c(0x4aa)]['clearAttachPictureSettings']=function(){const _0x3fe7d1=_0x44537c;this['_attachPicture']={'filename':'','type':_0x3fe7d1(0x46a),'blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x609)]=function(){const _0x528650=_0x44537c;if(this[_0x528650(0x4cc)]===undefined)this[_0x528650(0x585)]();return this[_0x528650(0x4cc)];},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x3af)]=function(){const _0x25a234=_0x44537c;return this[_0x25a234(0x609)]()['filename']??'';},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x434)]=function(){const _0xf8bd16=_0x44537c;return this[_0xf8bd16(0x609)]()['picture']??_0xf8bd16(0x46a);},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x282)]=function(){return this['attachPictureSettings']()['blendMode']??0x0;},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x448)]=function(){const _0x2ebd32=_0x44537c;return this[_0x2ebd32(0x609)]()[_0x2ebd32(0x690)]??0x0;},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x455)]=function(){const _0x12e3ed=_0x44537c;return this[_0x12e3ed(0x609)]()[_0x12e3ed(0x5bf)]??0x0;},Game_CharacterBase[_0x44537c(0x4aa)][_0x44537c(0x39a)]=function(){const _0x354388=_0x44537c;return this['attachPictureSettings']()[_0x354388(0x3d2)]??0x0;},Game_CharacterBase['prototype'][_0x44537c(0x55c)]=function(){const _0x3f51df=_0x44537c;return this[_0x3f51df(0x609)]()['scale']??0x1;},VisuMZ['EventsMoveCore']['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x3ef)],Game_Interpreter[_0x44537c(0x4aa)]['updateWaitMode']=function(){const _0x152c37=_0x44537c;if(this['_waitMode']===_0x152c37(0x3d7)){if(window[this[_0x152c37(0x663)]])this['_waitMode']='',this['startCallEvent']();else return!![];}else return VisuMZ['EventsMoveCore'][_0x152c37(0x6bf)][_0x152c37(0x21e)](this);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x1f1)]=Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x64d)],Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x64d)]=function(){const _0x3d6909=_0x44537c,_0x1e7b40=$gameMap&&this['_eventId']?$gameMap['event'](this[_0x3d6909(0x5c0)]):null;$gameTemp[_0x3d6909(0x450)](_0x1e7b40);const _0x3174ba=VisuMZ[_0x3d6909(0x646)]['Game_Interpreter_executeCommand'][_0x3d6909(0x21e)](this);return $gameTemp[_0x3d6909(0x651)](),_0x3174ba;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x34e)]=Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x35a)],Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x35a)]=function(_0x8618a2){const _0x24af47=_0x44537c;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x24af47(0x646)][_0x24af47(0x34e)][_0x24af47(0x21e)](this,_0x8618a2);},Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x60e)]=function(_0x5b0e35){const _0x3faa5d=_0x44537c;this['_callEventData']=_0x5b0e35;const _0x31ff1b=_0x3faa5d(0x364)[_0x3faa5d(0x48f)](_0x5b0e35[_0x3faa5d(0x4e7)][_0x3faa5d(0x644)](0x3));this[_0x3faa5d(0x663)]=_0x3faa5d(0x3d0)+Graphics[_0x3faa5d(0x5c4)]+'_'+this[_0x3faa5d(0x4c8)](),DataManager[_0x3faa5d(0x3e1)](this[_0x3faa5d(0x663)],_0x31ff1b),window[this['_callEventMap']]?this[_0x3faa5d(0x280)]():this['setWaitMode']('CallEvent');},Game_Interpreter[_0x44537c(0x4aa)][_0x44537c(0x280)]=function(){const _0x414ecd=_0x44537c,_0x10d361=this['_callEventData'],_0x583bd2=window[this[_0x414ecd(0x663)]],_0x20e123=_0x583bd2[_0x414ecd(0x35c)][_0x10d361[_0x414ecd(0x4c8)]];if(_0x20e123&&_0x20e123[_0x414ecd(0x598)][_0x10d361[_0x414ecd(0x34a)]-0x1]){const _0x3da527=_0x20e123[_0x414ecd(0x598)][_0x10d361[_0x414ecd(0x34a)]-0x1]['list'];this['setupChild'](_0x3da527,this[_0x414ecd(0x4c8)]());}window[this[_0x414ecd(0x663)]]=undefined,this['_callEventMap']=undefined,this[_0x414ecd(0x684)]=undefined;};function Game_CPCInterpreter(){const _0x24bdf8=_0x44537c;this[_0x24bdf8(0x459)][_0x24bdf8(0x496)](this,arguments);};Game_CPCInterpreter[_0x44537c(0x4aa)]=Object[_0x44537c(0x340)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x44537c(0x4aa)][_0x44537c(0x69e)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x44537c(0x386)]=function(){const _0x5b4af6=_0x44537c;Game_Interpreter[_0x5b4af6(0x4aa)][_0x5b4af6(0x386)][_0x5b4af6(0x21e)](this),this[_0x5b4af6(0x29c)]=![];},Game_CPCInterpreter[_0x44537c(0x4aa)][_0x44537c(0x2d8)]=function(){const _0x12be05=_0x44537c;while(this[_0x12be05(0x625)]()){this[_0x12be05(0x64d)]();}},Game_CPCInterpreter['prototype'][_0x44537c(0x4ca)]=function(_0x2bea78){const _0x130e68=_0x44537c;while(this[_0x130e68(0x625)]()){this['executeCommandCommonEvent'](_0x2bea78);}},Game_CPCInterpreter[_0x44537c(0x4aa)]['executeCommandCommonEvent']=function(_0x32d899){const _0x49c262=_0x44537c,_0x4f0fcd=_0x32d899;$gameTemp[_0x49c262(0x450)](_0x4f0fcd);const _0x37121a=VisuMZ[_0x49c262(0x646)][_0x49c262(0x1f1)][_0x49c262(0x21e)](this);return $gameTemp[_0x49c262(0x651)](),_0x37121a;},Game_CPCInterpreter[_0x44537c(0x4aa)][_0x44537c(0x68f)]=function(_0x358be3){const _0x517bee=_0x44537c;return Game_Interpreter['prototype']['command108']['call'](this,_0x358be3),this[_0x517bee(0x579)][_0x517bee(0x410)](_0x2b3b00=>_0x2b3b00[_0x517bee(0x276)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ[_0x44537c(0x646)]['Scene_Map_startEncounterEffect']=Scene_Map[_0x44537c(0x4aa)][_0x44537c(0x6b0)],Scene_Map[_0x44537c(0x4aa)][_0x44537c(0x6b0)]=function(){const _0x27920a=_0x44537c;VisuMZ['EventsMoveCore'][_0x27920a(0x291)][_0x27920a(0x21e)](this),this[_0x27920a(0x40c)][_0x27920a(0x573)]();},VisuMZ['EventsMoveCore'][_0x44537c(0x5f3)]=Scene_Load[_0x44537c(0x4aa)][_0x44537c(0x36b)],Scene_Load['prototype']['onLoadSuccess']=function(){const _0x152874=_0x44537c;if($gameMap)$gameMap[_0x152874(0x346)]();VisuMZ[_0x152874(0x646)][_0x152874(0x5f3)]['call'](this);},VisuMZ['EventsMoveCore'][_0x44537c(0x43a)]=Game_System[_0x44537c(0x4aa)][_0x44537c(0x37a)],Game_System[_0x44537c(0x4aa)]['onAfterLoad']=function(){const _0x4f3185=_0x44537c;VisuMZ['EventsMoveCore'][_0x4f3185(0x43a)][_0x4f3185(0x21e)](this);if($gameMap)$gameMap[_0x4f3185(0x346)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x277)]=Sprite_Character[_0x44537c(0x4aa)]['initMembers'],Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x313)]=function(){const _0x337d40=_0x44537c;VisuMZ[_0x337d40(0x646)][_0x337d40(0x277)][_0x337d40(0x21e)](this),this[_0x337d40(0x403)](),this[_0x337d40(0x341)](),this['createIconSprite']();},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x403)]=function(){const _0x2182e7=_0x44537c;this[_0x2182e7(0x488)]=0xff,this['_isCharacterSpriteSheetInvisible']=![];},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x4b5)]=function(){const _0x258d4b=_0x44537c;return this[_0x258d4b(0x3ce)]&&this['_characterName'][_0x258d4b(0x276)](/\[VS8\]/i);},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x6a1)]=function(){const _0x51dc96=_0x44537c;return this[_0x51dc96(0x4b5)]()&&VisuMZ[_0x51dc96(0x646)][_0x51dc96(0x633)][_0x51dc96(0x298)][_0x51dc96(0x23d)];},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x341)]=function(){const _0x26b991=_0x44537c;this[_0x26b991(0x3b5)]=new Sprite(),this[_0x26b991(0x3b5)]['anchor']['x']=0.5,this[_0x26b991(0x3b5)][_0x26b991(0x235)]['y']=0x1,this['addChild'](this['_attachPictureSprite']),this[_0x26b991(0x4bf)]();},Sprite_Character['prototype'][_0x44537c(0x237)]=function(){const _0x607db5=_0x44537c;this[_0x607db5(0x531)]=new Sprite(),this[_0x607db5(0x531)][_0x607db5(0x688)]=ImageManager[_0x607db5(0x4bb)](_0x607db5(0x275)),this[_0x607db5(0x531)]['bitmap'][_0x607db5(0x32f)]=![],this[_0x607db5(0x531)][_0x607db5(0x671)](0x0,0x0,0x0,0x0),this[_0x607db5(0x531)][_0x607db5(0x235)]['x']=0.5,this[_0x607db5(0x531)][_0x607db5(0x235)]['y']=0x1,this[_0x607db5(0x449)](this['_eventIconSprite']);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x641)]=Sprite_Character['prototype'][_0x44537c(0x613)],Sprite_Character[_0x44537c(0x4aa)]['update']=function(){const _0x2ea2e0=_0x44537c;VisuMZ[_0x2ea2e0(0x646)][_0x2ea2e0(0x641)][_0x2ea2e0(0x21e)](this),this[_0x2ea2e0(0x311)]();},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x6af)]=function(){const _0x5b4ad1=_0x44537c;Sprite[_0x5b4ad1(0x4aa)][_0x5b4ad1(0x6af)][_0x5b4ad1(0x21e)](this),this[_0x5b4ad1(0x44b)]()&&(this['visible']=![]);},Sprite_Character[_0x44537c(0x4aa)]['isEventsMoveCoreInvisible']=function(){const _0x2072e5=_0x44537c;if(this[_0x2072e5(0x4f8)]()>0x0)return![];if(this[_0x2072e5(0x656)]){if(this[_0x2072e5(0x656)][_0x2072e5(0x3af)]()!=='')return![];}return this[_0x2072e5(0x286)]()||this['_character']&&this[_0x2072e5(0x656)][_0x2072e5(0x321)]();},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x38e)]=function(){const _0x2f3c57=_0x44537c;if(!this[_0x2f3c57(0x688)])return;this['bitmap'][_0x2f3c57(0x32f)]=!!VisuMZ['EventsMoveCore'][_0x2f3c57(0x633)][_0x2f3c57(0x60d)][_0x2f3c57(0x678)];},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x311)]=function(){const _0x3a7dea=_0x44537c;this['updateScaleBase'](),this['updateTilt'](),this[_0x3a7dea(0x21a)](),this[_0x3a7dea(0x2d7)](),this[_0x3a7dea(0x5f6)](),this[_0x3a7dea(0x3cd)](),this[_0x3a7dea(0x4bf)]();},VisuMZ[_0x44537c(0x646)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x2fe)],Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x2fe)]=function(){const _0x49177b=_0x44537c;VisuMZ[_0x49177b(0x646)][_0x49177b(0x6b7)]['call'](this),this['bitmap']['addLoadListener'](this['updateBitmapSmoothing']['bind'](this));},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x45c)]=function(){const _0x493faa=_0x44537c,_0x46d8b2=this[_0x493faa(0x358)],_0x57ca52=this[_0x493faa(0x22b)](),_0x508a4c=this['patternHeight'](),_0x1de8d9=(Math[_0x493faa(0x249)](_0x46d8b2/0x80)%0x2*0x8+_0x46d8b2%0x8)*_0x57ca52,_0x5dfe9e=Math['floor'](_0x46d8b2%0x100/0x8)%0x10*_0x508a4c,_0x2e24ea=this['getTileExpandData']();let _0x46e1fc=_0x1de8d9,_0x44a245=_0x5dfe9e,_0x629be6=_0x57ca52,_0xa0c02e=_0x508a4c;_0x2e24ea['up']&&_0x2e24ea['up']>0x0&&(_0x44a245-=_0x508a4c*_0x2e24ea['up'],_0xa0c02e+=_0x508a4c*_0x2e24ea['up']),_0x2e24ea[_0x493faa(0x37d)]&&_0x2e24ea['down']>0x0&&(_0xa0c02e+=_0x508a4c*_0x2e24ea[_0x493faa(0x37d)]),_0x2e24ea[_0x493faa(0x211)]&&_0x2e24ea[_0x493faa(0x211)]>0x0&&(_0x46e1fc-=_0x57ca52*_0x2e24ea[_0x493faa(0x211)],_0x629be6+=_0x57ca52*_0x2e24ea[_0x493faa(0x211)]),_0x2e24ea[_0x493faa(0x425)]&&_0x2e24ea[_0x493faa(0x425)]>0x0&&(_0x629be6+=_0x57ca52*_0x2e24ea[_0x493faa(0x425)]),this['setFrame'](_0x46e1fc,_0x44a245,_0x629be6,_0xa0c02e);},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x2ea)]=function(){const _0x541d6b=_0x44537c;return this[_0x541d6b(0x656)]?this['_character'][_0x541d6b(0x233)]||{}:{};},VisuMZ[_0x44537c(0x646)][_0x44537c(0x1e1)]=Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x576)],Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x576)]=function(){const _0x4f32d2=_0x44537c;VisuMZ['EventsMoveCore'][_0x4f32d2(0x1e1)][_0x4f32d2(0x21e)](this),this[_0x4f32d2(0x688)][_0x4f32d2(0x577)](this[_0x4f32d2(0x38e)][_0x4f32d2(0x657)](this)),this[_0x4f32d2(0x3fe)]=ImageManager[_0x4f32d2(0x429)](this[_0x4f32d2(0x3ce)]),this[_0x4f32d2(0x3fe)]&&this[_0x4f32d2(0x688)][_0x4f32d2(0x577)](this[_0x4f32d2(0x4ad)]['bind'](this));},Sprite_Character[_0x44537c(0x4aa)]['setCharacterSpriteSheetInvisible']=function(){const _0x21100a=_0x44537c;this[_0x21100a(0x688)]=new Bitmap(this[_0x21100a(0x688)][_0x21100a(0x682)],this[_0x21100a(0x688)][_0x21100a(0x23b)]);},VisuMZ['EventsMoveCore'][_0x44537c(0x600)]=Sprite_Character[_0x44537c(0x4aa)]['characterPatternY'],Sprite_Character[_0x44537c(0x4aa)]['characterPatternY']=function(){const _0x95c90d=_0x44537c;return this[_0x95c90d(0x4b5)]()?this[_0x95c90d(0x302)]():this[_0x95c90d(0x41c)]();},Sprite_Character[_0x44537c(0x4aa)]['characterPatternYVS8']=function(){const _0x228819=_0x44537c,_0x242af4=this[_0x228819(0x656)][_0x228819(0x29f)]();let _0x4f96b9=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x228819(0x656)][_0x228819(0x26f)]&&(_0x4f96b9=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x4f96b9[_0x242af4]-0x2)/0x2;},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x41c)]=function(){const _0x1faa5d=_0x44537c;let _0x5876fd=this[_0x1faa5d(0x656)]['direction']();if(this[_0x1faa5d(0x656)][_0x1faa5d(0x26f)]){if(_0x5876fd===0x4)_0x5876fd=0x6;else _0x5876fd===0x6&&(_0x5876fd=0x4);}return(_0x5876fd-0x2)/0x2;},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x2b2)]=function(){const _0x2f129d=_0x44537c;this[_0x2f129d(0x4df)]['x']=this[_0x2f129d(0x656)][_0x2f129d(0x685)]??0x1,this['scale']['y']=this[_0x2f129d(0x656)][_0x2f129d(0x45b)]??0x1;},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x208)]=function(){const _0x191002=_0x44537c;if(!VisuMZ[_0x191002(0x646)][_0x191002(0x633)][_0x191002(0x60d)][_0x191002(0x504)])return;this['rotation']=0x0;if(this[_0x191002(0x378)]()){const _0x4aa2fb=VisuMZ[_0x191002(0x646)]['Settings'][_0x191002(0x60d)],_0x1a12c=this[_0x191002(0x656)][_0x191002(0x29f)]();let _0x57d2ce=0x0;if([0x1,0x4,0x7][_0x191002(0x680)](_0x1a12c))_0x57d2ce=_0x4aa2fb['TiltLeft'];if([0x3,0x6,0x9][_0x191002(0x680)](_0x1a12c))_0x57d2ce=_0x4aa2fb[_0x191002(0x371)];[0x2,0x8]['includes'](_0x1a12c)&&(_0x57d2ce=[-_0x4aa2fb[_0x191002(0x236)],0x0,_0x4aa2fb[_0x191002(0x236)]][this[_0x191002(0x656)][_0x191002(0x54a)]()]);if(this[_0x191002(0x2d3)])_0x57d2ce*=-0x1;this[_0x191002(0x38d)]=_0x57d2ce;}},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x378)]=function(){const _0x32d3ed=_0x44537c;if(this['_dragonbones'])return![];return this['_character'][_0x32d3ed(0x62e)]()&&!this[_0x32d3ed(0x656)][_0x32d3ed(0x36a)]()&&!this[_0x32d3ed(0x656)]['isPosing']()&&this[_0x32d3ed(0x4f8)]()===0x0;},Sprite_Character[_0x44537c(0x4aa)]['updateShadow']=function(){const _0x1fd1be=_0x44537c;if(!this[_0x1fd1be(0x492)])return;this[_0x1fd1be(0x492)]['x']=this['_character']['shadowX'](),this[_0x1fd1be(0x492)]['y']=this[_0x1fd1be(0x656)][_0x1fd1be(0x348)](),this[_0x1fd1be(0x492)]['opacity']=this[_0x1fd1be(0x3b1)],this[_0x1fd1be(0x492)]['visible']=this[_0x1fd1be(0x656)]['isShadowVisible'](),this[_0x1fd1be(0x492)][_0x1fd1be(0x2ff)]=this[_0x1fd1be(0x2ff)];if(this['_character'][_0x1fd1be(0x5ca)]())this['_shadowSprite'][_0x1fd1be(0x4df)]['x']=Math[_0x1fd1be(0x423)](0x0,this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']-0.1),this['_shadowSprite'][_0x1fd1be(0x4df)]['y']=Math['max'](0x0,this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']-0.1);else{if(this['_shadowSprite'][_0x1fd1be(0x4df)]['x']!==this[_0x1fd1be(0x4df)]['x']){if(this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']>this[_0x1fd1be(0x4df)]['x'])this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']=Math[_0x1fd1be(0x367)](this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']+0.1,this[_0x1fd1be(0x4df)]['x']);if(this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']<this[_0x1fd1be(0x4df)]['x'])this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['x']=Math[_0x1fd1be(0x423)](this['_shadowSprite'][_0x1fd1be(0x4df)]['x']-0.1,this[_0x1fd1be(0x4df)]['x']);}if(this[_0x1fd1be(0x492)]['scale']['y']!==this[_0x1fd1be(0x4df)]['y']){if(this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']>this[_0x1fd1be(0x4df)]['y'])this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']=Math['min'](this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']+0.1,this[_0x1fd1be(0x4df)]['y']);if(this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']<this[_0x1fd1be(0x4df)]['y'])this[_0x1fd1be(0x492)][_0x1fd1be(0x4df)]['y']=Math['max'](this['_shadowSprite'][_0x1fd1be(0x4df)]['y']-0.1,this[_0x1fd1be(0x4df)]['y']);}}},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x2d7)]=function(){const _0x32a27e=_0x44537c;if(!this[_0x32a27e(0x531)])return;const _0x3e4a5e=this[_0x32a27e(0x531)],_0x50d6fe=this['getEventIconIndex']();if(_0x50d6fe<=0x0)return _0x3e4a5e[_0x32a27e(0x671)](0x0,0x0,0x0,0x0);else{const _0x21fd25=ImageManager['iconWidth'],_0x271470=ImageManager[_0x32a27e(0x446)],_0x38ad75=_0x50d6fe%0x10*_0x21fd25,_0x33464a=Math[_0x32a27e(0x249)](_0x50d6fe/0x10)*_0x271470;_0x3e4a5e[_0x32a27e(0x671)](_0x38ad75,_0x33464a,_0x21fd25,_0x271470),this[_0x32a27e(0x481)]=!![];}const _0x300571=this[_0x32a27e(0x656)][_0x32a27e(0x3f0)]();this[_0x32a27e(0x6a1)]()?this[_0x32a27e(0x65d)](_0x3e4a5e):(_0x3e4a5e['x']=_0x300571?_0x300571[_0x32a27e(0x693)]:0x0,_0x3e4a5e['y']=_0x300571?-this['height']+_0x300571['bufferY']:0x0),_0x3e4a5e[_0x32a27e(0x592)]=_0x300571?_0x300571[_0x32a27e(0x592)]:0x0,this['removeChild'](_0x3e4a5e),this['addChild'](_0x3e4a5e),_0x3e4a5e['rotation']=-this[_0x32a27e(0x38d)];},Sprite_Character[_0x44537c(0x4aa)]['autoEventIconBuffer']=function(_0x50f93d){const _0x3080ac=_0x44537c;_0x50f93d['x']=0x0,_0x50f93d['y']=-this[_0x3080ac(0x23b)]+this[_0x3080ac(0x23b)]*0x2/0x5,this[_0x3080ac(0x656)][_0x3080ac(0x54a)]()!==0x1&&(_0x50f93d['y']+=0x1);},Sprite_Character['prototype']['getEventIconIndex']=function(){const _0x2b8afe=_0x44537c;if(!this[_0x2b8afe(0x656)])return 0x0;if(this[_0x2b8afe(0x656)][_0x2b8afe(0x40a)])return 0x0;const _0x48b2bc=this[_0x2b8afe(0x656)][_0x2b8afe(0x3f0)]();return _0x48b2bc?_0x48b2bc[_0x2b8afe(0x5e0)]||0x0:0x0;},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x5f6)]=function(){const _0x3b9826=_0x44537c;if(!this[_0x3b9826(0x656)])return;if(this[_0x3b9826(0x656)]['_customZ']===undefined)return;if(this[_0x3b9826(0x656)][_0x3b9826(0x2ba)]===![])return;this['z']=this[_0x3b9826(0x656)][_0x3b9826(0x2ba)],this[_0x3b9826(0x492)]&&(this['z']<0x0?this[_0x3b9826(0x492)]['z']=this['z']-0x1:this[_0x3b9826(0x492)]['z']=0x0);},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x3cd)]=function(){const _0x2b445e=_0x44537c;if(!this['_character'])return;let _0x10d839=!!this[_0x2b445e(0x656)][_0x2b445e(0x26f)];this[_0x2b445e(0x4df)]['x']=Math['abs'](this[_0x2b445e(0x4df)]['x'])*(_0x10d839?-0x1:0x1);},Sprite_Character[_0x44537c(0x4aa)]['updateAttachPictureSprite']=function(){const _0x5e8380=_0x44537c;if(!this[_0x5e8380(0x3b5)])return;if(!this[_0x5e8380(0x656)])return;this['setupAttachPictureBitmap'](),this[_0x5e8380(0x5a9)]();},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x5b9)]=function(){const _0x35fed5=_0x44537c;if(!this[_0x35fed5(0x56e)]())return;const _0x32a146=this[_0x35fed5(0x656)][_0x35fed5(0x609)]();this[_0x35fed5(0x339)]=_0x32a146['filename'],this[_0x35fed5(0x292)]=_0x32a146[_0x35fed5(0x676)],this[_0x35fed5(0x54d)]=_0x32a146['maxSize'],this[_0x35fed5(0x1fe)]=_0x32a146[_0x35fed5(0x4df)];if(_0x32a146['filename']!==''){if(_0x32a146[_0x35fed5(0x676)]===_0x35fed5(0x466)){const _0x25b5e2=ImageManager[_0x35fed5(0x5fa)](_0x32a146[_0x35fed5(0x552)]);_0x25b5e2[_0x35fed5(0x577)](this['onLoadAttachPicture'][_0x35fed5(0x657)](this,_0x25b5e2));}else{if(_0x32a146[_0x35fed5(0x676)]==='sv\x20enemy'){const _0x1d7260=ImageManager[_0x35fed5(0x5af)](_0x32a146[_0x35fed5(0x552)]);_0x1d7260[_0x35fed5(0x577)](this['onLoadAttachPicture']['bind'](this,_0x1d7260));}else{const _0x29973f=ImageManager[_0x35fed5(0x662)](_0x32a146[_0x35fed5(0x552)]);_0x29973f['addLoadListener'](this['onLoadAttachPicture'][_0x35fed5(0x657)](this,_0x29973f));}}}else this[_0x35fed5(0x3b5)][_0x35fed5(0x688)]=new Bitmap(0x1,0x1);},Sprite_Character['prototype'][_0x44537c(0x5a9)]=function(){const _0x3d57b8=_0x44537c,_0xca95ee=this[_0x3d57b8(0x3b5)];_0xca95ee['x']=this['_character'][_0x3d57b8(0x455)](),_0xca95ee['y']=this[_0x3d57b8(0x656)][_0x3d57b8(0x39a)](),_0xca95ee[_0x3d57b8(0x592)]=this['_character'][_0x3d57b8(0x282)]();},Sprite_Character[_0x44537c(0x4aa)]['needsAttachPictureUpdate']=function(){const _0x2a161f=_0x44537c,_0x2b167d=this['_character'][_0x2a161f(0x609)]();if(_0x2b167d){if(this['_lastAttachPictureFilename']!==_0x2b167d['filename'])return!![];if(this[_0x2a161f(0x292)]!==_0x2b167d[_0x2a161f(0x676)])return!![];if(this[_0x2a161f(0x54d)]!==_0x2b167d['maxSize'])return!![];if(this['_lastAttachPictureScale']!==_0x2b167d[_0x2a161f(0x4df)])return!![];}return![];},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x473)]=function(_0x27cedb){const _0x4356ca=_0x44537c,_0x5a6288=this[_0x4356ca(0x3b5)];_0x5a6288[_0x4356ca(0x688)]=_0x27cedb;const _0xe3f4a5=this[_0x4356ca(0x656)]['attachPictureSettings'](),_0x556359=_0xe3f4a5[_0x4356ca(0x690)],_0x3fb03d=_0xe3f4a5[_0x4356ca(0x4df)];let _0x1f7770=0x1;if(_0x556359>0x0){let _0x512edc=this['getAttachPictureBitmapWidth']()||0x1,_0x4ed293=this[_0x4356ca(0x447)]()||0x1;const _0x366534=Math[_0x4356ca(0x423)](0x1,_0x512edc,_0x4ed293);_0x1f7770=_0x556359/_0x366534;}_0x1f7770*=_0x3fb03d,_0x1f7770!==0x1&&(this[_0x4356ca(0x3b5)][_0x4356ca(0x688)]['smooth']=!![]),_0x5a6288['scale']['x']=_0x1f7770,_0x5a6288[_0x4356ca(0x4df)]['y']=_0x1f7770,this['visible']=!![],this['updateAttachPictureBitmap']();},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x505)]=function(){const _0x2c35d6=_0x44537c,_0xfbefd2=this[_0x2c35d6(0x3b5)];if(!_0xfbefd2)return 0x0;return _0xfbefd2[_0x2c35d6(0x688)][_0x2c35d6(0x682)];},Sprite_Character[_0x44537c(0x4aa)][_0x44537c(0x447)]=function(){const _0x47a80e=_0x44537c,_0x1e4827=this[_0x47a80e(0x3b5)];if(!_0x1e4827)return 0x0;return _0x1e4827['bitmap'][_0x47a80e(0x23b)];},VisuMZ['EventsMoveCore'][_0x44537c(0x532)]=Sprite_Balloon[_0x44537c(0x4aa)][_0x44537c(0x2c8)],Sprite_Balloon[_0x44537c(0x4aa)][_0x44537c(0x2c8)]=function(_0x2b093e,_0x38ccda){const _0x30ebfc=_0x44537c;VisuMZ['EventsMoveCore']['Sprite_Balloon_setup'][_0x30ebfc(0x21e)](this,_0x2b093e,_0x38ccda),VisuMZ[_0x30ebfc(0x646)][_0x30ebfc(0x633)][_0x30ebfc(0x298)][_0x30ebfc(0x649)]&&this['_target'][_0x30ebfc(0x656)]['setBalloonPose'](_0x38ccda,this['_duration']);},VisuMZ['EventsMoveCore'][_0x44537c(0x1d6)]=Sprite_Balloon[_0x44537c(0x4aa)][_0x44537c(0x2e4)],Sprite_Balloon[_0x44537c(0x4aa)][_0x44537c(0x2e4)]=function(){const _0x46173e=_0x44537c;VisuMZ['EventsMoveCore']['Sprite_Balloon_updatePosition'][_0x46173e(0x21e)](this),this[_0x46173e(0x363)]();},Sprite_Balloon[_0x44537c(0x4aa)][_0x44537c(0x363)]=function(){const _0x591934=_0x44537c;this[_0x591934(0x3ff)][_0x591934(0x656)]['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x591934(0x646)][_0x591934(0x633)][_0x591934(0x298)][_0x591934(0x2c9)],this['y']+=VisuMZ[_0x591934(0x646)][_0x591934(0x633)][_0x591934(0x298)]['BalloonOffsetY']);},Sprite_Timer[_0x44537c(0x4aa)][_0x44537c(0x6a4)]=function(){const _0x300372=_0x44537c;this[_0x300372(0x688)]=new Bitmap(Math[_0x300372(0x4c4)](Graphics[_0x300372(0x4fa)]/0x2),0x30),this[_0x300372(0x688)]['fontFace']=this[_0x300372(0x5cf)](),this['bitmap'][_0x300372(0x385)]=this[_0x300372(0x385)](),this[_0x300372(0x688)]['outlineColor']=ColorManager[_0x300372(0x2d1)]();},Sprite_Timer[_0x44537c(0x4aa)][_0x44537c(0x45a)]=function(){const _0x331361=_0x44537c,_0x35616c=Math[_0x331361(0x249)](this[_0x331361(0x5b6)]/0x3c/0x3c),_0x4b6025=Math[_0x331361(0x249)](this[_0x331361(0x5b6)]/0x3c)%0x3c,_0x247162=this[_0x331361(0x5b6)]%0x3c;let _0x329d38=_0x4b6025[_0x331361(0x644)](0x2)+':'+_0x247162[_0x331361(0x644)](0x2);if(_0x35616c>0x0)_0x329d38=_0x331361(0x2f9)[_0x331361(0x48f)](_0x35616c,_0x329d38);return _0x329d38;};function Sprite_EventLabel(){const _0xab98f2=_0x44537c;this[_0xab98f2(0x459)](...arguments);}function _0x41af(_0x962b19,_0xb4ed36){const _0x47f156=_0x47f1();return _0x41af=function(_0x41af23,_0x1cdf00){_0x41af23=_0x41af23-0x1d5;let _0x59e447=_0x47f156[_0x41af23];return _0x59e447;},_0x41af(_0x962b19,_0xb4ed36);}Sprite_EventLabel[_0x44537c(0x4aa)]=Object[_0x44537c(0x340)](Sprite[_0x44537c(0x4aa)]),Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x69e)]=Sprite_EventLabel,Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(_0x4b19bc){const _0xbc7d6a=_0x44537c;this[_0xbc7d6a(0x318)]=_0x4b19bc,Sprite['prototype'][_0xbc7d6a(0x459)][_0xbc7d6a(0x21e)](this),this[_0xbc7d6a(0x313)](),this['createProxyWindow']();},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x313)]=function(){const _0x30dd10=_0x44537c;this[_0x30dd10(0x235)]['x']=0.5,this[_0x30dd10(0x235)]['y']=0x1;},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x3d3)]=function(){const _0x45e86b=_0x44537c,_0x58a5e1=new Rectangle(0x0,0x0,0x1,0x1);this['_proxyWindow']=new Window_Base(_0x58a5e1),this[_0x45e86b(0x37c)]['padding']=0x0,this[_0x45e86b(0x3b1)]=this['isLabelVisible']()?0xff:0x0;},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x613)]=function(){const _0x4e386e=_0x44537c;Sprite['prototype']['update'][_0x4e386e(0x21e)](this),this[_0x4e386e(0x696)](),this[_0x4e386e(0x3b2)](),this['updatePosition'](),this[_0x4e386e(0x414)](),this[_0x4e386e(0x6a5)]();},Sprite_EventLabel[_0x44537c(0x4aa)]['updateText']=function(){const _0x1f32ea=_0x44537c;this['_event'][_0x1f32ea(0x489)]()!==this[_0x1f32ea(0x60c)]&&(this['_text']=this[_0x1f32ea(0x318)][_0x1f32ea(0x489)](),this['refresh']());},Sprite_EventLabel[_0x44537c(0x4aa)]['refresh']=function(){const _0x177c1f=_0x44537c;if(!this['_proxyWindow'])return;this[_0x177c1f(0x207)](),this[_0x177c1f(0x5bd)]();},Sprite_EventLabel[_0x44537c(0x4aa)]['resizeWindow']=function(){const _0x2bc5c8=_0x44537c,_0x5cbbb7=this['_proxyWindow'][_0x2bc5c8(0x6ba)](this[_0x2bc5c8(0x60c)]),_0x279206=this[_0x2bc5c8(0x37c)][_0x2bc5c8(0x390)](),_0x26eb0e=_0x5cbbb7[_0x2bc5c8(0x682)]+_0x279206*0x2,_0x259900=_0x5cbbb7[_0x2bc5c8(0x23b)];this[_0x2bc5c8(0x37c)][_0x2bc5c8(0x344)](0x0,0x0,_0x26eb0e,_0x259900),this[_0x2bc5c8(0x37c)]['createContents'](),this['bitmap']=this[_0x2bc5c8(0x37c)][_0x2bc5c8(0x5df)];},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x5bd)]=function(){const _0x358289=_0x44537c,_0x5e338e=this[_0x358289(0x37c)][_0x358289(0x390)]();this['_proxyWindow'][_0x358289(0x28f)](this[_0x358289(0x60c)],_0x5e338e,0x0);},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x3b2)]=function(){const _0x128acb=_0x44537c,_0x324f32=VisuMZ[_0x128acb(0x646)][_0x128acb(0x633)][_0x128acb(0x463)][_0x128acb(0x64a)],_0x24b893=$gameSystem[_0x128acb(0x2e9)]()||0x1;this[_0x128acb(0x4df)]['x']=this['scale']['y']=_0x324f32/_0x24b893;},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x2e4)]=function(){const _0x2417a4=_0x44537c;if(!SceneManager[_0x2417a4(0x5e7)])return;if(!SceneManager[_0x2417a4(0x5e7)]['_spriteset'])return;const _0xce3095=SceneManager[_0x2417a4(0x5e7)][_0x2417a4(0x40c)][_0x2417a4(0x5c5)](this['_event']);if(!_0xce3095)return;this['x']=this['_event'][_0x2417a4(0x588)](),this['x']+=this[_0x2417a4(0x318)][_0x2417a4(0x381)][_0x2417a4(0x5bf)];if(_0xce3095[_0x2417a4(0x339)]){const _0x374bb6=_0xce3095[_0x2417a4(0x3b5)];this['y']=this[_0x2417a4(0x318)][_0x2417a4(0x6a0)]()-_0x374bb6[_0x2417a4(0x23b)]*_0x374bb6['scale']['y'];}else this['y']=this[_0x2417a4(0x318)][_0x2417a4(0x6a0)]()-_0xce3095[_0x2417a4(0x23b)]*_0xce3095[_0x2417a4(0x4df)]['y'];this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x2417a4(0x318)][_0x2417a4(0x381)][_0x2417a4(0x3d2)];},Sprite_EventLabel['prototype'][_0x44537c(0x414)]=function(){const _0x4e8987=_0x44537c;if(this[_0x4e8987(0x528)]())this['opacity']+=this[_0x4e8987(0x3ed)]();else SceneManager[_0x4e8987(0x5e7)][_0x4e8987(0x5aa)]>0x0?this[_0x4e8987(0x3b1)]=0x0:this[_0x4e8987(0x3b1)]-=this[_0x4e8987(0x3ed)]();},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x6a5)]=function(){const _0x5b9924=_0x44537c;if(this[_0x5b9924(0x528)]()&&this[_0x5b9924(0x318)]&&this['_event'][_0x5b9924(0x381)]['hueShift']){const _0x4ab70c=this[_0x5b9924(0x24b)]+(this[_0x5b9924(0x318)][_0x5b9924(0x381)][_0x5b9924(0x610)]||0x0);this['setHue'](_0x4ab70c);}},Sprite_EventLabel[_0x44537c(0x4aa)]['isLabelVisible']=function(){const _0xb4a73c=_0x44537c;if(!$gameSystem[_0xb4a73c(0x5b3)]())return![];if(this[_0xb4a73c(0x318)]?.['_erased'])return![];if(this[_0xb4a73c(0x318)]&&this[_0xb4a73c(0x318)][_0xb4a73c(0x6a6)]<0x0)return![];if(SceneManager['_scene'][_0xb4a73c(0x5aa)]>0x0)return![];const _0x2274fb=$gamePlayer['x'],_0x191781=$gamePlayer['y'],_0x5a8637=this[_0xb4a73c(0x318)]['x'],_0x49c0a8=this['_event']['y'];if(this['_visiblePlayerX']===_0x2274fb&&this['_visiblePlayerY']===_0x191781&&this['_visibleEventX']===_0x5a8637&&this['_visibleEventY']===_0x49c0a8)return this['_cacheVisibility'];this['_visiblePlayerX']=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0xb4a73c(0x397)]=this[_0xb4a73c(0x318)]['x'],this[_0xb4a73c(0x33a)]=this[_0xb4a73c(0x318)]['y'];if(!VisuMZ[_0xb4a73c(0x646)][_0xb4a73c(0x5ab)](this[_0xb4a73c(0x318)]))return this[_0xb4a73c(0x3a4)]=![],![];return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x3ed)]=function(){const _0x19dec8=_0x44537c;return VisuMZ[_0x19dec8(0x646)][_0x19dec8(0x633)][_0x19dec8(0x463)][_0x19dec8(0x253)];};function Sprite_VisuMz_MessagePopup(){this['initialize'](...arguments);}Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)]=Object[_0x44537c(0x340)](Sprite[_0x44537c(0x4aa)]),Sprite_VisuMz_MessagePopup['prototype']['constructor']=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(_0x47b5f6){const _0x7b6c9f=_0x44537c;this['_settings']=_0x47b5f6,Sprite['prototype'][_0x7b6c9f(0x459)]['call'](this),this[_0x7b6c9f(0x313)](),this[_0x7b6c9f(0x223)](),this[_0x7b6c9f(0x58d)](),this[_0x7b6c9f(0x613)]();},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x313)]=function(){const _0x5232b1=_0x44537c;this['_duration']=this[_0x5232b1(0x43c)][_0x5232b1(0x3b4)],this['_wholeDuration']=this[_0x5232b1(0x43c)]['duration'],this['z']=0x6,this[_0x5232b1(0x389)]=this['_settings']['fadeDuration'][_0x5232b1(0x697)],this[_0x5232b1(0x389)]>0x0&&this['_fadeInDuration']>=Math[_0x5232b1(0x249)](this[_0x5232b1(0x5cc)]*0.48)&&(this[_0x5232b1(0x389)]=Math[_0x5232b1(0x249)](this[_0x5232b1(0x5cc)]*0.48)),this[_0x5232b1(0x3b1)]=this[_0x5232b1(0x389)]>0x0?0x0:0xff,this['_fadeOutDuration']=this[_0x5232b1(0x43c)][_0x5232b1(0x54f)]['fadeOut'],this[_0x5232b1(0x499)]>0x0&&this['_fadeOutDuration']>=Math[_0x5232b1(0x249)](this[_0x5232b1(0x5cc)]*0.48)&&(this[_0x5232b1(0x499)]=Math[_0x5232b1(0x249)](this['_duration']*0.48)),this[_0x5232b1(0x259)]=this['_fadeOutDuration'],this[_0x5232b1(0x440)]=this[_0x5232b1(0x43c)][_0x5232b1(0x416)]['x'],this['_startY']=this['_settings'][_0x5232b1(0x416)]['y'],this[_0x5232b1(0x43f)]=this[_0x5232b1(0x43c)]['endOffset']['x'],this[_0x5232b1(0x553)]=this[_0x5232b1(0x43c)][_0x5232b1(0x49c)]['y'],this[_0x5232b1(0x430)]=this[_0x5232b1(0x440)],this[_0x5232b1(0x589)]=this['_startY'],this[_0x5232b1(0x24c)]=this[_0x5232b1(0x43c)]['startScale']['x'],this[_0x5232b1(0x4d2)]=this['_settings']['startScale']['y'],this[_0x5232b1(0x3b9)]=this[_0x5232b1(0x43c)][_0x5232b1(0x54b)]['x'],this[_0x5232b1(0x20e)]=this['_settings'][_0x5232b1(0x54b)]['y'],this[_0x5232b1(0x6a8)]=-this[_0x5232b1(0x43c)][_0x5232b1(0x401)][_0x5232b1(0x273)],this[_0x5232b1(0x3df)]=-this['_settings'][_0x5232b1(0x401)][_0x5232b1(0x5f2)],this[_0x5232b1(0x283)]=-this[_0x5232b1(0x43c)][_0x5232b1(0x4b6)][_0x5232b1(0x5e1)],this['_currentArc']=0x0;},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x223)]=function(){const _0x565159=_0x44537c,_0x377a97=this[_0x565159(0x43c)],_0x2e6a7f=new Rectangle(0x0,0x0,Graphics[_0x565159(0x682)],Graphics[_0x565159(0x23b)]);this[_0x565159(0x398)]=new Window_Base(_0x2e6a7f);const _0x416406=this[_0x565159(0x398)][_0x565159(0x6ba)](_0x377a97['text']),_0x3b6584=_0x416406[_0x565159(0x682)],_0x3b8281=_0x416406[_0x565159(0x23b)],_0x54cf04=_0x3b6584+$gameSystem['windowPadding']()*0x2,_0x1451db=_0x3b8281+$gameSystem[_0x565159(0x1f6)]()*0x2;this[_0x565159(0x398)][_0x565159(0x344)](0x0,0x0,_0x54cf04,_0x1451db),this[_0x565159(0x398)][_0x565159(0x284)](),this['_dummyWindow'][_0x565159(0x28f)](_0x377a97[_0x565159(0x61a)],0x0,0x0);},Sprite_VisuMz_MessagePopup['prototype'][_0x44537c(0x58d)]=function(){const _0x4280f7=_0x44537c;this[_0x4280f7(0x45f)]=new Sprite(),this[_0x4280f7(0x45f)][_0x4280f7(0x688)]=this[_0x4280f7(0x398)][_0x4280f7(0x5df)],this[_0x4280f7(0x45f)][_0x4280f7(0x235)]['x']=0.5,this[_0x4280f7(0x45f)][_0x4280f7(0x235)]['y']=0.5,this[_0x4280f7(0x45f)]['x']=this[_0x4280f7(0x440)],this['_textSprite']['y']=this[_0x4280f7(0x351)],this[_0x4280f7(0x45f)][_0x4280f7(0x4df)]['x']=this[_0x4280f7(0x24c)],this[_0x4280f7(0x45f)]['scale']['y']=this[_0x4280f7(0x4d2)],this[_0x4280f7(0x45f)]['angle']=this[_0x4280f7(0x6a8)],this['addChild'](this[_0x4280f7(0x45f)]);},Sprite_VisuMz_MessagePopup['prototype'][_0x44537c(0x613)]=function(){const _0xf838e1=_0x44537c;Sprite['prototype'][_0xf838e1(0x613)][_0xf838e1(0x21e)](this);if(!this[_0xf838e1(0x2f0)]())return;this[_0xf838e1(0x421)](),this[_0xf838e1(0x6a9)](),this[_0xf838e1(0x419)](),this['updateTextAngle'](),this[_0xf838e1(0x414)](),this[_0xf838e1(0x29b)]();},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x2f0)]=function(){return!!this['_textSprite'];},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x421)]=function(){const _0x2b83c4=_0x44537c,_0x34024d=this[_0x2b83c4(0x43c)];{const _0x40fa82=$gameMap[_0x2b83c4(0x587)](),_0x5a5f99=_0x34024d[_0x2b83c4(0x43e)]['x'],_0x362b48=$gameMap[_0x2b83c4(0x69c)](_0x5a5f99);this['x']=Math[_0x2b83c4(0x249)](_0x362b48*_0x40fa82+_0x40fa82/0x2);}{const _0x4a58ee=$gameMap[_0x2b83c4(0x535)](),_0xd75a04=_0x34024d['tileCoordinates']['y'],_0x2e3325=$gameMap[_0x2b83c4(0x512)](_0xd75a04);this['y']=Math['floor'](_0x2e3325*_0x4a58ee+_0x4a58ee);}},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x6a9)]=function(){const _0x378f38=_0x44537c;if(this[_0x378f38(0x5cc)]<=0x0)return;const _0x141367=this[_0x378f38(0x5cc)],_0x3eead0=this['_wholeDuration'];{this['_offsetX']=(this['_offsetX']*(_0x141367-0x1)+this[_0x378f38(0x43f)])/_0x141367,this['_offsetY']=(this[_0x378f38(0x589)]*(_0x141367-0x1)+this[_0x378f38(0x553)])/_0x141367;}{const _0x49dbd5=_0x3eead0-_0x141367,_0x5c4295=_0x3eead0/0x2,_0x11d935=this['_arcPeak'],_0x5543b8=-_0x11d935/Math[_0x378f38(0x5f9)](_0x5c4295,0x2);this[_0x378f38(0x40e)]=_0x5543b8*Math['pow'](_0x49dbd5-_0x5c4295,0x2)+_0x11d935;}this[_0x378f38(0x45f)]['x']=this[_0x378f38(0x430)],this[_0x378f38(0x45f)]['y']=this[_0x378f38(0x589)]+this['_currentArc'];},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)]['updateTextScale']=function(){const _0x307044=_0x44537c;if(this[_0x307044(0x5cc)]<=0x0)return;const _0x92e280=this[_0x307044(0x5cc)];this[_0x307044(0x45f)][_0x307044(0x4df)]['x']=(this['_textSprite'][_0x307044(0x4df)]['x']*(_0x92e280-0x1)+this[_0x307044(0x3b9)])/_0x92e280,this['_textSprite'][_0x307044(0x4df)]['y']=(this[_0x307044(0x45f)][_0x307044(0x4df)]['y']*(_0x92e280-0x1)+this[_0x307044(0x20e)])/_0x92e280;},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)]['updateTextAngle']=function(){const _0x14abee=_0x44537c;if(this[_0x14abee(0x5cc)]<=0x0)return;const _0x22f019=this[_0x14abee(0x5cc)];this[_0x14abee(0x45f)][_0x14abee(0x401)]=(this[_0x14abee(0x45f)][_0x14abee(0x401)]*(_0x22f019-0x1)+this[_0x14abee(0x3df)])/_0x22f019;},Sprite_VisuMz_MessagePopup['prototype'][_0x44537c(0x414)]=function(){const _0x1e012b=_0x44537c;this[_0x1e012b(0x5ba)](),this[_0x1e012b(0x45e)]();},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x5ba)]=function(){const _0x35afb5=_0x44537c;if(this[_0x35afb5(0x389)]<=0x0)return;const _0x4108bf=this['_fadeInDuration'];this[_0x35afb5(0x3b1)]=(this[_0x35afb5(0x3b1)]*(_0x4108bf-0x1)+0xff)/_0x4108bf,this[_0x35afb5(0x389)]--,this[_0x35afb5(0x389)]<=0x0&&(this[_0x35afb5(0x3b1)]=0xff);},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)]['updateFadeOut']=function(){const _0xfaba01=_0x44537c;if(this[_0xfaba01(0x499)]<=0x0)return;if(this[_0xfaba01(0x5cc)]>this[_0xfaba01(0x259)])return;const _0x31e1b6=this[_0xfaba01(0x499)];this[_0xfaba01(0x3b1)]=(this[_0xfaba01(0x3b1)]*(_0x31e1b6-0x1)+0x0)/_0x31e1b6,this[_0xfaba01(0x499)]--,this[_0xfaba01(0x499)]<=0x0&&(this[_0xfaba01(0x3b1)]=0x0);},Sprite_VisuMz_MessagePopup[_0x44537c(0x4aa)][_0x44537c(0x29b)]=function(){const _0x3257f6=_0x44537c;if(this[_0x3257f6(0x5cc)]<=0x0)return;this[_0x3257f6(0x5cc)]--;if(this[_0x3257f6(0x5cc)]<=0x0){if(this[_0x3257f6(0x5e2)])this['parent'][_0x3257f6(0x606)](this);this[_0x3257f6(0x45f)]['bitmap']&&this[_0x3257f6(0x45f)]['bitmap'][_0x3257f6(0x6ad)]();}},VisuMZ[_0x44537c(0x646)][_0x44537c(0x373)]=Spriteset_Map['prototype'][_0x44537c(0x555)],Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x555)]=function(){const _0x371f27=_0x44537c;VisuMZ['EventsMoveCore'][_0x371f27(0x373)][_0x371f27(0x21e)](this),this['createLabelWindows']();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x2be)]=Spriteset_Map['prototype'][_0x44537c(0x27c)],Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x27c)]=function(){const _0x18aaa8=_0x44537c;VisuMZ[_0x18aaa8(0x646)][_0x18aaa8(0x2be)][_0x18aaa8(0x21e)](this),this[_0x18aaa8(0x518)]();},Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x518)]=function(){const _0x490314=_0x44537c;if(!VisuMZ[_0x490314(0x646)][_0x490314(0x633)][_0x490314(0x60d)][_0x490314(0x1e2)])return;for(const _0x694854 of this[_0x490314(0x55f)]){this[_0x490314(0x2b4)](_0x694854);}},Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x2b4)]=function(_0x2163f6){const _0x225e83=_0x44537c;_0x2163f6['_shadowSprite']=new Sprite(),_0x2163f6['_shadowSprite']['_filename']=_0x2163f6[_0x225e83(0x656)][_0x225e83(0x491)](),_0x2163f6[_0x225e83(0x492)][_0x225e83(0x688)]=ImageManager[_0x225e83(0x4bb)](_0x2163f6['_shadowSprite'][_0x225e83(0x2f7)]),_0x2163f6[_0x225e83(0x492)][_0x225e83(0x235)]['x']=0.5,_0x2163f6[_0x225e83(0x492)]['anchor']['y']=0x1;const _0xe72e10=VisuMZ[_0x225e83(0x646)][_0x225e83(0x633)][_0x225e83(0x60d)][_0x225e83(0x569)]??0.5;_0x2163f6[_0x225e83(0x492)]['z']=_0xe72e10,this[_0x225e83(0x607)][_0x225e83(0x449)](_0x2163f6[_0x225e83(0x492)]);},Spriteset_Map['prototype']['hideShadows']=function(){const _0xe25934=_0x44537c;if(!VisuMZ['EventsMoveCore'][_0xe25934(0x633)][_0xe25934(0x60d)][_0xe25934(0x1e2)])return;for(const _0xc1ce31 of this['_characterSprites']){this[_0xe25934(0x607)][_0xe25934(0x606)](_0xc1ce31[_0xe25934(0x492)]);}},Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x4ce)]=function(){const _0xdc2621=_0x44537c;this[_0xdc2621(0x556)]=[];for(const _0x48125a of $gameMap[_0xdc2621(0x35c)]()){this[_0xdc2621(0x559)](_0x48125a);}},Spriteset_Map[_0x44537c(0x5b8)]=VisuMZ[_0x44537c(0x646)][_0x44537c(0x633)]['Label'][_0x44537c(0x342)]??!![],Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x559)]=function(_0x4d6f9d){const _0x2d18bd=_0x44537c;if(!this[_0x2d18bd(0x260)](_0x4d6f9d))return;if(Utils[_0x2d18bd(0x320)]()){if(!Spriteset_Map[_0x2d18bd(0x5b8)])return;}let _0x21735c;const _0x3a015d=VisuMZ[_0x2d18bd(0x646)][_0x2d18bd(0x633)][_0x2d18bd(0x463)][_0x2d18bd(0x586)]??!![];_0x21735c=_0x3a015d?new Sprite_EventLabel(_0x4d6f9d):new Window_EventLabel(_0x4d6f9d),_0x21735c['z']=0x8,_0x21735c[_0x2d18bd(0x27b)]=Sprite[_0x2d18bd(0x293)]++,this[_0x2d18bd(0x607)]['addChild'](_0x21735c),this[_0x2d18bd(0x556)]['push'](_0x21735c);},Spriteset_Map['prototype'][_0x44537c(0x260)]=function(_0x2b7a5d){const _0x4aec42=_0x44537c,_0x1d0efe=_0x2b7a5d['event']();if(_0x1d0efe[_0x4aec42(0x670)][_0x4aec42(0x276)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1d0efe[_0x4aec42(0x670)][_0x4aec42(0x276)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x4c7e7a of _0x1d0efe['pages']){let _0x2c2963='';for(const _0x2b66fd of _0x4c7e7a[_0x4aec42(0x655)]){[0x6c,0x198][_0x4aec42(0x680)](_0x2b66fd[_0x4aec42(0x5a4)])&&(_0x2c2963+=_0x2b66fd[_0x4aec42(0x420)][0x0]);}if(_0x2c2963[_0x4aec42(0x276)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x2c2963[_0x4aec42(0x276)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x44537c(0x4aa)]['createSpawnedEvent']=function(_0x4c09b8){const _0x3dbd0e=_0x44537c;this[_0x3dbd0e(0x55f)]=this['_characterSprites']||[];const _0x24b34d=new Sprite_Character(_0x4c09b8);this['_characterSprites']['push'](_0x24b34d),this[_0x3dbd0e(0x607)]['addChild'](_0x24b34d),this[_0x3dbd0e(0x2b4)](_0x24b34d),this[_0x3dbd0e(0x559)](_0x4c09b8),_0x24b34d[_0x3dbd0e(0x613)](),_0x4c09b8['resetPattern'](),_0x24b34d[_0x3dbd0e(0x2bb)]();},Spriteset_Map['prototype'][_0x44537c(0x583)]=function(){const _0x58cb0b=_0x44537c;if(!this[_0x58cb0b(0x556)])return;for(const _0x178b3d of this[_0x58cb0b(0x556)]){_0x178b3d&&(_0x178b3d[_0x58cb0b(0x22e)]=undefined,_0x178b3d[_0x58cb0b(0x406)]());}},Spriteset_Map[_0x44537c(0x4aa)][_0x44537c(0x4a0)]=function(_0x1d2597,_0x37b307){const _0x19cdf1=_0x44537c;if(!_0x1d2597)return;_0x37b307[_0x19cdf1(0x43e)]={'x':_0x1d2597['x'],'y':_0x1d2597['y']},this[_0x19cdf1(0x5f0)](_0x37b307);},Spriteset_Map['prototype']['createEventsMoveCoreTileMessagePopup']=function(_0x420557){if(!this['_tilemap'])return;const _0x271933=new Sprite_VisuMz_MessagePopup(_0x420557);this['_tilemap']['addChild'](_0x271933);},VisuMZ['EventsMoveCore'][_0x44537c(0x666)]=Game_Message[_0x44537c(0x4aa)][_0x44537c(0x660)],Game_Message[_0x44537c(0x4aa)][_0x44537c(0x660)]=function(_0x51926c,_0x29b906){const _0x3399ac=_0x44537c;this['_selfTargetNumberInput']=$gameTemp['getSelfTarget'](),VisuMZ[_0x3399ac(0x646)][_0x3399ac(0x666)][_0x3399ac(0x21e)](this,_0x51926c,_0x29b906);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x2cb)]=Window_NumberInput[_0x44537c(0x4aa)][_0x44537c(0x273)],Window_NumberInput[_0x44537c(0x4aa)]['start']=function(){const _0x2d3a07=_0x44537c;$gameTemp['registerSelfTarget']($gameMessage[_0x2d3a07(0x539)]),VisuMZ[_0x2d3a07(0x646)][_0x2d3a07(0x2cb)]['call'](this),$gameTemp[_0x2d3a07(0x651)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x566)]=Window_NumberInput[_0x44537c(0x4aa)][_0x44537c(0x2a1)],Window_NumberInput['prototype'][_0x44537c(0x2a1)]=function(){const _0x36f797=_0x44537c;$gameTemp[_0x36f797(0x450)]($gameMessage['_selfTargetNumberInput']),VisuMZ['EventsMoveCore'][_0x36f797(0x566)]['call'](this),$gameTemp[_0x36f797(0x651)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x44537c(0x646)][_0x44537c(0x452)]=Game_Message[_0x44537c(0x4aa)][_0x44537c(0x53e)],Game_Message['prototype'][_0x44537c(0x53e)]=function(_0x1e0504,_0x4fbe4e){const _0x2eff2a=_0x44537c;this[_0x2eff2a(0x2e6)]=$gameTemp[_0x2eff2a(0x48e)](),VisuMZ[_0x2eff2a(0x646)][_0x2eff2a(0x452)]['call'](this,_0x1e0504,_0x4fbe4e);},VisuMZ[_0x44537c(0x646)][_0x44537c(0x68c)]=Window_EventItem[_0x44537c(0x4aa)][_0x44537c(0x4f1)],Window_EventItem[_0x44537c(0x4aa)][_0x44537c(0x4f1)]=function(){const _0x3ab61d=_0x44537c;$gameTemp[_0x3ab61d(0x450)]($gameMessage[_0x3ab61d(0x2e6)]),VisuMZ[_0x3ab61d(0x646)]['Window_EventItem_onOk']['call'](this),$gameTemp[_0x3ab61d(0x651)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x44537c(0x646)]['Window_EventItem_onCancel']=Window_EventItem[_0x44537c(0x4aa)]['onCancel'],Window_EventItem[_0x44537c(0x4aa)][_0x44537c(0x39e)]=function(){const _0x209131=_0x44537c;$gameTemp[_0x209131(0x450)]($gameMessage[_0x209131(0x2e6)]),VisuMZ[_0x209131(0x646)][_0x209131(0x686)][_0x209131(0x21e)](this),$gameTemp[_0x209131(0x651)](),$gameMessage[_0x209131(0x2e6)]=undefined;},VisuMZ['EventsMoveCore'][_0x44537c(0x240)]=Window_Message['prototype'][_0x44537c(0x1fd)],Window_Message[_0x44537c(0x4aa)][_0x44537c(0x1fd)]=function(){const _0x13dd03=_0x44537c;$gameMessage[_0x13dd03(0x23f)](),VisuMZ[_0x13dd03(0x646)][_0x13dd03(0x240)][_0x13dd03(0x21e)](this),$gameTemp[_0x13dd03(0x651)]();},VisuMZ[_0x44537c(0x646)][_0x44537c(0x232)]=Window_ScrollText[_0x44537c(0x4aa)][_0x44537c(0x1fd)],Window_ScrollText[_0x44537c(0x4aa)]['startMessage']=function(){const _0x3c0c07=_0x44537c;$gameMessage[_0x3c0c07(0x23f)](),VisuMZ[_0x3c0c07(0x646)]['Window_ScrollText_startMessage']['call'](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x1b4533=_0x44537c;this[_0x1b4533(0x459)](...arguments);}Window_EventLabel[_0x44537c(0x4aa)]=Object['create'](Window_Base[_0x44537c(0x4aa)]),Window_EventLabel[_0x44537c(0x4aa)]['constructor']=Window_EventLabel,Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x459)]=function(_0x2b7266){const _0x1e37db=_0x44537c;this[_0x1e37db(0x318)]=_0x2b7266;const _0x8dcd74=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this['fittingHeight'](0x1));this[_0x1e37db(0x313)](),Window_Base[_0x1e37db(0x4aa)][_0x1e37db(0x459)]['call'](this,_0x8dcd74),this[_0x1e37db(0x2b0)]=0x0,this[_0x1e37db(0x33e)](0x2),this[_0x1e37db(0x60c)]='';},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x313)]=function(){const _0x3f63b7=_0x44537c;this[_0x3f63b7(0x4e2)]=![],this['_screenZoomScale']=$gameScreen[_0x3f63b7(0x2f2)](),this[_0x3f63b7(0x251)]=this['_event'][_0x3f63b7(0x588)](),this[_0x3f63b7(0x250)]=this[_0x3f63b7(0x318)][_0x3f63b7(0x6a0)](),this['_eventLabelOffsetX']=this[_0x3f63b7(0x318)][_0x3f63b7(0x381)]['offsetX'],this[_0x3f63b7(0x6bd)]=this['_event'][_0x3f63b7(0x381)][_0x3f63b7(0x3d2)],this[_0x3f63b7(0x474)]=this['_event'][_0x3f63b7(0x6a6)],this[_0x3f63b7(0x3a4)]=this[_0x3f63b7(0x528)](),this[_0x3f63b7(0x274)]=$gameSystem['eventLabelsVisible'](),this[_0x3f63b7(0x22e)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x3f63b7(0x397)]=this[_0x3f63b7(0x318)]['x'],this[_0x3f63b7(0x33a)]=this['_event']['y'];},Window_EventLabel[_0x44537c(0x4aa)]['update']=function(){const _0x4c9ad8=_0x44537c;Window_Base[_0x4c9ad8(0x4aa)][_0x4c9ad8(0x613)][_0x4c9ad8(0x21e)](this);if(!this[_0x4c9ad8(0x511)]())return;this[_0x4c9ad8(0x696)](),this[_0x4c9ad8(0x3b2)](),this['updatePosition'](),this[_0x4c9ad8(0x414)]();},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x511)]=function(){const _0x33d05b=_0x44537c;if(!this[_0x33d05b(0x318)])return![];if(!this[_0x33d05b(0x318)]['_labelWindow'])return![];if(this[_0x33d05b(0x474)]!==this[_0x33d05b(0x318)]['_pageIndex'])return!![];if(this['_event']['_erased']&&!this[_0x33d05b(0x4e2)])return!![];if(this[_0x33d05b(0x318)]['_labelWindow'][_0x33d05b(0x61a)]==='')return![];if(this[_0x33d05b(0x591)]!==$gameScreen['zoomScale']())return!![];if(this[_0x33d05b(0x251)]!==this[_0x33d05b(0x318)]['screenX']())return!![];if(this[_0x33d05b(0x250)]!==this[_0x33d05b(0x318)][_0x33d05b(0x6a0)]())return!![];if(this[_0x33d05b(0x52b)]!==this['_event'][_0x33d05b(0x381)]['offsetX'])return!![];if(this[_0x33d05b(0x6bd)]!==this[_0x33d05b(0x318)][_0x33d05b(0x381)][_0x33d05b(0x3d2)])return!![];if(this[_0x33d05b(0x22e)]!==$gamePlayer['x'])return!![];if(this[_0x33d05b(0x4d4)]!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x33d05b(0x318)]['x'])return!![];if(this['_visibleEventY']!==this[_0x33d05b(0x318)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x33d05b(0x3a4)]&&this[_0x33d05b(0x2b0)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x33d05b(0x2b0)]>0x0)return!![];if(SceneManager[_0x33d05b(0x5e7)][_0x33d05b(0x5aa)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x44537c(0x696)]=function(){const _0x5bf8b2=_0x44537c;this['_event'][_0x5bf8b2(0x489)]()!==this[_0x5bf8b2(0x60c)]&&(this[_0x5bf8b2(0x60c)]=this[_0x5bf8b2(0x318)][_0x5bf8b2(0x489)](),this['refresh']());},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x3b2)]=function(){const _0x307a1f=_0x44537c;this['scale']['x']=0x1/$gameScreen[_0x307a1f(0x2f2)](),this[_0x307a1f(0x4df)]['y']=0x1/$gameScreen[_0x307a1f(0x2f2)](),this[_0x307a1f(0x591)]=$gameScreen[_0x307a1f(0x2f2)]();},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x2e4)]=function(){const _0x34a859=_0x44537c;if(!SceneManager[_0x34a859(0x5e7)])return;if(!SceneManager[_0x34a859(0x5e7)]['_spriteset'])return;const _0x5083ba=SceneManager[_0x34a859(0x5e7)]['_spriteset'][_0x34a859(0x5c5)](this[_0x34a859(0x318)]);if(!_0x5083ba)return;this['x']=Math[_0x34a859(0x4c4)](this['_event']['screenX']()-Math[_0x34a859(0x249)](this[_0x34a859(0x682)]*this['scale']['x']/0x2)),this['x']+=this['_event'][_0x34a859(0x381)][_0x34a859(0x5bf)],this['y']=this[_0x34a859(0x318)][_0x34a859(0x6a0)]()-_0x5083ba[_0x34a859(0x23b)],this['y']+=Math['round']($gameSystem[_0x34a859(0x1f6)]()*0.5),this['y']-=Math[_0x34a859(0x4c4)](this[_0x34a859(0x23b)]*this[_0x34a859(0x4df)]['y']),this['y']+=this['_event']['_labelWindow'][_0x34a859(0x3d2)],this[_0x34a859(0x4e2)]=this[_0x34a859(0x318)]['_erased'],this[_0x34a859(0x251)]=this[_0x34a859(0x318)]['screenX'](),this['_eventScreenY']=this[_0x34a859(0x318)][_0x34a859(0x6a0)](),this[_0x34a859(0x52b)]=this[_0x34a859(0x318)][_0x34a859(0x381)][_0x34a859(0x5bf)],this['_eventLabelOffsetY']=this[_0x34a859(0x318)]['_labelWindow'][_0x34a859(0x3d2)],this[_0x34a859(0x474)]=this[_0x34a859(0x318)]['_pageIndex'],this[_0x34a859(0x4e2)]&&(this[_0x34a859(0x2b0)]=0x0);},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x414)]=function(){const _0x28511e=_0x44537c;if(this['isLabelVisible']())this[_0x28511e(0x2b0)]+=this[_0x28511e(0x3ed)]();else SceneManager['_scene'][_0x28511e(0x5aa)]>0x0?this[_0x28511e(0x2b0)]=0x0:this[_0x28511e(0x2b0)]-=this['opacitySpeed']();},Window_EventLabel[_0x44537c(0x4aa)]['isLabelVisible']=function(){const _0x388891=_0x44537c;if(!$gameSystem[_0x388891(0x5b3)]())return![];if(this[_0x388891(0x318)]?.['_erased'])return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x2193d3=$gamePlayer['x'],_0xcbaf7f=$gamePlayer['y'],_0x31f2b1=this[_0x388891(0x318)]['x'],_0x339cab=this['_event']['y'];if(this[_0x388891(0x22e)]===_0x2193d3&&this[_0x388891(0x4d4)]===_0xcbaf7f&&this[_0x388891(0x397)]===_0x31f2b1&&this['_visibleEventY']===_0x339cab)return this[_0x388891(0x3a4)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x388891(0x4d4)]=$gamePlayer['y'],this[_0x388891(0x397)]=this[_0x388891(0x318)]['x'],this['_visibleEventY']=this[_0x388891(0x318)]['y'];if(!VisuMZ['EventsMoveCore'][_0x388891(0x5ab)](this[_0x388891(0x318)]))return this[_0x388891(0x3a4)]=![],![];return this[_0x388891(0x3a4)]=!![],!![];},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x3ed)]=function(){const _0x3cca40=_0x44537c;return VisuMZ[_0x3cca40(0x646)][_0x3cca40(0x633)][_0x3cca40(0x463)][_0x3cca40(0x253)];},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x207)]=function(){const _0x39f4b7=_0x44537c,_0x3d0bf4=this[_0x39f4b7(0x6ba)](this[_0x39f4b7(0x60c)]);this[_0x39f4b7(0x682)]=_0x3d0bf4[_0x39f4b7(0x682)]+($gameSystem[_0x39f4b7(0x1f6)]()+this[_0x39f4b7(0x390)]())*0x2,this[_0x39f4b7(0x23b)]=Math[_0x39f4b7(0x423)](this[_0x39f4b7(0x2b6)](),_0x3d0bf4[_0x39f4b7(0x23b)])+$gameSystem[_0x39f4b7(0x1f6)]()*0x2,this[_0x39f4b7(0x284)]();},Window_EventLabel[_0x44537c(0x4aa)]['lineHeight']=function(){const _0x46238f=_0x44537c;return VisuMZ[_0x46238f(0x646)]['Settings']['Label']['LineHeight'];},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x2cd)]=function(){const _0x449255=_0x44537c;Window_Base[_0x449255(0x4aa)][_0x449255(0x2cd)][_0x449255(0x21e)](this),this['contents'][_0x449255(0x385)]=this[_0x449255(0x1e7)]();},Window_EventLabel['prototype']['defaultFontSize']=function(){const _0x2cbbd5=_0x44537c;return VisuMZ[_0x2cbbd5(0x646)][_0x2cbbd5(0x633)][_0x2cbbd5(0x463)][_0x2cbbd5(0x64a)];},Window_EventLabel[_0x44537c(0x4aa)]['refresh']=function(){const _0x6cf087=_0x44537c;this['resizeWindow'](),this[_0x6cf087(0x5df)][_0x6cf087(0x386)]();const _0x2d09e0=this[_0x6cf087(0x60c)][_0x6cf087(0x1e5)](/[\r\n]+/);let _0x121baf=0x0;for(const _0xcc01bb of _0x2d09e0){const _0x42fc44=this[_0x6cf087(0x6ba)](_0xcc01bb),_0x29eb0b=Math[_0x6cf087(0x249)]((this[_0x6cf087(0x369)]-_0x42fc44['width'])/0x2);this[_0x6cf087(0x28f)](_0xcc01bb,_0x29eb0b,_0x121baf),_0x121baf+=_0x42fc44[_0x6cf087(0x23b)];}},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x37e)]=function(_0x1dd7ce,_0x43268c){const _0xeef411=_0x44537c;_0x43268c[_0xeef411(0x27f)]&&this[_0xeef411(0x4dc)](_0x1dd7ce,_0x43268c['x']+0x2,_0x43268c['y']),_0x43268c['x']+=Math[_0xeef411(0x367)](this[_0xeef411(0x27e)](),ImageManager[_0xeef411(0x332)])+0x4;},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x4dc)]=function(_0x5e9fef,_0x2f7c56,_0x1ee042){const _0x5c4c22=_0x44537c,_0x3ac42f=ImageManager[_0x5c4c22(0x4bb)](_0x5c4c22(0x275)),_0x2b9cf0=ImageManager[_0x5c4c22(0x332)],_0x370d53=ImageManager[_0x5c4c22(0x446)],_0x3f6034=_0x5e9fef%0x10*_0x2b9cf0,_0x1b8d30=Math['floor'](_0x5e9fef/0x10)*_0x370d53,_0x45ae86=Math[_0x5c4c22(0x367)](this[_0x5c4c22(0x27e)]()),_0xf10bb1=Math[_0x5c4c22(0x367)](this['iconSize']());this[_0x5c4c22(0x5df)]['blt'](_0x3ac42f,_0x3f6034,_0x1b8d30,_0x2b9cf0,_0x370d53,_0x2f7c56,_0x1ee042,_0x45ae86,_0xf10bb1);},Window_EventLabel[_0x44537c(0x4aa)][_0x44537c(0x27e)]=function(){const _0xb119ed=_0x44537c;return VisuMZ[_0xb119ed(0x646)][_0xb119ed(0x633)][_0xb119ed(0x463)][_0xb119ed(0x475)];};function _0x47f1(){const _0xabbef4=['selfValue','StopAutoMoveMessages','toUpperCase','Hours','isLabelVisible','Visible','Scene_Boot_onDatabaseLoaded','_eventLabelOffsetX','firstSpawnedEventID','_SavedEventLocations','_CPCs','saveEventLocation','EventTimerResume','_eventIconSprite','Sprite_Balloon_setup','Game_CommonEvent_isActive','EventId','tileHeight','roundYWithDirection','Game_Event_update','Game_Temp_setDestination','_selfTargetNumberInput','SuccessSwitchId','toLowerCase','startOffsetY','Passability','setItemChoice','startOffsetX','cwX','clearPose','isLandOk','getInputDir8','Seconds','screenTileX','_alwaysUpdateMove','isSaveEventLocations','clone','IconBufferX','pattern','endScale','AllForbid','_lastAttachPictureMaxSize','%1,','fadeDuration','requestMapLoadCommonEvents','variables','filename','_targetY','708162HwBOho','createLowerLayer','_labelWindows','PlayerMovementDiagonal','SlowerSpeed','createLabelWindowForTarget','isBigCharacter','SLEEP','attachPictureScale','checkNeedForPeriodicRefresh','prepareSpawnedEventAtXY','_characterSprites','updateSelfMovement','isWorking','VehicleForbid','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','onMapLoaded','BULB','Window_NumberInput_processOk','isEventClickStopValid','_priorityType','ShadowLayer','SelfVariables','CPC','checkAdvancedSwitchVariablePresent','VisibleEventLabels','needsAttachPictureUpdate','ship','adjustMoveSynchOpacityDelta','isPreventSelfMovement','AdvancedSwitches','hideShadows','Game_Message_add','setOpacity','setCharacterBitmap','addLoadListener','SPIN\x20CCW','_comments','_saveEventLocation','%1Forbid','_trigger','Game_Follower_initialize','ShadowShowAllEvents','return\x20%1','Game_Event_initialize','IconBufferY','BoatSpeed','refreshEventLabels','processMoveRoutePatternLock','clearAttachPictureSettings','SpriteBased','tileWidth','screenX','_offsetY','name','Allow','_selfEvent','createTextSprite','updateEventLabelText','processEraseEncounterSpawn','randomInt','_screenZoomScale','blendMode','setDiagonalDirection','PosX','isDashing','CustomPageConditions','cwY','pages','updateShadowChanges','Game_Player_checkEventTriggerThere','setMoveSpeed','RefVariables','Game_Player_getInputDirection','isAdvancedVariable','advancedValue','_inputTime','deltaY','Game_SelfSwitches_setValue','_forceHideFollower','code','Game_Vehicle_isLandOk','ANGER','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Step1MapId','updateAttachPictureBitmap','_encounterEffectDuration','isInsideLabelRange','splice','roundX','_eventMorphData','loadSvEnemy','resume','reverse','GetMoveSynchTarget','eventLabelsVisible','SpawnEventDespawnAtXY','Game_Map_event','_seconds','Game_Party_hasEncounterHalf','MOBILE_EVENT_LABELS','setupAttachPictureBitmap','updateFadeIn','8uZeGdT','processMoveRouteSelfVariable','drawText','FollowerReset','offsetX','_eventId','Game_Variables_value','deleteSavedEventLocationKey','initEventsMoveCoreEffects','frameCount','findTargetSprite','COBWEB','LIGHTBULB','CarryPose','checkEventTriggerAuto','isShadowShrink','_forceCarrying','_duration','Game_CharacterBase_moveStraight','ShadowHidePlayer','fontFace','region','%1%2','resetIconsOnEventsDataKey','setupDiagonalSupport','ShadowHideFollowers','disable','PreloadedMaps','onClickTrigger','clearDestination','map','LIGHT-BULB','Vehicle','ARRAYEVAL','DiagonalSpeedMultiplier','isRegionForbidPass','contents','iconIndex','arc','parent','version','labelWindowRangeType','SILENCE','turnLeft90','_scene','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','encounterProximityType','push','Speed','useCarryPoseForIcons','_activationProximity','process_VisuMZ_EventsMoveCore_Switches_Variables','VisuMZ_0_CoreEngine','createEventsMoveCoreTileMessagePopup','MUSIC\x20NOTE','end','Scene_Load_onLoadSuccess','Step1EventId','MapVariables','updateEventCustomZ','setupEventsMoveCoreEffects','TileY','pow','loadEnemy','_forceShowFollower','191674MAufLG','processMoveRouteSetIndex','processMoveSynchMirrorVert','processMoveRouteTeleportToCharacter','Sprite_Character_characterPatternY','Game_Followers_jumpAll','%1Allow','switch2Valid','_moveSpeed','trigger','removeChild','_tilemap','updateSaveEventLocation','attachPictureSettings','SelfDataResetAll','_moveOnlyRegions','_text','Movement','pluginCommandCallEvent','filter','hueShift','updateMove','Self\x20Switch\x20%1','update','refreshBushDepth','TargetVariableId','activationRegionList','vehicle','FALSE','Game_CharacterBase_setDirection','text','areFollowersForceHidden','processMoveSynchMirrorHorz','checkEventTriggerEventsMoveCore','FollowerSetGlobalChase','Game_CharacterBase_opacity','Ship','hasMoveOnlyRegions','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','lock','PosY','isRunning','setValue','_PlayerDiagonalSetting','EventTimerPause','isObjectCharacter','moveTypeRandom','frontX','Game_Map_setup','MessageText','isDashingAndMoving','circle','Game_CharacterBase_pattern','EventTimerExpireEvent','HURT','Settings','moveTowardCharacter','canPass','FaceSynchAllSynchTargets','Game_Switches_setValue','USER-DEFINED\x204','_screenParallel','_frames','restoreIconsOnEventsDataKey','VariableGetSelfVariableID','isNearTheScreen','isMoving','MULTIPLY','processEraseEncounterEvents','Sprite_Character_update','PreMorphJS','moveDiagonally','padZero','UPPER\x20RIGHT','EventsMoveCore','_randomHomeY','shadowX','AutoBalloon','FontSize','isNormalPriority','Map\x20%1\x20Variable\x20%2','executeCommand','processMoveSynch','removeMorph','resetSelfSwitchesForMap','clearSelfTarget','isEventClickTriggered','FollowerID','isPlayerWithinEncounterHalfEvents','list','_character','bind','_randomHomeX','turnTowardCharacter','Minutes','_eventIcon','VisuMZ_1_MessageCore','autoEventIconBuffer','away','turnTowardPoint','setNumberInput','Game_Event_setupPageSettings','loadPicture','_callEventMap','EventLocationCreate','screenTileY','Game_Message_setNumberInput','Letter','moveSynchType','isPressed','return\x200','characterIndex','Game_CharacterBase_increaseSteps','findDiagonalDirectionTo','processMoveSynchRandom','PreCopyJS','note','setFrame','StopAutoMoveEvents','SPIN\x20CW','target','ARRAYSTR','type','encounterProximityDistance','BitmapSmoothing','endScaleY','_diagonalSupport','getPosingCharacterDirection','Preserve','CPCsMet','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','isSelfSwitch','includes','reverse\x20copy','width','processMoveRouteMoveToCharacter','_callEventData','_scaleX','Window_EventItem_onCancel','isActive','bitmap','checkSmartEventCollision','Game_Troop_meetsConditions','setupSpawnTest','Window_EventItem_onOk','forceDashing','setupEventsMoveCoreNotetags','command108','maxSize','lastSpawnedEvent','deleteEventLocation','bufferX','isMapSwitch','FavorHorz','updateText','fadeIn','deletePreservedMorphEventDataKey','_commonEventId','_lastSesetExitSelfSwitchesMapId','_moveAllowPlayerCollision','adjustX','processMoveRouteMoveUntilStop','constructor','CommonEventID','screenY','isAutoBufferIcon','Frames','_noEventMovementShadow','createBitmap','updateHueShift','_pageIndex','SelfVariableID','_startAngle','updateTextPosition','replace','MorphEventTo','getDirectionToPoint','destroy','Game_Character_processMoveCommand','updateVisibility','startEncounterEffect','_interpreter','isTile','Game_Player_increaseSteps','destinationY','_spriteOffsetY','processSaveEventLocation','Sprite_Character_setTileBitmap','mimic','Game_Character_forceMoveRoute','textSizeEx','adjustDir8MovementSpeed','square','_eventLabelOffsetY','shift','Game_Interpreter_updateWaitMode','switches','updateMoveSynchDirection','Sprite_Balloon_updatePosition','Game_Timer_onExpire','Game_Player_isDashing','674422coSaTg','RIGHT\x20TO\x20LEFT','custom','_encounterNoneProximity','processMoveRouteMoveRepeat','Game_Player_checkEventTriggerHere','DOWN','jump','Sprite_Character_setCharacterBitmap','ShowShadows','Step2EventId','activationProximityType','split','_EventIcons','defaultFontSize','isRegionAllowPass','setEventLabelsVisible','Operation','player','checkEventsMoveCoreStringTags','processMoveRouteJumpTo','Region%1','Template','chaseCharacter','Game_Interpreter_executeCommand','_saveEventLocations','value','pageIndex','isPassableByAnyDirection','windowPadding','Chase','Visibility','Game_CharacterBase_isTransparent','regionId','follower','Arc','startMessage','_lastAttachPictureScale','isPlayerControlDisabled','isSpawnedEvent','MsgDuration','clearDashing','turn180','Game_Event_event','Game_Event_findProperPageIndex','lastMovedDirection','resizeWindow','updateTilt','clamp','BlendMode','124623NthYmK','WalkForbid','_forceDashing','_targetScaleY','setupPageSettings','OFF','left','horz\x20mirror','getDiagonalDestination','isDashingEnabled','executeMoveDir8','terrainTag','SelfSwitchID','isInVehicle','MapSwitches','updateShadow','SWEAT','setPlayerDiagonalSetting','updateStop','call','switchId','length','_MapSpawnedEventData','deleteIconsOnEventsDataKey','createDummyWindow','_working','setMoveRoute','despawnAtXY','regionList','checkActivationProximity','MOBILE_DIAGONAL_PATHFINDING','Game_Vehicle_isMapPassable','patternWidth','moveBackToRandomHome','resetSelfSwitchesForEvent','_visiblePlayerX','isSaveEventLocation','_checkRelocateNotetag','diamond','Window_ScrollText_startMessage','_tileExpand','_direction','anchor','TiltVert','createIconSprite','5IhLawZ','isMovementSucceeded','getSavedEventLocation','height','MoveRouteIndex','AutoBuffer','moveSynchTarget','registerSelfEvent','Window_Message_startMessage','RemovePreserve','VisibleRange','Setting','processMoveRouteBalloon','morphIntoTemplate','event','advancedFunc','RandomMoveWeight','floor','ZZZ','_hue','_startScaleX','enable','dir8','Scene_Map_createDisplayObjects','_eventScreenY','_eventScreenX','TargetSwitchId','OpacitySpeed','setPosition','isCollidedWithEvents','erase','Game_Event_canPass','Game_Map_refresh','_fadeOutStart','isDestinationValid','getDirectionFromPoint','checkRegionEventTrigger','parse','delay','areFollowersForceShown','isTargetEventValidForLabelWindow','deltaYFrom','processMoveRouteJumpToCharacter','Toggle','reverseDir','Game_Timer_start','DEFAULT_SHIFT_Y','dashSpeedModifier','AdvancedVariables','Game_Map_events','log','setDashingEnabled','_noMovementShadow','_checkEncounterRaw','setupSaveEventLocations','_mirrorSprite','deleteIconsOnEventsData','Game_Map_setupEvents','processMoveRouteStepTo','start','_cacheSystemVisible','IconSet','match','Sprite_Character_initMembers','checkExistingEntitiesAt','_scaleBaseY','resetExitSelfSwitches','spriteId','createShadow','realMoveSpeed','iconSize','drawing','startCallEvent','VisuMZ_2_DragonbonesUnion','attachPictureBlendMode','_arcPeak','createContents','convertSelfVariableValuesInScriptCall','isEmptyCharacter','meetActivationProximityConditions','isAirship','removeTemporaryMapSpawnedEvents','SpawnEventAtTerrainTag','MapId','getInputDirection','gainFrames','_forceShowPlayer','drawTextEx','determineEventOverload','Scene_Map_startEncounterEffect','_lastAttachPictureType','_counter','requestBalloon','isBattleTest','isEventRunning','startMapCommonEventOnTouch','VS8','_speed','_displayY','updateDuration','_cpc','FollowerSetControl','Region','direction','_forceHidePlayer','processOk','EXCLAMATION','isPosing','NOTE','ConvertParams','distance','Game_Map_update','setEventIconDataKey','EventIconRestore','forceMoveRoute','RegionTouch','EventTimerExpireClear','_needsPeriodicRefresh','ShadowShowFollowers','prepareSpawnedEventAtRegion','contentsOpacity','restoreSavedEventPosition','updateScaleBase','startScaleX','createCharacterShadow','TerrainTag','lineHeight','despawnRegions','checkEventTriggerTouch','_mapId','_customZ','updateFrame','roundY','MessageCore','Spriteset_Map_createShadow','TemplateName','isSmartEventCollisionOn','correctFacingDirection','setPattern','setupEventsMoveCoreCommentTags','MUSIC','isOnRope','PostCopyJS','USER-DEFINED\x203','setup','BalloonOffsetX','Game_Map_parallelCommonEvents','Window_NumberInput_start','updatePatternEventsMoveCore','resetFontSettings','startAngle','roundXWithDirection','DIAGONAL_PATHFINDING_EVENT_LIMIT','outlineColor','EventID','_reflection','setMovementSuccess','requestRefresh','_poseDuration','updateEventIconSprite','execute','mirror\x20vertical','RegionOkTarget','EventAllow','directionOnLadderSpriteVS8dir','updatePattern','initEventsMoveCoreSettings','bufferY','List','_type','front','eraseEvent','updatePosition','isVisible','_selfTargetItemChoice','TRUE','LOVE','mainFontSize','getTileExpandData','_eventCopyData','EventAutoMovement','Game_CharacterBase_screenY','isPlaytest','clearCarrying','canUpdate','jumpAll','zoomScale','clearStepPattern','COLLAPSE','FastForwardKey','ADDITIVE','_filename','Map\x20%1\x20Switch\x20%2','%1:%2','setupMorphEvent','MapID','isAllowEventAutoMovement','SwitchGetSelfSwitchID','setTileBitmap','_hidden','updateRoutineMove','moveTowardPoint','characterPatternYVS8','meetsSwitchCondition','getPosingCharacterIndex','createSpawnedEvent','updateParallel','increaseSteps','Collision','isPlayerForceHidden','Game_Event_moveTypeRandom','isDiagonalDirection','setLastPluginCommandInterpreter','visibleRange','MoveAllSynchTargets','HMPH','_selfTarget','updateEventsAndMovementCore','meetActivationRegionConditions','initMembers','deltaXFrom','18ypEolx','abs','_paused','_event','checkEventProximity','hasDragonbones','Boat','PostMorphJS','USER-DEFINED\x201','registerCommand','STR','isMobileDevice','isTransparent','deltaX','WalkAllow','DashModifier','setDirection','delta','BufferX','pos','_patternLocked','rangeType','slice','exit','vertical\x20mirror','onDatabaseLoaded','smooth','TurnInPlaceDelay','reverse\x20mimic','iconWidth','_expireCommonEvent','DashEnableToggle','locate','startsWith','startMapCommonEventOnOKTarget','_moveSynch','_lastAttachPictureFilename','_visibleEventY','_DisablePlayerControl','Disable','TOGGLE','setBackgroundType','setupSpawnedEvents','create','createAttachPictureSprite','MobileEnabled','_data','move','moveRouteIndex','clearEventCache','setStopFollowerChasing','shadowY','SPIN\x20ANTICLOCKWISE','pageId','USER-DEFINED\x202','_moveRoute','Map%1-Event%2','Game_Interpreter_PluginCommand','createDisplayObjects','startMapCommonEventOnOK','_startY','mirror\x20horz','forced','hasAdvancedSwitchVariable','LIGHT\x20BULB','setSelfValue','setupPlayerVisibilityOverrides','_tileId','Game_CharacterBase_bushDepth','command357','isShip','events','isShadowVisible','trim','processMoveSynchMimic','hasClickTrigger','setCommonEvent','_lastPluginCommandInterpreter','updateVS8BalloonOffsets','Map%1.json','isSpawnHitboxCollisionOk','conditions','min','LOWER\x20RIGHT','innerWidth','isOnLadder','onLoadSuccess','PlayerMovementChange','prepareSpawnedEventAtTerrainTag','horizontal\x20mirror','isSupportDiagonalMovement','_screenActivated','TiltRight','determineCommonEventsWithCPC','Spriteset_Map_createLowerLayer','eventsXy','HEART','setFrames','_addedHitbox','isAllowCharacterTilt','variableValid','onAfterLoad','processMoveRouteFadeIn','_proxyWindow','down','processDrawIcon','Game_CharacterBase_canPass','_needsRefresh','_labelWindow','Game_Vehicle_initMoveSpeed','findDirectionTo','isPlayerWithinEncounterNoneEvents','fontSize','clear','hasEncounterHalf','setupSpawn','_fadeInDuration','deleteSavedEventLocation','ARRAYSTRUCT','moveByInput','rotation','updateBitmapSmoothing','ARRAYFUNC','itemPadding','_followerChaseOff','posEventsMoveCore','random','_pose','IconBlendMode','Scene_Map_onMapLoadedEncErase','_visibleEventX','_dummyWindow','Game_Event_checkEventTriggerAuto','attachPictureOffsetY','105104FNhUYU','hasStepAnime','_vehicleType','onCancel','EventIconChangeForced','200378XIjRkQ','ITEM','_activationProximityAutoTriggerBypass','Game_Map_isDashDisabled','_cacheVisibility','setDestination','row','ANNOYED','Direction','Enable','5436590VIQzMi','VariableId','setPose','isAnyEventStarting','_eventSpawnData','attachPictureFilename','isSceneMap','opacity','updateScale','UPPER\x20LEFT','duration','_attachPictureSprite','_pattern','SelfSwitchABCD','isJumping','_targetScaleX','moveAwayFromPoint','getControlledFollowerID','Game_Event_isCollidedWithPlayerCharacters','ARRAYJSON','isAdvancedSwitch','pause','Game_CharacterBase_hasStepAnime','Game_Event_checkEventTriggerTouch','getPosingCharacterPattern','canMove','_noFollowerMovementShadow','Game_Followers_isVisible','MUSIC-NOTE','switch2Id','clearSpriteOffsets','EventIconChange','IconIndex','Game_CharacterBase_update','_advancedSwitchVariable','updateEventMirrorSprite','_characterName','loadCPC','$callEventMap','isMapPassable','offsetY','createProxyWindow','TerrainTags','Game_Event_meetsConditionsCPC','Value','CallEvent','autosaveEventLocation','despawnEverything','checkEventTriggerThere','UNTITLED','originalText','Game_CharacterBase_initMembers','referEvent','_targetAngle','ARRAYNUM','loadDataFile','unlock','Game_Switches_value','_requestSaveEventLocation','Game_CharacterBase_direction','_spawnedEvents','meetsConditions','Game_CharacterBase_screenX','processMoveRouteAnimation','setMapValue','mirror\x20vert','initMoveSpeed','opacitySpeed','ccwX','updateWaitMode','getEventIconData','_lastMovedDirection','timer','savePreservedMorphEventDataKey','PlayerIconDelete','hasEncounterNone','SwitchId','EventLabelVisible','isTriggerIn','keys','isPlayerForceShown','createSpawnedEventWithData','RangeType','setBalloonPose','_isCharacterSpriteSheetInvisible','_target','isLongPressed','angle','processMoveRouteJumpForward','initMembersEventsMoveCore','processMoveSynchApproach','isPassable','refresh','Icon','processMoveSynchReverseMimic','Game_CharacterBase_moveDiagonally','_erased','Stop','_spriteset','processMoveRouteMoveTo','_currentArc','SpawnEventAtRegion','some','isTurnInPlace','BufferY','Game_Event_updateSelfMovement','updateOpacity','hasEventIcon','startOffset','NUM','absDistance','updateTextScale','moveStraight','processMoveRouteHugWall','characterPatternYBasic','_shadowGraphic','processMoveRouteFadeOut','characterIndexVS8','parameters','updateSpritePosition','template','max','processMoveCommand','right','ceil','_randomMoveWeight','_followerControlID','isInvisibleCharacter','checkEventTriggerHere','stop','default','none','processMoveCommandEventsMoveCore','initEventsMoveCore','_offsetX','Game_System_initialize','ALLOW_LADDER_DASH','FollowerSetTargetChase','attachPictureType','findProperPageIndex','_screenParallelOnce','meetsCPC','moveForward','moveAwayFromCharacter','Game_System_onAfterLoad','convertVariableValuesInScriptCall','_settings','forceCarrying','tileCoordinates','_targetX','_startX','SelfSwitches','changeSpeed','processMoveSynchCustom','Event','characterName','iconHeight','getAttachPictureBitmapHeight','attachPictureMaxSize','addChild','initFollowerController','isEventsMoveCoreInvisible','SpawnEventDespawnTerrainTags','resetIconsOnEventsData','backX','_encounterHalfProximity','registerSelfTarget','_eventOverloadThreshold','Game_Message_setItemChoice','Airship','MsgPopupTargetTile','attachPictureOffsetX','processMoveSynchDirection','hasCPCs','SCREEN','initialize','timerText','_scaleY','updateTileFrame','morphInto','updateFadeOut','_textSprite','AutoMoveEvents','_opacity','_stepPattern','Label','_clickTrigger','eventsXyNt','enemy','EventTimerFramesGain','setAllowEventAutoMovement','DashingEnable','picture','_characterIndex','_PreservedEventMorphData','EventLabelRefresh','status','PlayerAllow','unlockEvent','metCPC','Game_Player_executeMove','onLoadAttachPicture','_eventPageIndex','IconSize','Game_Map_unlockEvent','Game_Timer_stop','of\x20Preloaded\x20Maps.\x0a\x0a','updateEventsMoveCoreTagChanges','_isObjectCharacter','isBusy','_scaleBaseX','EventTimerSpeed','variableId','opacityDelta','charAt','visible','mirror\x20horizontal','PopupExtra','parallelCommonEvents','isSelfVariable','LIGHT','EventTemplates','_shadowOpacity','labelWindowText','lastSpawnedEventID','AirshipSpeed','...','Player','getSelfTarget','format','getPreservedMorphEventData','shadowFilename','_shadowSprite','posNt','_chaseOff','isBoat','apply','EventForbid','VICTORY','_fadeOutDuration','isOnScreen','Game_Player_isMapPassable','endOffset','SpawnEventAtXY','updatePeriodicRefresh','ApplyPopupExtraSettings','createEventsMoveCoreMessagePopup','isEventTest','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','copy','Game_Party_hasEncounterNone','mapValue','isValid','processMoveSynchAway','scrolledY','_eventCache','prototype','_realY','isMapVariable','setCharacterSpriteSheetInvisible','getPose','processMoveRouteSelfSwitch','Game_Timer_initialize','isMoveOnlyRegionPassable','RefSwitches','Game_Event_meetsConditions','_spawnData','isSpriteVS8dir','misc','SPIN\x20CLOCKWISE','PathfindMobileEnabled','DefaultShadow','_active','loadSystem','NORMAL','firstSpawnedEvent','despawnEventId','updateAttachPictureSprite','setEventIconData','turnAwayFromPoint','_moveRouteIndex','Forbid','round','PageId','setupRegionRestrictions','FRUSTRATION','eventId','bushDepth','executeCommonEvent','canStartLocalEvents','_attachPicture','_bypassClickStop','createLabelWindows','_periodicRefreshTimer','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','Game_Event_updateParallel','_startScaleY','spawnEventId','_visiblePlayerY','processMoveRouteTeleportTo','RIGHT','Self\x20Variable\x20%1','Game_Event_locate','ShadowHideAllEvents','onExpire','Game_Troop_meetsConditionsCPC','drawIcon','turnAwayFromCharacter','Step2MapId','scale','switch1Id','indexOf','_eventErased','isEventOverloaded','Game_SelfSwitches_value','string','Game_Variables_setValue','mapId','PostSpawnJS','concat','airship','sv\x20enemy','_stopCount','setChaseOff','vert\x20mirror','_commonEvents','setupEvents','onOk','switch1Valid','turnRight90','makeDeepCopy','ShadowShowPlayer','processMoveRouteStepToCharacter','KNEEL','getEventIconIndex','isRegionDockable','boxWidth','Game_CharacterBase_realMoveSpeed','checkCollisionKeywords','reserveCommonEvent','setPlayerControlDisable','_screenActivation','clearPageSettings','EnableTurnInPlace','QUESTION','getPlayerDiagonalSetting','EnableDashTilt','getAttachPictureBitmapWidth','_realX','description','Game_Follower_chaseCharacter','Name','isCollidedWithPlayerCharacters','isStopFollowerChasing','_regionRules','Game_CharacterBase_characterIndex','setControlledFollowerID','SPIN\x20COUNTERCLOCKWISE','_spriteOffsetX','needsUpdate','adjustY','_EventsMoveCoreSettings','PreloadMaps','getLastPluginCommandInterpreter','Game_Enemy_meetsSwitchCondition','AllAllow','createShadows','STRUCT','_eventOverload','isInstanceOfSceneMap','createSaveEventLocationData','executeMove','Game_Event_start','LEFT','getMapSpawnedEventData','checkValidEventerMap','setupCopyEvent','radius'];_0x47f1=function(){return _0xabbef4;};return _0x47f1();}