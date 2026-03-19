//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x2e6bc0=_0x545e;(function(_0x373518,_0x39013a){const _0x4f9ebc=_0x545e,_0x26b2e8=_0x373518();while(!![]){try{const _0x85403e=-parseInt(_0x4f9ebc(0x727))/0x1*(parseInt(_0x4f9ebc(0x147))/0x2)+-parseInt(_0x4f9ebc(0x3be))/0x3*(-parseInt(_0x4f9ebc(0x69f))/0x4)+-parseInt(_0x4f9ebc(0x657))/0x5+parseInt(_0x4f9ebc(0x71f))/0x6+parseInt(_0x4f9ebc(0x406))/0x7+parseInt(_0x4f9ebc(0x655))/0x8*(-parseInt(_0x4f9ebc(0x5d4))/0x9)+-parseInt(_0x4f9ebc(0x6ee))/0xa*(-parseInt(_0x4f9ebc(0x369))/0xb);if(_0x85403e===_0x39013a)break;else _0x26b2e8['push'](_0x26b2e8['shift']());}catch(_0x46b751){_0x26b2e8['push'](_0x26b2e8['shift']());}}}(_0x2615,0x7a9f0));var label=_0x2e6bc0(0x468),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2e6bc0(0x5c0)](function(_0x5db986){const _0x23dc30=_0x2e6bc0;return _0x5db986[_0x23dc30(0x52b)]&&_0x5db986[_0x23dc30(0x67d)][_0x23dc30(0x7fe)]('['+label+']');})[0x0];VisuMZ[label][_0x2e6bc0(0x6ef)]=VisuMZ[label][_0x2e6bc0(0x6ef)]||{},VisuMZ[_0x2e6bc0(0x823)]=function(_0x209314,_0x44ed64){const _0x192915=_0x2e6bc0;for(const _0x6cbb4c in _0x44ed64){if(_0x6cbb4c[_0x192915(0x298)](/(.*):(.*)/i)){const _0xb40b3d=String(RegExp['$1']),_0x327e32=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x208f4e,_0xecff9e,_0x52dec4;switch(_0x327e32){case _0x192915(0x75d):_0x208f4e=_0x44ed64[_0x6cbb4c]!==''?Number(_0x44ed64[_0x6cbb4c]):0x0;break;case _0x192915(0x16f):_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON[_0x192915(0x809)](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0xa59546=>Number(_0xa59546));break;case _0x192915(0x8a6):_0x208f4e=_0x44ed64[_0x6cbb4c]!==''?eval(_0x44ed64[_0x6cbb4c]):null;break;case _0x192915(0x26a):_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON['parse'](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0x460814=>eval(_0x460814));break;case _0x192915(0x2e3):_0x208f4e=_0x44ed64[_0x6cbb4c]!==''?JSON[_0x192915(0x809)](_0x44ed64[_0x6cbb4c]):'';break;case _0x192915(0x31c):_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON['parse'](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0x3a8288=>JSON[_0x192915(0x809)](_0x3a8288));break;case _0x192915(0x439):_0x208f4e=_0x44ed64[_0x6cbb4c]!==''?new Function(JSON[_0x192915(0x809)](_0x44ed64[_0x6cbb4c])):new Function(_0x192915(0x871));break;case _0x192915(0x7c0):_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON[_0x192915(0x809)](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0xffed1e=>new Function(JSON[_0x192915(0x809)](_0xffed1e)));break;case _0x192915(0x251):_0x208f4e=_0x44ed64[_0x6cbb4c]!==''?String(_0x44ed64[_0x6cbb4c]):'';break;case'ARRAYSTR':_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON['parse'](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0x3c5d82=>String(_0x3c5d82));break;case'STRUCT':_0x52dec4=_0x44ed64[_0x6cbb4c]!==''?JSON[_0x192915(0x809)](_0x44ed64[_0x6cbb4c]):{},_0x209314[_0xb40b3d]={},VisuMZ['ConvertParams'](_0x209314[_0xb40b3d],_0x52dec4);continue;case _0x192915(0x1a4):_0xecff9e=_0x44ed64[_0x6cbb4c]!==''?JSON['parse'](_0x44ed64[_0x6cbb4c]):[],_0x208f4e=_0xecff9e[_0x192915(0x513)](_0x202d4a=>VisuMZ[_0x192915(0x823)]({},JSON[_0x192915(0x809)](_0x202d4a)));break;default:continue;}_0x209314[_0xb40b3d]=_0x208f4e;}}return _0x209314;},VisuMZ[_0x2e6bc0(0x468)]['SceneManager_exit']=SceneManager[_0x2e6bc0(0x272)],SceneManager[_0x2e6bc0(0x272)]=function(){const _0x5bf83c=_0x2e6bc0;VisuMZ['CoreEngine'][_0x5bf83c(0x5fe)][_0x5bf83c(0x895)](this);if(Utils[_0x5bf83c(0x309)]>='1.4.4'){if(typeof nw==='object')nw[_0x5bf83c(0x719)][_0x5bf83c(0x380)]();}},(_0x83c910=>{const _0x5b821f=_0x2e6bc0,_0x1dcf30=_0x83c910[_0x5b821f(0x3d0)];for(const _0x2bd346 of dependencies){if(!Imported[_0x2bd346]){alert(_0x5b821f(0x46f)['format'](_0x1dcf30,_0x2bd346)),SceneManager['exit']();break;}}const _0x59edfa=_0x83c910[_0x5b821f(0x67d)];if(_0x59edfa[_0x5b821f(0x298)](/\[Version[ ](.*?)\]/i)){const _0x23ad9a=Number(RegExp['$1']);_0x23ad9a!==VisuMZ[label][_0x5b821f(0x6d6)]&&(alert(_0x5b821f(0x1dc)[_0x5b821f(0x607)](_0x1dcf30,_0x23ad9a)),SceneManager[_0x5b821f(0x272)]());}if(_0x59edfa['match'](/\[Tier[ ](\d+)\]/i)){const _0x2bfa68=Number(RegExp['$1']);_0x2bfa68<tier?(alert(_0x5b821f(0x299)[_0x5b821f(0x607)](_0x1dcf30,_0x2bfa68,tier)),SceneManager[_0x5b821f(0x272)]()):tier=Math[_0x5b821f(0x56f)](_0x2bfa68,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5b821f(0x6ef)],_0x83c910[_0x5b821f(0x69c)]);})(pluginData),((()=>{const _0x357202=_0x2e6bc0;if(VisuMZ[_0x357202(0x468)][_0x357202(0x6ef)][_0x357202(0x818)]['SubfolderParse']??!![])for(const _0x51c2d0 in $plugins){const _0x4ea605=$plugins[_0x51c2d0];_0x4ea605['name']['match'](/(.*)\/(.*)/i)&&(_0x4ea605[_0x357202(0x3d0)]=String(RegExp['$2'][_0x357202(0x679)]()));}})()),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'AnimationPoint',_0x3b1578=>{const _0x14682d=_0x2e6bc0;if(!SceneManager['_scene'])return;if(!SceneManager[_0x14682d(0x49a)][_0x14682d(0x722)])return;VisuMZ[_0x14682d(0x823)](_0x3b1578,_0x3b1578);const _0x3bb452=Math[_0x14682d(0x897)](_0x3b1578[_0x14682d(0x3d3)]),_0x2615f9=Math[_0x14682d(0x897)](_0x3b1578['pointY']);$gameTemp[_0x14682d(0x3e5)](_0x3bb452,_0x2615f9,_0x3b1578[_0x14682d(0x629)],_0x3b1578[_0x14682d(0x2cd)],_0x3b1578[_0x14682d(0x7ff)]);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'AudioChangeBgmVolume',_0x1b20d0=>{const _0x18d33b=_0x2e6bc0;VisuMZ['ConvertParams'](_0x1b20d0,_0x1b20d0);const _0x5e611e=Math[_0x18d33b(0x897)](_0x1b20d0[_0x18d33b(0x164)])['clamp'](0x0,0x64),_0x59239d=AudioManager[_0x18d33b(0x168)];_0x59239d&&(_0x59239d['volume']=_0x5e611e,_0x59239d[_0x18d33b(0x5d9)]=AudioManager['_bgmBuffer'][_0x18d33b(0x1a8)](),AudioManager['updateBgmParameters'](_0x59239d),AudioManager['playBgm'](_0x59239d,_0x59239d['pos']),AudioManager[_0x18d33b(0x54a)][_0x18d33b(0x6d5)](_0x59239d['pos']));}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x590),_0x1ad2a2=>{const _0x3ef61e=_0x2e6bc0;VisuMZ[_0x3ef61e(0x823)](_0x1ad2a2,_0x1ad2a2);const _0x22f15f=Math[_0x3ef61e(0x897)](_0x1ad2a2['pitch'])[_0x3ef61e(0x2eb)](0x32,0x96),_0x2d671e=AudioManager['_currentBgm'];_0x2d671e&&(_0x2d671e[_0x3ef61e(0x7fc)]=_0x22f15f,_0x2d671e[_0x3ef61e(0x5d9)]=AudioManager[_0x3ef61e(0x54a)][_0x3ef61e(0x1a8)](),AudioManager[_0x3ef61e(0x397)](_0x2d671e),AudioManager[_0x3ef61e(0x815)](_0x2d671e,_0x2d671e[_0x3ef61e(0x5d9)]),AudioManager[_0x3ef61e(0x54a)][_0x3ef61e(0x6d5)](_0x2d671e[_0x3ef61e(0x5d9)]));}),PluginManager['registerCommand'](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x6d7),_0x1b32bb=>{const _0xc8e6e1=_0x2e6bc0;VisuMZ[_0xc8e6e1(0x823)](_0x1b32bb,_0x1b32bb);const _0x199d9c=Math['round'](_0x1b32bb[_0xc8e6e1(0x85d)])['clamp'](-0x64,0x64),_0x1824c5=AudioManager[_0xc8e6e1(0x168)];_0x1824c5&&(_0x1824c5[_0xc8e6e1(0x85d)]=_0x199d9c,_0x1824c5[_0xc8e6e1(0x5d9)]=AudioManager['_bgmBuffer']['seek'](),AudioManager[_0xc8e6e1(0x397)](_0x1824c5),AudioManager['playBgm'](_0x1824c5,_0x1824c5[_0xc8e6e1(0x5d9)]),AudioManager[_0xc8e6e1(0x54a)][_0xc8e6e1(0x6d5)](_0x1824c5[_0xc8e6e1(0x5d9)]));}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'AudioChangeBgsVolume',_0x4dd340=>{const _0x388064=_0x2e6bc0;VisuMZ[_0x388064(0x823)](_0x4dd340,_0x4dd340);const _0xd30ba3=Math[_0x388064(0x897)](_0x4dd340[_0x388064(0x164)])['clamp'](0x0,0x64),_0x306005=AudioManager[_0x388064(0x892)];_0x306005&&(_0x306005[_0x388064(0x164)]=_0xd30ba3,_0x306005[_0x388064(0x5d9)]=AudioManager[_0x388064(0x157)][_0x388064(0x1a8)](),AudioManager[_0x388064(0x25f)](_0x306005),AudioManager[_0x388064(0x3cc)](_0x306005,_0x306005[_0x388064(0x5d9)]),AudioManager['_bgsBuffer'][_0x388064(0x6d5)](_0x306005[_0x388064(0x5d9)]));}),PluginManager['registerCommand'](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x3b8),_0x2978af=>{const _0x34684e=_0x2e6bc0;VisuMZ[_0x34684e(0x823)](_0x2978af,_0x2978af);const _0x2ddc60=Math[_0x34684e(0x897)](_0x2978af[_0x34684e(0x7fc)])[_0x34684e(0x2eb)](0x32,0x96),_0x28f29d=AudioManager[_0x34684e(0x892)];_0x28f29d&&(_0x28f29d[_0x34684e(0x7fc)]=_0x2ddc60,_0x28f29d['pos']=AudioManager['_bgsBuffer'][_0x34684e(0x1a8)](),AudioManager[_0x34684e(0x25f)](_0x28f29d),AudioManager[_0x34684e(0x3cc)](_0x28f29d,_0x28f29d[_0x34684e(0x5d9)]),AudioManager[_0x34684e(0x157)][_0x34684e(0x6d5)](_0x28f29d['pos']));}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x345),_0x3ec8c7=>{const _0x4d6bcb=_0x2e6bc0;VisuMZ['ConvertParams'](_0x3ec8c7,_0x3ec8c7);const _0x29cbea=Math[_0x4d6bcb(0x897)](_0x3ec8c7[_0x4d6bcb(0x85d)])['clamp'](-0x64,0x64),_0x4f2afa=AudioManager[_0x4d6bcb(0x892)];_0x4f2afa&&(_0x4f2afa['pan']=_0x29cbea,_0x4f2afa['pos']=AudioManager['_bgsBuffer'][_0x4d6bcb(0x1a8)](),AudioManager[_0x4d6bcb(0x25f)](_0x4f2afa),AudioManager[_0x4d6bcb(0x3cc)](_0x4f2afa,_0x4f2afa[_0x4d6bcb(0x5d9)]),AudioManager[_0x4d6bcb(0x157)][_0x4d6bcb(0x6d5)](_0x4f2afa[_0x4d6bcb(0x5d9)]));}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x3a4),_0x50edd0=>{const _0x264e07=_0x2e6bc0;if(!$gameTemp[_0x264e07(0x2d3)]())return;const _0x522a3f=Input[_0x264e07(0x32d)]();console[_0x264e07(0x882)](_0x522a3f);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x60c),_0x574ed1=>{const _0xe6d96f=_0x2e6bc0;if(!$gameTemp[_0xe6d96f(0x2d3)]())return;if(!Utils[_0xe6d96f(0x3e4)]())return;SceneManager[_0xe6d96f(0x49a)][_0xe6d96f(0x23a)]=![],VisuMZ[_0xe6d96f(0x468)]['ExportStrFromAllMaps']();}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x5e8),_0x1d4e2b=>{const _0xef4666=_0x2e6bc0;if(!$gameTemp[_0xef4666(0x2d3)]())return;if(!Utils[_0xef4666(0x3e4)]())return;SceneManager[_0xef4666(0x49a)][_0xef4666(0x23a)]=![],VisuMZ[_0xef4666(0x468)][_0xef4666(0x10a)]();}),PluginManager['registerCommand'](pluginData['name'],'ExportCurMapText',_0x46a813=>{const _0x2f301f=_0x2e6bc0;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2f301f(0x3e4)]())return;if(!$gameMap)return;if($gameMap[_0x2f301f(0x4f8)]()<=0x0)return;VisuMZ[_0x2f301f(0x823)](_0x46a813,_0x46a813);const _0x52c9ed=_0x2f301f(0x584)['format']($gameMap[_0x2f301f(0x4f8)]()[_0x2f301f(0xe5)](0x3)),_0x25990f=VisuMZ['CoreEngine'][_0x2f301f(0x842)]($gameMap[_0x2f301f(0x4f8)]());VisuMZ[_0x2f301f(0x468)][_0x2f301f(0x714)](_0x25990f,_0x52c9ed,!![]);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x784),_0x25c6cd=>{const _0x3ae905=_0x2e6bc0;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x3ae905(0x823)](_0x25c6cd,_0x25c6cd);const _0x1736db=_0x3ae905(0x29f)[_0x3ae905(0x607)]($gameTroop['_troopId']['padZero'](0x4)),_0x4da242=VisuMZ[_0x3ae905(0x468)][_0x3ae905(0x378)]($gameTroop['_troopId']);VisuMZ[_0x3ae905(0x468)][_0x3ae905(0x714)](_0x4da242,_0x1736db,!![]);}),VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x714)]=function(_0xee9367,_0x5462f0,_0x4a4f34){const _0x45b0c1=_0x2e6bc0,_0x40a2bf=require('fs');let _0x3c3205=_0x45b0c1(0x636)[_0x45b0c1(0x607)](_0x5462f0||'0');_0x40a2bf[_0x45b0c1(0x87f)](_0x3c3205,_0xee9367,_0x3602ad=>{if(_0x3602ad)throw err;else _0x4a4f34&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'['format'](_0x3c3205));});},VisuMZ[_0x2e6bc0(0x468)]['ExportStrFromAllMaps']=function(){const _0x19a984=_0x2e6bc0,_0x2f9ece=[];for(const _0x125b7d of $dataMapInfos){if(!_0x125b7d)continue;_0x2f9ece['push'](_0x125b7d['id']);}const _0x2fab26=_0x2f9ece[_0x19a984(0x29e)]*0x64+Math[_0x19a984(0x3b7)](0x64);alert(_0x19a984(0x748)[_0x19a984(0x607)](_0x2fab26)),this[_0x19a984(0x89e)]=[],this[_0x19a984(0x10d)]=$dataMap;for(const _0x2e86b9 of _0x2f9ece){VisuMZ[_0x19a984(0x468)][_0x19a984(0xe9)](_0x2e86b9);}setTimeout(VisuMZ['CoreEngine'][_0x19a984(0x194)][_0x19a984(0x6e7)](this),_0x2fab26);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0xe9)]=function(_0x56f5d9){const _0x3f6351=_0x2e6bc0,_0x489717=_0x3f6351(0x137)['format'](_0x56f5d9[_0x3f6351(0xe5)](0x3)),_0x410e28=new XMLHttpRequest(),_0x3991c3='data/'+_0x489717;_0x410e28[_0x3f6351(0x6a0)]('GET',_0x3991c3),_0x410e28[_0x3f6351(0x470)]('application/json'),_0x410e28[_0x3f6351(0x88e)]=()=>this[_0x3f6351(0x181)](_0x410e28,_0x56f5d9,_0x489717,_0x3991c3),_0x410e28[_0x3f6351(0x5a8)]=()=>DataManager['onXhrError'](_0x3f6351(0x48d),_0x489717,_0x3991c3),_0x410e28[_0x3f6351(0x721)]();},VisuMZ['CoreEngine']['storeMapData']=function(_0x2ba714,_0x230f92,_0x1a3643,_0x5430c8){const _0x3e3ab9=_0x2e6bc0;$dataMap=JSON[_0x3e3ab9(0x809)](_0x2ba714['responseText']),DataManager[_0x3e3ab9(0x455)]($dataMap),this[_0x3e3ab9(0x89e)][_0x230f92]=VisuMZ[_0x3e3ab9(0x468)][_0x3e3ab9(0x842)](_0x230f92),$dataMap=this['_currentMap'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x194)]=function(){const _0x5a278c=_0x2e6bc0,_0xf119c9=_0x5a278c(0x783);this['_storedMapText'][_0x5a278c(0x581)](undefined)['remove']('')['remove'](null);const _0x2e0fbe=this[_0x5a278c(0x89e)][_0x5a278c(0x538)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ['CoreEngine'][_0x5a278c(0x714)](_0x2e0fbe,_0xf119c9,!![]),SceneManager[_0x5a278c(0x49a)][_0x5a278c(0x23a)]=!![];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x842)]=function(_0x228afd){const _0x29b2c2=_0x2e6bc0;if(!$dataMap)return'';let _0x5059bd='█'[_0x29b2c2(0x1ca)](0x46)+'\x0a\x0a',_0x2af3b2='═'[_0x29b2c2(0x1ca)](0x46)+'\x0a\x0a',_0x261e8c='';this[_0x29b2c2(0x412)]=0x0;for(const _0x40de51 of $dataMap[_0x29b2c2(0x552)]){if(!_0x40de51)continue;let _0x438df4=_0x40de51['id'],_0x45cd6c=_0x40de51['name'],_0x17c43d=_0x40de51[_0x29b2c2(0x15a)];for(const _0xc0bf68 of _0x17c43d){const _0x243cf9=_0x17c43d[_0x29b2c2(0x314)](_0xc0bf68)+0x1;let _0x52f679=_0x2af3b2+_0x29b2c2(0x20c),_0x380490=VisuMZ[_0x29b2c2(0x468)][_0x29b2c2(0x6e1)](_0xc0bf68[_0x29b2c2(0x775)]);if(_0x380490['length']>0x0){if(_0x261e8c[_0x29b2c2(0x29e)]>0x0)_0x261e8c+=_0x2af3b2+_0x29b2c2(0x4b4);else{const _0x60ab4c=$dataMapInfos[_0x228afd][_0x29b2c2(0x3d0)];_0x261e8c+=_0x5059bd+_0x29b2c2(0x67b)[_0x29b2c2(0x607)](_0x228afd,_0x60ab4c||_0x29b2c2(0x73e))+_0x5059bd;}_0x261e8c+=_0x52f679[_0x29b2c2(0x607)](_0x438df4,_0x45cd6c,_0x243cf9,_0x380490);}}}return _0x261e8c[_0x29b2c2(0x29e)]>0x0&&(_0x261e8c+=_0x2af3b2),_0x261e8c;},VisuMZ['CoreEngine'][_0x2e6bc0(0x10a)]=function(){const _0x48256f=_0x2e6bc0,_0x564b48=$dataTroops[_0x48256f(0x29e)]*0xa+Math[_0x48256f(0x3b7)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x564b48));const _0x69e27a=[];for(const _0xa7ceef of $dataTroops){if(!_0xa7ceef)continue;const _0x18a5d8=_0xa7ceef['id'];_0x69e27a[_0x18a5d8]=VisuMZ['CoreEngine']['ExtractStrFromTroop'](_0x18a5d8);}setTimeout(VisuMZ[_0x48256f(0x468)][_0x48256f(0x8a0)]['bind'](this,_0x69e27a),_0x564b48);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x378)]=function(_0x37d9e2){const _0x14bdd1=_0x2e6bc0;if(!$dataTroops[_0x37d9e2])return'';let _0x4fd81e='█'['repeat'](0x46)+'\x0a\x0a',_0x209408='═'[_0x14bdd1(0x1ca)](0x46)+'\x0a\x0a',_0x3b14dc='';this[_0x14bdd1(0x412)]=0x0;const _0x456399=$dataTroops[_0x37d9e2];let _0x33202f=_0x456399[_0x14bdd1(0x15a)];for(const _0x5b77d7 of _0x33202f){const _0xe5cbf4=_0x33202f['indexOf'](_0x5b77d7)+0x1;let _0x5d79d6=_0x209408+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x342b7a=VisuMZ['CoreEngine'][_0x14bdd1(0x6e1)](_0x5b77d7[_0x14bdd1(0x775)]);_0x342b7a[_0x14bdd1(0x29e)]>0x0&&(_0x3b14dc[_0x14bdd1(0x29e)]>0x0?_0x3b14dc+=_0x209408+'\x0a\x0a\x0a\x0a\x0a':_0x3b14dc+=_0x4fd81e+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x37d9e2,_0x456399[_0x14bdd1(0x3d0)]||_0x14bdd1(0x73e))+_0x4fd81e,_0x3b14dc+=_0x5d79d6[_0x14bdd1(0x607)](_0xe5cbf4,_0x342b7a));}return _0x3b14dc['length']>0x0&&(_0x3b14dc+=_0x209408),_0x3b14dc;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x8a0)]=function(_0x10e711){const _0x4a57e1=_0x2e6bc0,_0x243a28='AllTroops';_0x10e711[_0x4a57e1(0x581)](undefined)[_0x4a57e1(0x581)]('')['remove'](null);const _0x1bb624=_0x10e711[_0x4a57e1(0x538)](_0x4a57e1(0x4b4))[_0x4a57e1(0x679)]();VisuMZ[_0x4a57e1(0x468)]['ExportString'](_0x1bb624,_0x243a28,!![]),SceneManager['_scene'][_0x4a57e1(0x23a)]=!![];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6e1)]=function(_0x52514b){const _0x2829f7=_0x2e6bc0;let _0x2e8bee='\x0a'+'─'[_0x2829f7(0x1ca)](0x46)+'\x0a',_0x5f4a11='\x0a'+'┄'[_0x2829f7(0x1ca)](0x46)+'\x0a',_0x24fa9c='';for(const _0x439598 of _0x52514b){if(!_0x439598)continue;if(_0x439598[_0x2829f7(0x6d9)]===0x65)_0x24fa9c+=_0x2e8bee+'\x0a',_0x24fa9c+='〘Show\x20Text〙\x0a',_0x439598[_0x2829f7(0x69c)][0x4]!==''&&_0x439598[_0x2829f7(0x69c)][0x4]!==undefined&&(_0x24fa9c+='【%1】\x0a'[_0x2829f7(0x607)](_0x439598['parameters'][0x4]));else{if(_0x439598[_0x2829f7(0x6d9)]===0x191)_0x24fa9c+=_0x2829f7(0x52d)['format'](_0x439598[_0x2829f7(0x69c)][0x0]);else{if(_0x439598['code']===0x192)_0x24fa9c+=_0x2e8bee,_0x24fa9c+='%1〘Choice\x20%2〙\x20%3%1'[_0x2829f7(0x607)](_0x5f4a11,_0x439598[_0x2829f7(0x69c)][0x0]+0x1,_0x439598[_0x2829f7(0x69c)][0x1]);else{if(_0x439598[_0x2829f7(0x6d9)]===0x193)_0x24fa9c+=_0x2e8bee,_0x24fa9c+=_0x2829f7(0x802)['format'](_0x5f4a11);else{if(_0x439598[_0x2829f7(0x6d9)]===0x194)_0x24fa9c+=_0x2e8bee,_0x24fa9c+=_0x2829f7(0x409)[_0x2829f7(0x607)](_0x5f4a11);else{if(_0x439598[_0x2829f7(0x6d9)]===0x69)_0x24fa9c+=_0x2e8bee+'\x0a',_0x24fa9c+=_0x2829f7(0x5ad);else{if(_0x439598[_0x2829f7(0x6d9)]===0x6c)_0x24fa9c+=_0x2e8bee+'\x0a',_0x24fa9c+='》Comment《\x0a%1\x0a'[_0x2829f7(0x607)](_0x439598['parameters'][0x0]);else{if(_0x439598['code']===0x198)_0x24fa9c+=_0x2829f7(0x52d)[_0x2829f7(0x607)](_0x439598[_0x2829f7(0x69c)][0x0]);else{if(_0x439598['code']===0x75){const _0x80174a=$dataCommonEvents[_0x439598['parameters'][0x0]];if(_0x80174a&&this[_0x2829f7(0x412)]<=0xa){this[_0x2829f7(0x412)]++;let _0x2e52f2=VisuMZ['CoreEngine'][_0x2829f7(0x6e1)](_0x80174a[_0x2829f7(0x775)]);_0x2e52f2[_0x2829f7(0x29e)]>0x0&&(_0x24fa9c+=_0x2e8bee,_0x24fa9c+=_0x5f4a11,_0x24fa9c+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x2829f7(0x607)](_0x80174a['id'],_0x80174a['name']),_0x24fa9c+=_0x5f4a11,_0x24fa9c+=_0x2e52f2,_0x24fa9c+=_0x5f4a11,_0x24fa9c+=_0x2829f7(0x1f6)['format'](_0x80174a['id'],_0x80174a[_0x2829f7(0x3d0)]),_0x24fa9c+=_0x5f4a11),this['_commonEventLayers']--;}}}}}}}}}}}return _0x24fa9c[_0x2829f7(0x29e)]>0x0&&(_0x24fa9c+=_0x2e8bee),_0x24fa9c;},PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'OpenURL',_0x2a94d7=>{const _0x50d8d9=_0x2e6bc0;VisuMZ['ConvertParams'](_0x2a94d7,_0x2a94d7);const _0x452085=_0x2a94d7[_0x50d8d9(0x100)];VisuMZ[_0x50d8d9(0x50a)](_0x452085);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x7a7),_0x5a11f1=>{const _0x3cf961=_0x2e6bc0;VisuMZ[_0x3cf961(0x823)](_0x5a11f1,_0x5a11f1);const _0x56d7df=_0x5a11f1[_0x3cf961(0x523)]||0x0;$gameParty[_0x3cf961(0x421)](_0x56d7df);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'MapOnceParallel',_0x158c8e=>{const _0x28a239=_0x2e6bc0;if(!SceneManager[_0x28a239(0x81e)]())return;VisuMZ[_0x28a239(0x823)](_0x158c8e,_0x158c8e);const _0x396fea=_0x158c8e[_0x28a239(0x445)];SceneManager['_scene'][_0x28a239(0x54b)](_0x396fea);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0xf0),_0x340183=>{const _0x5ed8f8=_0x2e6bc0;if(!$gameTemp[_0x5ed8f8(0x2d3)]())return;if(!Utils[_0x5ed8f8(0x3e4)]())return;VisuMZ[_0x5ed8f8(0x823)](_0x340183,_0x340183);const _0x39e657=_0x340183['PictureID']||0x1;$gameTemp[_0x5ed8f8(0x83f)]=_0x39e657;}),PluginManager['registerCommand'](pluginData['name'],'PictureEasingType',_0x2e5874=>{const _0x29dc11=_0x2e6bc0;VisuMZ[_0x29dc11(0x823)](_0x2e5874,_0x2e5874);const _0x44f675=_0x2e5874['pictureId']||0x1,_0x5e72d0=_0x2e5874[_0x29dc11(0x4f6)]||'Linear',_0x156cb6=$gameScreen[_0x29dc11(0x2a9)](_0x44f675);_0x156cb6&&_0x156cb6[_0x29dc11(0x357)](_0x5e72d0);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x390),_0x1bfff2=>{const _0x5385f8=_0x2e6bc0;for(let _0x58b6d4=0x1;_0x58b6d4<=$gameScreen[_0x5385f8(0xed)]();_0x58b6d4++){$gameScreen[_0x5385f8(0x382)](_0x58b6d4);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x6f3),_0x260120=>{const _0x32bb2e=_0x2e6bc0;VisuMZ[_0x32bb2e(0x823)](_0x260120,_0x260120);const _0x4ee826=Math[_0x32bb2e(0x69a)](_0x260120[_0x32bb2e(0x6bd)],_0x260120[_0x32bb2e(0x6ab)]),_0x36c2cf=Math[_0x32bb2e(0x56f)](_0x260120[_0x32bb2e(0x6bd)],_0x260120[_0x32bb2e(0x6ab)]);for(let _0x298076=_0x4ee826;_0x298076<=_0x36c2cf;_0x298076++){$gameScreen['erasePicture'](_0x298076);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],'PictureRotateBy',_0x3e6adb=>{const _0x50bb28=_0x2e6bc0;VisuMZ['ConvertParams'](_0x3e6adb,_0x3e6adb);const _0x4faf30=Math['round'](_0x3e6adb['PictureID'])['clamp'](0x1,0x64),_0xa8e585=-Number(_0x3e6adb[_0x50bb28(0x2e2)]||0x0),_0x47cd66=Math[_0x50bb28(0x56f)](_0x3e6adb[_0x50bb28(0x62d)]||0x0,0x0),_0x13fed9=_0x3e6adb[_0x50bb28(0x4f6)]||_0x50bb28(0x4ab),_0x5e9312=_0x3e6adb[_0x50bb28(0x799)],_0x37a486=$gameScreen[_0x50bb28(0x2a9)](_0x4faf30);if(!_0x37a486)return;_0x37a486[_0x50bb28(0x37d)](_0xa8e585,_0x47cd66,_0x13fed9);if(_0x5e9312){const _0xca6fe1=$gameTemp[_0x50bb28(0x5ea)]();if(_0xca6fe1)_0xca6fe1[_0x50bb28(0x4d8)](_0x47cd66);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x286),_0x39e716=>{const _0x1b95f7=_0x2e6bc0;VisuMZ['ConvertParams'](_0x39e716,_0x39e716);const _0x48018=Math['round'](_0x39e716[_0x1b95f7(0x79d)])[_0x1b95f7(0x2eb)](0x1,0x64),_0x2c1aa2=-Number(_0x39e716['TargetAngle']||0x0),_0x3a4b26=Math[_0x1b95f7(0x56f)](_0x39e716['Duration']||0x0,0x0),_0x1d4764=_0x39e716[_0x1b95f7(0x4f6)]||'Linear',_0x4db03a=_0x39e716[_0x1b95f7(0x799)],_0xc1d410=$gameScreen[_0x1b95f7(0x2a9)](_0x48018);if(!_0xc1d410)return;_0xc1d410[_0x1b95f7(0x750)](_0x2c1aa2,_0x3a4b26,_0x1d4764);if(_0x4db03a){const _0x46a600=$gameTemp[_0x1b95f7(0x5ea)]();if(_0x46a600)_0x46a600['wait'](_0x3a4b26);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x277),_0x30964e=>{const _0x22d280=_0x2e6bc0;VisuMZ[_0x22d280(0x823)](_0x30964e,_0x30964e);const _0x2318b9=Math[_0x22d280(0x897)](_0x30964e['PictureID'])['clamp'](0x1,0x64),_0x5abc4c=_0x30964e[_0x22d280(0x6ef)],_0x199d3e=_0x5abc4c['Origin'][_0x22d280(0x2eb)](0x0,0x1),_0x5b16c1=Math[_0x22d280(0x897)](_0x5abc4c[_0x22d280(0x8bf)]||0x0),_0x2aa976=Math[_0x22d280(0x897)](_0x5abc4c['PositionY']||0x0),_0xa4071=Math[_0x22d280(0x897)](_0x5abc4c['ScaleX']||0x0),_0x226f68=Math['round'](_0x5abc4c[_0x22d280(0x4fa)]||0x0),_0x53d4f5=Math[_0x22d280(0x897)](_0x5abc4c[_0x22d280(0x38d)])[_0x22d280(0x2eb)](0x0,0xff),_0x4bb15b=_0x5abc4c[_0x22d280(0x5d6)],_0x446b55=_0x22d280(0x322),_0x201867=_0x30964e['Smooth']?_0x22d280(0x1ee):_0x22d280(0x7e2),_0x16fed6=_0x446b55['format'](_0x30964e['IconIndex'],_0x201867);$gameScreen[_0x22d280(0x43c)](_0x2318b9,_0x16fed6,_0x199d3e,_0x5b16c1,_0x2aa976,_0xa4071,_0x226f68,_0x53d4f5,_0x4bb15b);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x392),_0x5baf52=>{const _0x5be673=_0x2e6bc0;VisuMZ[_0x5be673(0x823)](_0x5baf52,_0x5baf52);const _0x40c2bd=_0x5baf52[_0x5be673(0x34f)]||_0x5be673(0x447),_0x54de25=_0x5baf52[_0x5be673(0x630)]['clamp'](0x1,0x9),_0x5d9745=_0x5baf52['Speed'][_0x5be673(0x2eb)](0x1,0x9),_0xffdf1c=_0x5baf52[_0x5be673(0x62d)]||0x1,_0x45b34d=_0x5baf52[_0x5be673(0x799)];$gameScreen[_0x5be673(0x4c6)](_0x40c2bd),$gameScreen['startShake'](_0x54de25,_0x5d9745,_0xffdf1c);if(_0x45b34d){const _0x2c59df=$gameTemp[_0x5be673(0x5ea)]();if(_0x2c59df)_0x2c59df[_0x5be673(0x4d8)](_0xffdf1c);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x3dd),_0x207141=>{const _0x36b13d=_0x2e6bc0;if($gameParty[_0x36b13d(0x3f6)]())return;VisuMZ['ConvertParams'](_0x207141,_0x207141);const _0x1e6aa7=_0x207141[_0x36b13d(0x519)],_0x4d4c05=(_0x207141[_0x36b13d(0x3e8)]||0x0)/0x64;for(const _0x39777e of _0x1e6aa7){const _0x415336=Math[_0x36b13d(0x447)]()<=_0x4d4c05;$gameSwitches['setValue'](_0x39777e,_0x415336);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x475),_0x44fe88=>{const _0x463371=_0x2e6bc0;if($gameParty[_0x463371(0x3f6)]())return;VisuMZ['ConvertParams'](_0x44fe88,_0x44fe88);const _0x2ce6f8=Math['min'](_0x44fe88['StartID'],_0x44fe88['EndingID']),_0x1e1685=Math['max'](_0x44fe88['StartID'],_0x44fe88['EndingID']),_0x4558aa=(_0x44fe88[_0x463371(0x3e8)]||0x0)/0x64;for(let _0x125a3a=_0x2ce6f8;_0x125a3a<=_0x1e1685;_0x125a3a++){const _0x5e5067=Math[_0x463371(0x447)]()<=_0x4558aa;$gameSwitches['setValue'](_0x125a3a,_0x5e5067);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x220),_0xac73dd=>{const _0x466912=_0x2e6bc0;if($gameParty['inBattle']())return;VisuMZ[_0x466912(0x823)](_0xac73dd,_0xac73dd);const _0x2fe7da=_0xac73dd[_0x466912(0x519)];for(const _0x26c9c3 of _0x2fe7da){const _0x22fdcd=$gameSwitches[_0x466912(0x523)](_0x26c9c3);$gameSwitches['setValue'](_0x26c9c3,!_0x22fdcd);}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x386),_0x13bfd0=>{const _0x4dd3b3=_0x2e6bc0;if($gameParty[_0x4dd3b3(0x3f6)]())return;VisuMZ[_0x4dd3b3(0x823)](_0x13bfd0,_0x13bfd0);const _0x5e7620=Math['min'](_0x13bfd0[_0x4dd3b3(0x6bd)],_0x13bfd0['EndingID']),_0x2d403a=Math['max'](_0x13bfd0[_0x4dd3b3(0x6bd)],_0x13bfd0['EndingID']);for(let _0x3b46a3=_0x5e7620;_0x3b46a3<=_0x2d403a;_0x3b46a3++){const _0x55a1b2=$gameSwitches[_0x4dd3b3(0x523)](_0x3b46a3);$gameSwitches['setValue'](_0x3b46a3,!_0x55a1b2);}}),PluginManager['registerCommand'](pluginData['name'],_0x2e6bc0(0x52e),_0x57691a=>{const _0x616a3=_0x2e6bc0;VisuMZ[_0x616a3(0x823)](_0x57691a,_0x57691a);const _0x5e0a30=_0x57691a[_0x616a3(0x3aa)]||0x1;$gameSystem[_0x616a3(0x426)](_0x5e0a30);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x757),_0x2e626e=>{const _0x30cd72=_0x2e6bc0;if($gameParty[_0x30cd72(0x3f6)]())return;VisuMZ[_0x30cd72(0x823)](_0x2e626e,_0x2e626e);const _0x73527a=_0x2e626e['option'];if(_0x73527a['match'](/Front/i))$gameSystem[_0x30cd72(0x467)](![]);else _0x73527a[_0x30cd72(0x298)](/Side/i)?$gameSystem[_0x30cd72(0x467)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x30cd72(0x3da)]());}),PluginManager[_0x2e6bc0(0x7c3)](pluginData['name'],_0x2e6bc0(0x67a),_0x589be0=>{const _0x171552=_0x2e6bc0;if($gameParty['inBattle']())return;VisuMZ[_0x171552(0x823)](_0x589be0,_0x589be0);const _0x3a8d6c=[_0x171552(0x438),'bgs','me','se'];for(const _0x2cd5c8 of _0x3a8d6c){const _0x27d1c7=_0x589be0[_0x2cd5c8],_0x4107f4='%1/'[_0x171552(0x607)](_0x2cd5c8);for(const _0x4771ff of _0x27d1c7){AudioManager[_0x171552(0x827)](_0x4107f4,_0x4771ff);}}}),PluginManager['registerCommand'](pluginData['name'],_0x2e6bc0(0x305),_0x3c30ef=>{const _0x5129fd=_0x2e6bc0;if($gameParty[_0x5129fd(0x3f6)]())return;VisuMZ[_0x5129fd(0x823)](_0x3c30ef,_0x3c30ef);const _0x45026e=[_0x5129fd(0x6aa),'battlebacks1',_0x5129fd(0x8b2),'characters',_0x5129fd(0x731),_0x5129fd(0x3bf),'parallaxes',_0x5129fd(0x4a6),_0x5129fd(0x19e),_0x5129fd(0x5a2),'system',_0x5129fd(0x43d),'titles1',_0x5129fd(0x74f)];for(const _0x16a9b9 of _0x45026e){const _0x12d1ce=_0x3c30ef[_0x16a9b9],_0x434293=_0x5129fd(0x7bc)['format'](_0x16a9b9);for(const _0x3cc27f of _0x12d1ce){ImageManager[_0x5129fd(0x1da)](_0x434293,_0x3cc27f);}}}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x2cf),_0x5024d0=>{const _0x5efd26=_0x2e6bc0;if($gameParty[_0x5efd26(0x3f6)]())return;VisuMZ[_0x5efd26(0x823)](_0x5024d0,_0x5024d0);const _0x21807c=_0x5024d0[_0x5efd26(0x3aa)][_0x5efd26(0x63e)]()[_0x5efd26(0x679)](),_0x1c4dfd=VisuMZ[_0x5efd26(0x468)]['CreateBattleSystemID'](_0x21807c);$gameSystem[_0x5efd26(0x68d)](_0x1c4dfd);}),VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x30a)]=function(_0x400a84){const _0x19bc25=_0x2e6bc0;_0x400a84=_0x400a84||'DATABASE',_0x400a84=String(_0x400a84)['toUpperCase']()[_0x19bc25(0x679)]();switch(_0x400a84){case _0x19bc25(0x850):return 0x0;case _0x19bc25(0x7fb):return 0x1;case _0x19bc25(0x37e):return 0x2;case'CTB':if(Imported[_0x19bc25(0x279)])return _0x19bc25(0x195);break;case _0x19bc25(0x3ce):if(Imported[_0x19bc25(0x535)])return _0x19bc25(0x3ce);break;case _0x19bc25(0x5e6):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x19bc25(0x5e6);break;case _0x19bc25(0x410):if(Imported[_0x19bc25(0x604)])return _0x19bc25(0x410);break;case _0x19bc25(0x5a3):if(Imported[_0x19bc25(0x558)])return _0x19bc25(0x5a3);break;case _0x19bc25(0x601):if(Imported[_0x19bc25(0x7db)])return'ETB';break;case _0x19bc25(0xe2):if(Imported[_0x19bc25(0x48c)])return _0x19bc25(0xe2);break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData['name'],_0x2e6bc0(0x40a),_0x5169e8=>{const _0x30c0e8=_0x2e6bc0;VisuMZ[_0x30c0e8(0x823)](_0x5169e8,_0x5169e8);const _0x17b154=_0x5169e8['option']||0x1;$gameSystem[_0x30c0e8(0x3d7)](_0x17b154);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x3b9),_0x293ed4=>{const _0x2960ab=_0x2e6bc0;VisuMZ[_0x2960ab(0x823)](_0x293ed4,_0x293ed4);const _0x1dad27=_0x293ed4[_0x2960ab(0x5f9)]||'';$textPopup(_0x1dad27);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x599),_0x1630e6=>{const _0x128349=_0x2e6bc0;VisuMZ['ConvertParams'](_0x1630e6,_0x1630e6);const _0x391caa=_0x1630e6['id']||0x1,_0x2256f1=_0x1630e6[_0x128349(0x10e)],_0x546b04=_0x1630e6[_0x128349(0x36a)]||0x0;let _0x1815e1=$gameVariables[_0x128349(0x523)](_0x391caa)||0x0;switch(_0x2256f1){case'=':_0x1815e1=_0x546b04;break;case'+':_0x1815e1+=_0x546b04;break;case'-':_0x1815e1-=_0x546b04;break;case'*':_0x1815e1*=_0x546b04;break;case'/':_0x1815e1/=_0x546b04;break;case'%':_0x1815e1%=_0x546b04;break;}_0x1815e1=_0x1815e1||0x0,$gameVariables[_0x128349(0x38c)](_0x391caa,_0x1815e1);}),PluginManager[_0x2e6bc0(0x7c3)](pluginData[_0x2e6bc0(0x3d0)],_0x2e6bc0(0x126),_0x374cd0=>{const _0x224789=_0x2e6bc0;VisuMZ['ConvertParams'](_0x374cd0,_0x374cd0);const _0x4405e0=_0x374cd0['id']()||0x1,_0x4e2761=_0x374cd0[_0x224789(0x10e)],_0x1c06f8=_0x374cd0['operand']()||0x0;let _0x45c790=$gameVariables[_0x224789(0x523)](_0x4405e0)||0x0;switch(_0x4e2761){case'=':_0x45c790=_0x1c06f8;break;case'+':_0x45c790+=_0x1c06f8;break;case'-':_0x45c790-=_0x1c06f8;break;case'*':_0x45c790*=_0x1c06f8;break;case'/':_0x45c790/=_0x1c06f8;break;case'%':_0x45c790%=_0x1c06f8;break;}_0x45c790=_0x45c790||0x0,$gameVariables[_0x224789(0x38c)](_0x4405e0,_0x45c790);}),VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2df)]=Scene_Boot['prototype'][_0x2e6bc0(0x25e)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x3d1ae0=_0x2e6bc0;VisuMZ[_0x3d1ae0(0x468)][_0x3d1ae0(0x2df)][_0x3d1ae0(0x895)](this),this[_0x3d1ae0(0x44f)](),this[_0x3d1ae0(0x716)](),this[_0x3d1ae0(0x79f)](),this[_0x3d1ae0(0x862)](),this[_0x3d1ae0(0x5aa)](),this[_0x3d1ae0(0x8aa)](),VisuMZ[_0x3d1ae0(0x3f9)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x894)]={},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x44f)]=function(){const _0x198747=_0x2e6bc0,_0x533df5=[_0x198747(0x4a4),_0x198747(0x1e9),_0x198747(0x5e3),_0x198747(0x227),_0x198747(0x149),_0x198747(0x34d),_0x198747(0x670),_0x198747(0x853)],_0x170bf7=['HIT',_0x198747(0x231),_0x198747(0x2ba),_0x198747(0x280),'MEV',_0x198747(0x3ec),_0x198747(0x1eb),_0x198747(0x197),'MRG',_0x198747(0x373)],_0x34fecd=[_0x198747(0x8a4),_0x198747(0x411),_0x198747(0x319),_0x198747(0x8c2),_0x198747(0x79b),_0x198747(0x3ef),_0x198747(0x896),_0x198747(0x5db),_0x198747(0x587),'EXR'],_0x1d0c29=[_0x533df5,_0x170bf7,_0x34fecd],_0x1e3afd=[_0x198747(0x22a),_0x198747(0x3c5),_0x198747(0x1ab),_0x198747(0x41c),_0x198747(0x6bf),_0x198747(0x1a3),_0x198747(0x132),_0x198747(0x476),_0x198747(0x21d),'Flat2'];for(const _0x1f6987 of _0x1d0c29){let _0x553948='';if(_0x1f6987===_0x533df5)_0x553948=_0x198747(0x85c);if(_0x1f6987===_0x170bf7)_0x553948='xparam';if(_0x1f6987===_0x34fecd)_0x553948=_0x198747(0x500);for(const _0x3a1938 of _0x1e3afd){let _0x4121ae=_0x198747(0x4ac)[_0x198747(0x607)](_0x553948,_0x3a1938);VisuMZ[_0x198747(0x468)][_0x198747(0x894)][_0x4121ae]=[],VisuMZ[_0x198747(0x468)]['RegExp'][_0x4121ae+'JS']=[];let _0x589b1c='<%1\x20%2:[\x20]';if([_0x198747(0x22a),_0x198747(0x476)][_0x198747(0x7fe)](_0x3a1938))_0x589b1c+=_0x198747(0x7d9);else{if([_0x198747(0x3c5),_0x198747(0x21d)]['includes'](_0x3a1938))_0x589b1c+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x198747(0x1ab),'Flat2'][_0x198747(0x7fe)](_0x3a1938))_0x589b1c+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x3a1938==='Max')_0x589b1c+='(\x5cd+)>';else{if(_0x3a1938===_0x198747(0x1a3))_0x589b1c+='(\x5cd+)([%％])>';else _0x3a1938===_0x198747(0x132)&&(_0x589b1c+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x172213 of _0x1f6987){let _0x79ccc=_0x3a1938['replace'](/[\d+]/g,'')[_0x198747(0x63e)]();const _0xcbb3a7=_0x589b1c[_0x198747(0x607)](_0x172213,_0x79ccc);VisuMZ[_0x198747(0x468)][_0x198747(0x894)][_0x4121ae][_0x198747(0x16c)](new RegExp(_0xcbb3a7,'i'));const _0x4161fc='<JS\x20%1\x20%2:[\x20](.*)>'[_0x198747(0x607)](_0x172213,_0x79ccc);VisuMZ['CoreEngine'][_0x198747(0x894)][_0x4121ae+'JS'][_0x198747(0x16c)](new RegExp(_0x4161fc,'i'));}}}},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x716)]=function(){const _0x4542f5=_0x2e6bc0;if(VisuMZ[_0x4542f5(0x3f9)])return;},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x79f)]=function(){const _0x41c282=_0x2e6bc0,_0x14838f=VisuMZ[_0x41c282(0x468)][_0x41c282(0x6ef)];_0x14838f[_0x41c282(0x818)][_0x41c282(0x24b)]&&VisuMZ[_0x41c282(0x88a)](!![]);_0x14838f[_0x41c282(0x818)][_0x41c282(0x4e2)]&&(Input[_0x41c282(0x639)][0x23]=_0x41c282(0x1c6),Input[_0x41c282(0x639)][0x24]=_0x41c282(0x207));if(_0x14838f[_0x41c282(0x51a)]){const _0x3e4230=_0x14838f[_0x41c282(0x51a)];_0x3e4230[_0x41c282(0x5e0)]=_0x3e4230[_0x41c282(0x5e0)]||_0x41c282(0x430),_0x3e4230[_0x41c282(0x81a)]=_0x3e4230['KeyTAB']||_0x41c282(0x4a5);}_0x14838f[_0x41c282(0x5c6)]['WASD']&&(Input[_0x41c282(0x639)][0x57]='up',Input[_0x41c282(0x639)][0x41]=_0x41c282(0x8b4),Input[_0x41c282(0x639)][0x53]=_0x41c282(0x218),Input['keyMapper'][0x44]=_0x41c282(0x31d),Input[_0x41c282(0x639)][0x45]='pagedown'),_0x14838f[_0x41c282(0x5c6)][_0x41c282(0x86d)]&&(Input[_0x41c282(0x639)][0x52]=_0x41c282(0x712)),_0x14838f[_0x41c282(0x2fc)][_0x41c282(0x641)]=_0x14838f['Param'][_0x41c282(0x641)]['map'](_0x38f946=>_0x38f946['toUpperCase']()[_0x41c282(0x679)]()),_0x14838f[_0x41c282(0x2fc)][_0x41c282(0x5b2)]=_0x14838f[_0x41c282(0x2fc)][_0x41c282(0x5b2)][_0x41c282(0x513)](_0x99a610=>_0x99a610[_0x41c282(0x63e)]()[_0x41c282(0x679)]()),_0x14838f[_0x41c282(0x818)][_0x41c282(0x4b8)]=_0x14838f[_0x41c282(0x818)][_0x41c282(0x4b8)]??!![],_0x14838f[_0x41c282(0x818)][_0x41c282(0x3f0)]=_0x14838f[_0x41c282(0x818)][_0x41c282(0x3f0)]??!![],_0x14838f[_0x41c282(0x51a)]['SplitEscape']&&VisuMZ[_0x41c282(0x468)][_0x41c282(0x82f)]();},VisuMZ['CoreEngine']['CheckSplitEscape']=function(){const _0x5bfc95=_0x2e6bc0;let _0x3973da=![],_0x6680e=![];for(let _0x2bf4b2 in Input['keyMapper']){const _0x468992=Input[_0x5bfc95(0x639)][_0x2bf4b2];if(_0x468992===_0x5bfc95(0x2cb))_0x3973da=!![];if(_0x468992===_0x5bfc95(0x709))_0x6680e=!![];if(_0x3973da&&_0x6680e)return;}let _0x2b211a='ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a';_0x2b211a+=_0x5bfc95(0x317),_0x2b211a+=_0x5bfc95(0x546),_0x2b211a+=_0x5bfc95(0x324),_0x2b211a+=_0x5bfc95(0x23c),alert(_0x2b211a),SceneManager['exit']();},Scene_Boot[_0x2e6bc0(0x5e2)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x1aac34=_0x2e6bc0;this[_0x1aac34(0x2e7)]();},Scene_Boot[_0x2e6bc0(0x5e2)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x565723=_0x2e6bc0,_0x3ec5f5=VisuMZ[_0x565723(0x468)]['Settings'][_0x565723(0x28b)];for(const _0xaa4002 of _0x3ec5f5){const _0x30b806=_0xaa4002[_0x565723(0x78b)]['replace'](/[ ]/g,''),_0x21abfb=_0xaa4002['CodeJS'];VisuMZ[_0x565723(0x468)]['createJsQuickFunction'](_0x30b806,_0x21abfb);}},VisuMZ['CoreEngine'][_0x2e6bc0(0x3ca)]=function(_0x455f56,_0x5f37aa){const _0x203908=_0x2e6bc0;if(!!window[_0x455f56]){if($gameTemp['isPlaytest']())console['log'](_0x203908(0x45d)[_0x203908(0x607)](_0x455f56));}const _0x4c4135=_0x203908(0x5cb)[_0x203908(0x607)](_0x455f56,_0x5f37aa);window[_0x455f56]=new Function(_0x4c4135);},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5aa)]=function(){const _0xd9d351=_0x2e6bc0,_0x290117=VisuMZ[_0xd9d351(0x468)][_0xd9d351(0x6ef)][_0xd9d351(0x176)];if(!_0x290117)return;for(const _0x315a5c of _0x290117){if(!_0x315a5c)continue;VisuMZ[_0xd9d351(0x468)][_0xd9d351(0x40b)](_0x315a5c);}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x70e)]={},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x75f)]={},VisuMZ['CoreEngine'][_0x2e6bc0(0xf3)]={},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x479)]={},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x40b)]=function(_0x186a97){const _0x298fbb=_0x2e6bc0,_0x3bfc34=_0x186a97['Abbreviation'],_0x487c8f=_0x186a97['ParamName'],_0x15ccd7=_0x186a97[_0x298fbb(0x5f2)],_0x53dcbf=_0x186a97[_0x298fbb(0x34f)],_0xffa71e=new Function(_0x186a97[_0x298fbb(0x15e)]);VisuMZ[_0x298fbb(0x468)][_0x298fbb(0x70e)][_0x3bfc34[_0x298fbb(0x63e)]()[_0x298fbb(0x679)]()]=_0x487c8f,VisuMZ[_0x298fbb(0x468)][_0x298fbb(0x75f)][_0x3bfc34['toUpperCase']()[_0x298fbb(0x679)]()]=_0x15ccd7,VisuMZ['CoreEngine'][_0x298fbb(0xf3)][_0x3bfc34[_0x298fbb(0x63e)]()[_0x298fbb(0x679)]()]=_0x53dcbf,VisuMZ[_0x298fbb(0x468)][_0x298fbb(0x479)][_0x3bfc34['toUpperCase']()[_0x298fbb(0x679)]()]=_0x3bfc34,Object[_0x298fbb(0x738)](Game_BattlerBase[_0x298fbb(0x5e2)],_0x3bfc34,{'get'(){const _0x43e652=_0x298fbb,_0x29d8cf=_0xffa71e[_0x43e652(0x895)](this);return _0x53dcbf===_0x43e652(0x11d)?Math[_0x43e652(0x897)](_0x29d8cf):_0x29d8cf;}});},VisuMZ['CoreEngine'][_0x2e6bc0(0x45e)]={},VisuMZ[_0x2e6bc0(0x468)]['ControllerMatches']={},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x8aa)]=function(){const _0x472509=_0x2e6bc0,_0x371c29=VisuMZ['CoreEngine']['Settings'][_0x472509(0x45e)];for(const _0x138552 of _0x371c29){const _0x502382=(_0x138552[_0x472509(0x281)]||'')[_0x472509(0x616)]()[_0x472509(0x679)](),_0x283a8d=(_0x138552[_0x472509(0x245)]||'')['toLowerCase']()[_0x472509(0x679)]();VisuMZ[_0x472509(0x468)]['ControllerButtons'][_0x502382]=_0x138552,VisuMZ[_0x472509(0x468)][_0x472509(0x73f)][_0x283a8d]=_0x502382;}},VisuMZ[_0x2e6bc0(0x3f9)]=function(){const _0x218c23=_0x2e6bc0;for(const _0x2b6f3f of $dataActors){if(_0x2b6f3f)VisuMZ[_0x218c23(0x88f)](_0x2b6f3f);}for(const _0x230a5a of $dataClasses){if(_0x230a5a)VisuMZ['ParseClassNotetags'](_0x230a5a);}for(const _0x52c04e of $dataSkills){if(_0x52c04e)VisuMZ[_0x218c23(0x3e6)](_0x52c04e);}for(const _0x2c6e30 of $dataItems){if(_0x2c6e30)VisuMZ[_0x218c23(0x881)](_0x2c6e30);}for(const _0x1a0eb8 of $dataWeapons){if(_0x1a0eb8)VisuMZ[_0x218c23(0x749)](_0x1a0eb8);}for(const _0x156cbe of $dataArmors){if(_0x156cbe)VisuMZ[_0x218c23(0x2ea)](_0x156cbe);}for(const _0x3397a0 of $dataEnemies){if(_0x3397a0)VisuMZ[_0x218c23(0x751)](_0x3397a0);}for(const _0x4ff46a of $dataStates){if(_0x4ff46a)VisuMZ[_0x218c23(0x838)](_0x4ff46a);}for(const _0xc8f89b of $dataTilesets){if(_0xc8f89b)VisuMZ[_0x218c23(0x81b)](_0xc8f89b);}},VisuMZ['ParseActorNotetags']=function(_0x1a88c2){},VisuMZ[_0x2e6bc0(0x7f4)]=function(_0x427548){},VisuMZ['ParseSkillNotetags']=function(_0xef32bd){},VisuMZ['ParseItemNotetags']=function(_0x422689){},VisuMZ['ParseWeaponNotetags']=function(_0x188cf5){},VisuMZ[_0x2e6bc0(0x2ea)]=function(_0x446e30){},VisuMZ[_0x2e6bc0(0x751)]=function(_0x53e1b2){},VisuMZ[_0x2e6bc0(0x838)]=function(_0x2d2308){},VisuMZ['ParseTilesetNotetags']=function(_0x2c046a){},VisuMZ['CoreEngine'][_0x2e6bc0(0x88f)]=VisuMZ[_0x2e6bc0(0x88f)],VisuMZ['ParseActorNotetags']=function(_0x418f9c){const _0x1b6c6a=_0x2e6bc0;VisuMZ[_0x1b6c6a(0x468)][_0x1b6c6a(0x88f)]['call'](this,_0x418f9c);const _0xc95355=_0x418f9c[_0x1b6c6a(0x6a8)];if(_0xc95355['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x418f9c[_0x1b6c6a(0x778)]=Number(RegExp['$1']);if(_0x418f9c['maxLevel']===0x0)_0x418f9c[_0x1b6c6a(0x778)]=Number['MAX_SAFE_INTEGER'];}_0xc95355[_0x1b6c6a(0x298)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x418f9c[_0x1b6c6a(0x3fa)]=Math['min'](Number(RegExp['$1']),_0x418f9c['maxLevel']));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x7f4)]=VisuMZ[_0x2e6bc0(0x7f4)],VisuMZ[_0x2e6bc0(0x7f4)]=function(_0x4d996f){const _0x50fad0=_0x2e6bc0;VisuMZ['CoreEngine']['ParseClassNotetags'][_0x50fad0(0x895)](this,_0x4d996f);if(_0x4d996f['learnings'])for(const _0x1b028f of _0x4d996f[_0x50fad0(0x3a8)]){_0x1b028f[_0x50fad0(0x6a8)][_0x50fad0(0x298)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x1b028f[_0x50fad0(0x4c0)]=Math[_0x50fad0(0x56f)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x751)]=VisuMZ[_0x2e6bc0(0x751)],VisuMZ['ParseEnemyNotetags']=function(_0x3ffe09){const _0x5afaee=_0x2e6bc0;VisuMZ[_0x5afaee(0x468)]['ParseEnemyNotetags'][_0x5afaee(0x895)](this,_0x3ffe09),_0x3ffe09['level']=0x1;const _0x2ba349=_0x3ffe09['note'];if(_0x2ba349[_0x5afaee(0x298)](/<LEVEL:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4c0)]=Number(RegExp['$1']);if(_0x2ba349['match'](/<MAXHP:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x0]=Number(RegExp['$1']);if(_0x2ba349['match'](/<MAXMP:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x1]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<ATK:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x2]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<DEF:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x3]=Number(RegExp['$1']);if(_0x2ba349['match'](/<MAT:[ ](\d+)>/i))_0x3ffe09['params'][0x4]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<MDF:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x5]=Number(RegExp['$1']);if(_0x2ba349['match'](/<AGI:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x6]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<LUK:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x4e6)][0x7]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<EXP:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x776)]=Number(RegExp['$1']);if(_0x2ba349[_0x5afaee(0x298)](/<GOLD:[ ](\d+)>/i))_0x3ffe09[_0x5afaee(0x855)]=Number(RegExp['$1']);},VisuMZ[_0x2e6bc0(0x468)]['Graphics_defaultStretchMode']=Graphics[_0x2e6bc0(0x4ae)],Graphics[_0x2e6bc0(0x4ae)]=function(){const _0x2f4b38=_0x2e6bc0;switch(VisuMZ[_0x2f4b38(0x468)][_0x2f4b38(0x6ef)][_0x2f4b38(0x818)][_0x2f4b38(0x65b)]){case _0x2f4b38(0x718):return!![];case _0x2f4b38(0x8a3):return![];default:return VisuMZ[_0x2f4b38(0x468)][_0x2f4b38(0x788)][_0x2f4b38(0x895)](this);}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x153)]=Graphics[_0x2e6bc0(0x508)],Graphics[_0x2e6bc0(0x508)]=function(_0x33c47e,_0x3f13c0,_0x848af0=null){const _0x132f39=_0x2e6bc0;VisuMZ[_0x132f39(0x468)][_0x132f39(0x153)]['call'](this,_0x33c47e,_0x3f13c0,_0x848af0),VisuMZ[_0x132f39(0x88a)](![]);},VisuMZ['CoreEngine'][_0x2e6bc0(0x36d)]=Graphics[_0x2e6bc0(0x7a3)],Graphics['_centerElement']=function(_0x1ef467){const _0x4c15dc=_0x2e6bc0;VisuMZ[_0x4c15dc(0x468)][_0x4c15dc(0x36d)][_0x4c15dc(0x895)](this,_0x1ef467),this['_centerElementCoreEngine'](_0x1ef467);},Graphics[_0x2e6bc0(0x34b)]=function(_0x509aad){const _0x486362=_0x2e6bc0;VisuMZ['CoreEngine'][_0x486362(0x6ef)][_0x486362(0x818)][_0x486362(0x537)]&&(_0x509aad[_0x486362(0x74e)][_0x486362(0x717)]=_0x486362(0x885));VisuMZ['CoreEngine'][_0x486362(0x6ef)][_0x486362(0x818)][_0x486362(0x569)]&&(_0x509aad['style'][_0x486362(0x275)]=_0x486362(0x880));const _0x1725fb=Math['max'](0x0,Math['floor'](_0x509aad[_0x486362(0x746)]*this['_realScale'])),_0x4a60e1=Math[_0x486362(0x56f)](0x0,Math[_0x486362(0x3ff)](_0x509aad[_0x486362(0x689)]*this[_0x486362(0x3b1)]));_0x509aad[_0x486362(0x74e)][_0x486362(0x746)]=_0x1725fb+'px',_0x509aad[_0x486362(0x74e)][_0x486362(0x689)]=_0x4a60e1+'px';},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x133)]=Bitmap['prototype'][_0x2e6bc0(0x571)],Bitmap['prototype'][_0x2e6bc0(0x571)]=function(_0x55d455,_0x326e7a){const _0x5e8c0f=_0x2e6bc0;VisuMZ[_0x5e8c0f(0x468)][_0x5e8c0f(0x133)]['call'](this,_0x55d455,_0x326e7a),this[_0x5e8c0f(0x5ef)]=!(VisuMZ[_0x5e8c0f(0x468)]['Settings'][_0x5e8c0f(0x818)][_0x5e8c0f(0x569)]??!![]);},Bitmap['prototype'][_0x2e6bc0(0x699)]=function(){const _0x410d20=_0x2e6bc0;this[_0x410d20(0x4e4)]=!![];},VisuMZ['CoreEngine'][_0x2e6bc0(0x7fd)]=Sprite['prototype'][_0x2e6bc0(0x1a5)],Sprite['prototype'][_0x2e6bc0(0x1a5)]=function(){const _0x3ac405=_0x2e6bc0;if(this[_0x3ac405(0x311)])VisuMZ['CoreEngine'][_0x3ac405(0x7fd)][_0x3ac405(0x895)](this);this[_0x3ac405(0x576)]();},Sprite[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x576)]=function(){const _0x167091=_0x2e6bc0;if(!this['bitmap'])return;if(!this[_0x167091(0x253)][_0x167091(0x4e4)])return;this[_0x167091(0x253)][_0x167091(0x5fb)]&&!this['_bitmap'][_0x167091(0x5fb)][_0x167091(0x150)]&&this[_0x167091(0x253)][_0x167091(0x1a5)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x57b)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x340)],Bitmap['prototype'][_0x2e6bc0(0x340)]=function(_0x580a26,_0x39430d){const _0x4046df=_0x2e6bc0;VisuMZ[_0x4046df(0x468)][_0x4046df(0x57b)]['call'](this,_0x580a26,_0x39430d),this[_0x4046df(0x699)]();},VisuMZ[_0x2e6bc0(0x468)]['Bitmap_blt']=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x40d)],Bitmap[_0x2e6bc0(0x5e2)]['blt']=function(_0x5f5717,_0x7eee7,_0x2f0190,_0x365265,_0x5cb8e5,_0xf3bc0e,_0x1b496f,_0x40eca3,_0x32ec9a){const _0x1635a2=_0x2e6bc0;_0x7eee7=Math[_0x1635a2(0x897)](_0x7eee7),_0x2f0190=Math[_0x1635a2(0x897)](_0x2f0190),_0x365265=Math['round'](_0x365265),_0x5cb8e5=Math['round'](_0x5cb8e5),_0xf3bc0e=Math[_0x1635a2(0x897)](_0xf3bc0e),_0x1b496f=Math[_0x1635a2(0x897)](_0x1b496f),VisuMZ[_0x1635a2(0x468)]['Bitmap_blt'][_0x1635a2(0x895)](this,_0x5f5717,_0x7eee7,_0x2f0190,_0x365265,_0x5cb8e5,_0xf3bc0e,_0x1b496f,_0x40eca3,_0x32ec9a),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x2e6bc0(0x2a3)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1e5)],Bitmap['prototype']['clearRect']=function(_0xa35412,_0x18b403,_0x424b0d,_0xb25659){const _0xd5db44=_0x2e6bc0;VisuMZ[_0xd5db44(0x468)][_0xd5db44(0x2a3)][_0xd5db44(0x895)](this,_0xa35412,_0x18b403,_0x424b0d,_0xb25659),this['markCoreEngineModified']();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4b2)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x762)],Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x762)]=function(_0x140f73,_0x1cc91e,_0xabab09,_0x224226,_0x373f3b){const _0x4b88d5=_0x2e6bc0;VisuMZ[_0x4b88d5(0x468)][_0x4b88d5(0x4b2)]['call'](this,_0x140f73,_0x1cc91e,_0xabab09,_0x224226,_0x373f3b),this['markCoreEngineModified']();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0xf5)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x31a)],Bitmap[_0x2e6bc0(0x5e2)]['strokeRect']=function(_0x1eb3c3,_0x225e58,_0x13a0ec,_0x5c962c,_0x14e8d7){const _0x1c55b6=_0x2e6bc0;VisuMZ[_0x1c55b6(0x468)][_0x1c55b6(0xf5)][_0x1c55b6(0x895)](this,_0x1eb3c3,_0x225e58,_0x13a0ec,_0x5c962c,_0x14e8d7),this['markCoreEngineModified']();},VisuMZ[_0x2e6bc0(0x468)]['Bitmap_gradientFillRect']=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x44d)],Bitmap['prototype'][_0x2e6bc0(0x44d)]=function(_0x589f7b,_0x3d8327,_0x4f84fc,_0x2df766,_0xa6abd0,_0x15160b,_0x5caa0c){const _0x220e9b=_0x2e6bc0;VisuMZ[_0x220e9b(0x468)][_0x220e9b(0x40f)][_0x220e9b(0x895)](this,_0x589f7b,_0x3d8327,_0x4f84fc,_0x2df766,_0xa6abd0,_0x15160b,_0x5caa0c),this[_0x220e9b(0x699)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1cf)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x88b)],Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x88b)]=function(_0x29c230,_0x3ee9c4,_0x1f4e7a,_0x41ab19){const _0x52384c=_0x2e6bc0;_0x29c230=Math['round'](_0x29c230),_0x3ee9c4=Math[_0x52384c(0x897)](_0x3ee9c4),_0x1f4e7a=Math[_0x52384c(0x897)](_0x1f4e7a),VisuMZ[_0x52384c(0x468)][_0x52384c(0x1cf)][_0x52384c(0x895)](this,_0x29c230,_0x3ee9c4,_0x1f4e7a,_0x41ab19),this['markCoreEngineModified']();},VisuMZ[_0x2e6bc0(0x468)]['Bitmap_measureTextWidth']=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x650)],Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x650)]=function(_0x4683cf){const _0x3adc74=_0x2e6bc0;return Math['ceil'](VisuMZ[_0x3adc74(0x468)][_0x3adc74(0x5bf)]['call'](this,_0x4683cf));},VisuMZ['CoreEngine'][_0x2e6bc0(0x414)]=Bitmap[_0x2e6bc0(0x5e2)]['drawText'],Bitmap['prototype'][_0x2e6bc0(0x41f)]=function(_0x4e388c,_0x53be34,_0x3984ea,_0x29c93c,_0x995bc9,_0x370cbb){const _0x2ebe34=_0x2e6bc0;_0x53be34=Math[_0x2ebe34(0x897)](_0x53be34),_0x3984ea=Math[_0x2ebe34(0x897)](_0x3984ea),_0x29c93c=Math[_0x2ebe34(0x539)](_0x29c93c),_0x995bc9=Math[_0x2ebe34(0x539)](_0x995bc9),VisuMZ[_0x2ebe34(0x468)]['Bitmap_drawText'][_0x2ebe34(0x895)](this,_0x4e388c,_0x53be34,_0x3984ea,_0x29c93c,_0x995bc9,_0x370cbb),this[_0x2ebe34(0x699)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x614)]=Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x844)],Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x844)]=function(_0x5845e2,_0x42ca95,_0x1552f3,_0x5c7e48){const _0x3b9d0b=_0x2e6bc0;VisuMZ['CoreEngine'][_0x3b9d0b(0x6ef)][_0x3b9d0b(0x818)][_0x3b9d0b(0x2fd)]?this[_0x3b9d0b(0x7c6)](_0x5845e2,_0x42ca95,_0x1552f3,_0x5c7e48):VisuMZ['CoreEngine'][_0x3b9d0b(0x614)]['call'](this,_0x5845e2,_0x42ca95,_0x1552f3,_0x5c7e48);},Bitmap[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7c6)]=function(_0x431f7c,_0x4ae85c,_0x24bf79,_0x499996){const _0x4457f8=_0x2e6bc0,_0x282e3e=this['context'];_0x282e3e[_0x4457f8(0x32b)]=this[_0x4457f8(0x107)],_0x282e3e[_0x4457f8(0x8a1)](_0x431f7c,_0x4ae85c+0x2,_0x24bf79+0x2,_0x499996);},VisuMZ['CoreEngine'][_0x2e6bc0(0x7ee)]=Input[_0x2e6bc0(0x1f1)],Input[_0x2e6bc0(0x1f1)]=function(){const _0x5888a7=_0x2e6bc0;VisuMZ[_0x5888a7(0x468)][_0x5888a7(0x7ee)][_0x5888a7(0x895)](this),this[_0x5888a7(0x541)]=undefined,this[_0x5888a7(0x44e)]=undefined,this[_0x5888a7(0x1d7)]=Input['keyRepeatWait'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x755)]=Input[_0x2e6bc0(0x645)],Input['update']=function(){const _0x3ec1b8=_0x2e6bc0;VisuMZ[_0x3ec1b8(0x468)]['Input_update'][_0x3ec1b8(0x895)](this);if(this['_gamepadWait'])this[_0x3ec1b8(0x1d7)]--;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6b7)]=Input[_0x2e6bc0(0x685)],Input[_0x2e6bc0(0x685)]=function(){const _0x1445ea=_0x2e6bc0;if(this[_0x1445ea(0x1d7)])return;VisuMZ[_0x1445ea(0x468)]['Input_pollGamepads']['call'](this);},VisuMZ['CoreEngine']['Input_setupEventHandlers']=Input[_0x2e6bc0(0x30b)],Input['_setupEventHandlers']=function(){const _0x1f6758=_0x2e6bc0;VisuMZ[_0x1f6758(0x468)][_0x1f6758(0x60b)][_0x1f6758(0x895)](this),document[_0x1f6758(0x1c1)](_0x1f6758(0x15d),this[_0x1f6758(0x6b1)][_0x1f6758(0x6e7)](this));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x146)]=Input[_0x2e6bc0(0x617)],Input[_0x2e6bc0(0x617)]=function(_0x54374d){const _0x1ef3aa=_0x2e6bc0;this[_0x1ef3aa(0x44e)]=_0x54374d[_0x1ef3aa(0x145)],VisuMZ[_0x1ef3aa(0x468)][_0x1ef3aa(0x146)][_0x1ef3aa(0x895)](this,_0x54374d),this[_0x1ef3aa(0x84d)](null);},Input[_0x2e6bc0(0x6b1)]=function(_0xad642f){const _0x543c16=_0x2e6bc0;this[_0x543c16(0x2f2)](_0xad642f);},Input[_0x2e6bc0(0x2f2)]=function(_0x217fae){const _0x33680e=_0x2e6bc0;this['_inputSpecialKeyCode']=_0x217fae[_0x33680e(0x145)];let _0x3d3b2a=String[_0x33680e(0x548)](_0x217fae['charCode']);this[_0x33680e(0x541)]===undefined?this[_0x33680e(0x541)]=_0x3d3b2a:this[_0x33680e(0x541)]+=_0x3d3b2a;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x48b)]=Input['_shouldPreventDefault'],Input[_0x2e6bc0(0x7b4)]=function(_0x2606fa){const _0x16dd5a=_0x2e6bc0;if(_0x2606fa===0x8)return![];return VisuMZ['CoreEngine'][_0x16dd5a(0x48b)]['call'](this,_0x2606fa);},Input[_0x2e6bc0(0x5b5)]=function(_0x537583){const _0x3cd611=_0x2e6bc0;if(_0x537583[_0x3cd611(0x298)](/backspace/i))return this[_0x3cd611(0x44e)]===0x8;if(_0x537583[_0x3cd611(0x298)](/enter/i))return this[_0x3cd611(0x44e)]===0xd;if(_0x537583[_0x3cd611(0x298)](/escape/i))return this[_0x3cd611(0x44e)]===0x1b;},Input[_0x2e6bc0(0x6d8)]=function(){const _0x103552=_0x2e6bc0;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x103552(0x44e)]);},Input[_0x2e6bc0(0x117)]=function(){const _0x3a3874=_0x2e6bc0;return[0x25,0x26,0x27,0x28][_0x3a3874(0x568)](this[_0x3a3874(0x44e)]);},Input[_0x2e6bc0(0x565)]=function(){const _0x2c3ec9=_0x2e6bc0;if(navigator[_0x2c3ec9(0x554)]){const _0x15b92c=navigator[_0x2c3ec9(0x554)]();if(_0x15b92c)for(const _0x385de0 of _0x15b92c){if(_0x385de0&&_0x385de0[_0x2c3ec9(0x2c4)])return!![];}}return![];},Input[_0x2e6bc0(0x2d9)]=function(){const _0x36f7eb=_0x2e6bc0;if(navigator[_0x36f7eb(0x554)]){const _0x35c234=navigator[_0x36f7eb(0x554)]();if(_0x35c234)for(const _0x36894a of _0x35c234){if(_0x36894a&&_0x36894a[_0x36f7eb(0x2c4)]){if(this[_0x36f7eb(0x6b9)](_0x36894a))return!![];if(this[_0x36f7eb(0x1e3)](_0x36894a))return!![];}}}return![];},Input[_0x2e6bc0(0x6b9)]=function(_0x2d3a75){const _0x4bfdef=_0x2e6bc0,_0x1fcba7=_0x2d3a75['buttons'];for(let _0x138577=0x0;_0x138577<_0x1fcba7[_0x4bfdef(0x29e)];_0x138577++){if(_0x1fcba7[_0x138577][_0x4bfdef(0x64d)])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x534346){const _0x166a88=_0x2e6bc0,_0x18427a=_0x534346[_0x166a88(0x86e)],_0x2ae073=0.5;if(_0x18427a[0x0]<-_0x2ae073)return!![];if(_0x18427a[0x0]>_0x2ae073)return!![];if(_0x18427a[0x1]<-_0x2ae073)return!![];if(_0x18427a[0x1]>_0x2ae073)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x10b2ee=_0x2e6bc0;return this[_0x10b2ee(0x57c)]||null;},Input['setLastGamepadUsed']=function(_0x1e44b2){this['_lastGamepad']=_0x1e44b2;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x5fa)]=Input[_0x2e6bc0(0x61b)],Input['_updateGamepadState']=function(_0x527e85){const _0x5a5693=_0x2e6bc0;VisuMZ[_0x5a5693(0x468)][_0x5a5693(0x5fa)]['call'](this,_0x527e85),(this[_0x5a5693(0x6b9)](_0x527e85)||this[_0x5a5693(0x1e3)](_0x527e85))&&this[_0x5a5693(0x84d)](_0x527e85);},Input[_0x2e6bc0(0x32d)]=function(){const _0xd9360b=_0x2e6bc0;return this[_0xd9360b(0x57c)]?this[_0xd9360b(0x57c)]['id']:_0xd9360b(0x8b8);},VisuMZ['CoreEngine'][_0x2e6bc0(0x62b)]=Tilemap[_0x2e6bc0(0x5e2)]['_addShadow'],Tilemap[_0x2e6bc0(0x5e2)]['_addShadow']=function(_0x484b54,_0x743eb0,_0x172718,_0x3efef8){const _0x4f6d31=_0x2e6bc0;if($gameMap&&$gameMap[_0x4f6d31(0x690)]())return;VisuMZ[_0x4f6d31(0x468)]['Tilemap_addShadow']['call'](this,_0x484b54,_0x743eb0,_0x172718,_0x3efef8);},Tilemap[_0x2e6bc0(0x49c)][_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2f7)]=function(){const _0x1d186c=_0x2e6bc0;this['_destroyInternalTextures']();for(let _0x2f417a=0x0;_0x2f417a<Tilemap['Layer'][_0x1d186c(0x6f9)];_0x2f417a++){const _0x2d1cd1=new PIXI['BaseTexture']();_0x2d1cd1['setSize'](0x800,0x800),VisuMZ[_0x1d186c(0x468)][_0x1d186c(0x6ef)][_0x1d186c(0x818)]['PixelateImageRendering']&&(_0x2d1cd1[_0x1d186c(0x891)]=PIXI[_0x1d186c(0x59e)][_0x1d186c(0x6fd)]),this['_internalTextures'][_0x1d186c(0x16c)](_0x2d1cd1);}},WindowLayer['prototype']['isMaskingEnabled']=function(){const _0x43dc1a=_0x2e6bc0;return SceneManager&&SceneManager[_0x43dc1a(0x49a)]?SceneManager[_0x43dc1a(0x49a)]['isWindowMaskingEnabled']():!![];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0xe1)]=WindowLayer[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x72c)],WindowLayer[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x72c)]=function render(_0x51f689){const _0x1887a9=_0x2e6bc0;this[_0x1887a9(0x3a2)]()?VisuMZ[_0x1887a9(0x468)][_0x1887a9(0xe1)][_0x1887a9(0x895)](this,_0x51f689):this[_0x1887a9(0x182)](_0x51f689);},WindowLayer[_0x2e6bc0(0x5e2)]['renderNoMask']=function render(_0x19e1cf){const _0x1ae5c1=_0x2e6bc0;if(!this['visible'])return;const _0x243839=new PIXI['Graphics'](),_0x33d3a1=_0x19e1cf['gl'],_0x22ae12=this[_0x1ae5c1(0x872)]['clone']();_0x19e1cf[_0x1ae5c1(0x62c)]['forceStencil'](),_0x243839[_0x1ae5c1(0x2f9)]=this[_0x1ae5c1(0x2f9)],_0x19e1cf['batch'][_0x1ae5c1(0x618)](),_0x33d3a1[_0x1ae5c1(0x785)](_0x33d3a1['STENCIL_TEST']);while(_0x22ae12[_0x1ae5c1(0x29e)]>0x0){const _0xfbf4c4=_0x22ae12['shift']();_0xfbf4c4['_isWindow']&&_0xfbf4c4['visible']&&_0xfbf4c4[_0x1ae5c1(0x73b)]>0x0&&(_0x33d3a1[_0x1ae5c1(0x741)](_0x33d3a1[_0x1ae5c1(0x315)],0x0,~0x0),_0x33d3a1[_0x1ae5c1(0x5e5)](_0x33d3a1['KEEP'],_0x33d3a1['KEEP'],_0x33d3a1['KEEP']),_0xfbf4c4[_0x1ae5c1(0x72c)](_0x19e1cf),_0x19e1cf[_0x1ae5c1(0x5ac)][_0x1ae5c1(0x618)](),_0x243839['clear'](),_0x33d3a1['stencilFunc'](_0x33d3a1[_0x1ae5c1(0x261)],0x1,~0x0),_0x33d3a1[_0x1ae5c1(0x5e5)](_0x33d3a1[_0x1ae5c1(0x413)],_0x33d3a1[_0x1ae5c1(0x413)],_0x33d3a1[_0x1ae5c1(0x413)]),_0x33d3a1[_0x1ae5c1(0x18c)](_0x33d3a1[_0x1ae5c1(0x5cf)],_0x33d3a1[_0x1ae5c1(0x262)]),_0x243839[_0x1ae5c1(0x72c)](_0x19e1cf),_0x19e1cf[_0x1ae5c1(0x5ac)][_0x1ae5c1(0x618)](),_0x33d3a1[_0x1ae5c1(0x18c)](_0x33d3a1[_0x1ae5c1(0x262)],_0x33d3a1[_0x1ae5c1(0x43a)]));}_0x33d3a1['disable'](_0x33d3a1['STENCIL_TEST']),_0x33d3a1[_0x1ae5c1(0x1f1)](_0x33d3a1['STENCIL_BUFFER_BIT']),_0x33d3a1['clearStencil'](0x0),_0x19e1cf[_0x1ae5c1(0x5ac)]['flush']();for(const _0x4d52da of this['children']){!_0x4d52da[_0x1ae5c1(0x811)]&&_0x4d52da[_0x1ae5c1(0x510)]&&_0x4d52da['render'](_0x19e1cf);}_0x19e1cf[_0x1ae5c1(0x5ac)][_0x1ae5c1(0x618)]();},DataManager['isKeyItem']=function(_0x4b5f63){const _0x758e3e=_0x2e6bc0;return this[_0x758e3e(0x806)](_0x4b5f63)&&_0x4b5f63[_0x758e3e(0x7b9)]===0x2;},VisuMZ['CoreEngine'][_0x2e6bc0(0x394)]=DataManager['setupNewGame'],DataManager[_0x2e6bc0(0x2a6)]=function(){const _0x153ae8=_0x2e6bc0;VisuMZ[_0x153ae8(0x468)][_0x153ae8(0x394)][_0x153ae8(0x895)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x153ae8(0x2f8)]();},DataManager[_0x2e6bc0(0x230)]=function(){const _0x16d80f=_0x2e6bc0;if($gameTemp['isPlaytest']()){const _0x5ab93a=VisuMZ[_0x16d80f(0x468)][_0x16d80f(0x6ef)][_0x16d80f(0x818)]['NewGameCommonEvent'];if(_0x5ab93a>0x0)$gameTemp[_0x16d80f(0x54c)](_0x5ab93a);}},DataManager[_0x2e6bc0(0x2f8)]=function(){const _0x429d7b=_0x2e6bc0,_0x215c6c=VisuMZ[_0x429d7b(0x468)][_0x429d7b(0x6ef)][_0x429d7b(0x818)]['NewGameCommonEventAll']||0x0;if(_0x215c6c>0x0)$gameTemp[_0x429d7b(0x54c)](_0x215c6c);},DataManager[_0x2e6bc0(0x5d7)]=function(_0x13f5fd){const _0x57380e=_0x2e6bc0,_0x21f8b4=$dataTroops[_0x13f5fd];if(!_0x21f8b4)return'';let _0x4bbb71='';_0x4bbb71+=_0x21f8b4['name'];for(const _0x39a142 of _0x21f8b4[_0x57380e(0x15a)]){for(const _0x168d9c of _0x39a142[_0x57380e(0x775)]){[0x6c,0x198][_0x57380e(0x7fe)](_0x168d9c['code'])&&(_0x4bbb71+='\x0a',_0x4bbb71+=_0x168d9c['parameters'][0x0]);}}return _0x4bbb71;};(VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x818)][_0x2e6bc0(0x4b5)]??!![])&&($scene=null,VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x13a)]=Scene_Base[_0x2e6bc0(0x5e2)]['create'],Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)]=function(){const _0x273e8e=_0x2e6bc0;VisuMZ[_0x273e8e(0x468)][_0x273e8e(0x13a)][_0x273e8e(0x895)](this),$scene=this;},$spriteset=null,VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x7de)]=Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)],Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)]=function(){const _0x4e8313=_0x2e6bc0;VisuMZ[_0x4e8313(0x468)][_0x4e8313(0x7de)][_0x4e8313(0x895)](this),$spriteset=this[_0x4e8313(0x722)];},VisuMZ[_0x2e6bc0(0x468)]['Scene_Battle_createSpriteset']=Scene_Battle['prototype'][_0x2e6bc0(0x628)],Scene_Battle['prototype'][_0x2e6bc0(0x628)]=function(){const _0x2052ed=_0x2e6bc0;VisuMZ['CoreEngine'][_0x2052ed(0x528)][_0x2052ed(0x895)](this),$spriteset=this[_0x2052ed(0x722)];},VisuMZ[_0x2e6bc0(0x468)]['Scene_Base_terminate']=Scene_Base[_0x2e6bc0(0x5e2)]['terminate'],Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x56c)]=function(){const _0x413462=_0x2e6bc0;VisuMZ[_0x413462(0x468)]['Scene_Base_terminate'][_0x413462(0x895)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x2e6bc0(0x675)]=BattleManager['update'],BattleManager[_0x2e6bc0(0x645)]=function(_0x3f8367){const _0x2ec368=_0x2e6bc0;VisuMZ[_0x2ec368(0x468)]['BattleManager_update']['call'](this,_0x3f8367),this[_0x2ec368(0x5e9)]();},BattleManager[_0x2e6bc0(0x5e9)]=function(){const _0x2bc0f4=_0x2e6bc0;$subject=this[_0x2bc0f4(0x848)],$targets=this[_0x2bc0f4(0x5c2)],$target=this[_0x2bc0f4(0x6b0)]||this[_0x2bc0f4(0x5c2)][0x0];},$event=null,VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x477)]=Game_Event[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x427)],Game_Event[_0x2e6bc0(0x5e2)]['start']=function(){const _0x4f1078=_0x2e6bc0;VisuMZ['CoreEngine']['Game_Event_start'][_0x4f1078(0x895)](this),$event=this;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2f4)]=Scene_Map[_0x2e6bc0(0x5e2)]['update'],Scene_Map['prototype'][_0x2e6bc0(0x645)]=function(){const _0x570e34=_0x2e6bc0;VisuMZ[_0x570e34(0x468)][_0x570e34(0x2f4)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x2e6bc0(0x5e2)]['updateCurrentEvent']=function(){const _0x21af98=_0x2e6bc0;!this[_0x21af98(0x86a)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x105b8b){const _0x42ca76=_0x2e6bc0;if($gameTemp)$gameTemp[_0x42ca76(0x54c)](_0x105b8b);});;function _0x2615(){const _0xbee267=['QUESTION_MARK','process_VisuMZ_CoreEngine_Settings','_height','KeyUnlisted','targetObjects','_centerElement','processCursorHomeEndTrigger','CorrectSkinBleeding','_anglePlus','GoldChange','isCollidedWithEvents','WIN_ICO_HELP','isBusy','paramX','displayY','scrollbarHeight','applyForcedGameTroopSettingsCoreEngine','_stored_mpGaugeColor1','createKeyJS','_backgroundFilter','ShowScrollBar','isCancelled','_shouldPreventDefault','updateSmoothScroll','titles1','createCustomBackgroundImages','buttonAssistOffset1','itypeId','_scrollDuration','etypeId','img/%1/','createFauxAnimation','members','_targetScaleX','ARRAYFUNC','optionsWindowRect','keyboard','registerCommand','command122','processCursorMoveModernControls','_drawTextShadow','DEFAULT_SHIFT_Y','isInputting','FontSize','_stored_mpGaugeColor2','dimColor1','updateLastTarget','currentClass','skipBranch','DetachBattlePictureContainer','getKeyboardInputButtonString','INSERT','Window_StatusBase_drawActorSimpleStatus','showPointAnimations','createPointAnimationTargets','Game_Unit_onBattleStart','buttonAreaHeight','Window_NumberInput_start','INSINE','([\x5c+\x5c-]\x5cd+)>','OutlineColorDmg','VisuMZ_2_BattleSystemETB','horzJS','isBottomButtonMode','Scene_Map_createSpriteset','DOUBLE_QUOTE','Game_Interpreter_command111','isActiveTpb','Pixelated','setClickHandler','MEV','Enable','Game_Action_itemEva','_viewportSize','setAnchor','OptionsRect','addOnceParallelInterpreter','saveViewport','drawCharacter','PLAY','Input_clear','_stored_gaugeBackColor','cursorRight','initButtonHidden','_mp','updateScrollBars','ParseClassNotetags','shouldAutosave','mute','PRESERVCONVERSION(%1)','_index','add','HelpBgType','TPB\x20ACTIVE','pitch','Sprite_destroy','includes','Mute','touchUI','toFixed','%1〘Choice\x20Cancel〙%1','createCancelButton','drawSegment','SETTINGS','isItem','DigitGroupingLocale','_stored_ctGaugeColor2','parse','focus','updatePositionCoreEngineShakeVert','exec','determineSideButtonLayoutValid','xparamPlus','context','_forcedTroopView','_isWindow','setActorHome','darwin','Game_Interpreter_PluginCommand','playBgm','_coreEasingType','HASH','QoL','_stored_hpGaugeColor1','KeyTAB','ParseTilesetNotetags','ColorMaxLvGauge2','repositionEnemiesByResolution','isSceneMap','clearForcedGameTroopSettingsCoreEngine','charging','Window_MapName_refresh','_stored_maxLvGaugeColor2','ConvertParams','_pauseSignSprite','xparamRateJS','checkPassage','createBuffer','NUMPAD9','commandWindowRows','tpCostColor','_colorCache','itemLineRect','WIN_OEM_ENLW','updateEffekseer','CheckSplitEscape','INOUTBOUNCE','mev','stypeId','DigitGroupingStandardText','useDigitGroupingEx','ctGaugeColor1','_onLoad','INELASTIC','ParseStateNotetags','Window_NameInput_cursorRight','offsetY','LEFT','alwaysDash','buttonAssistOffset5','processTouchModernControls','_pictureCoordinatesMode','_downArrowSprite','_categoryWindow','ExtractStrFromMap','Scene_Skill_create','_drawTextOutline','deactivate','TextManager_param','INOUTQUART','_subject','boxHeight','SCROLL_LOCK','_stored_expGaugeColor2','updateKeyText','setLastGamepadUsed','globalAlpha','WIN_OEM_CUSEL','DTB','IconSParam7','Window_Selectable_itemRect','LUK','down2','gold','Scene_Load','savefileInfo','ColorTPCost','apply','paramBase','PictureFilename','param','pan','getPointAnimationLayer','NUMPAD3','updateDuration','processKeyboardDigitChange','process_VisuMZ_CoreEngine_Functions','paramFlatJS','ColorHPGauge1','Window_SkillList_includes','ColorMPCost','isFullDocumentTitle','_mirror','EXECUTE','isEventRunning','_menuButton','runCombinedScrollingTextAsCode','DashToggleR','axes','uiAreaHeight','horizontal','return\x200','children','SParamVocab3','isAnimationPlaying','maxLvGaugeColor2','Window_Base_destroyContents','ParamMax','setSideButtonLayout','maxTurns','_image','Game_Picture_updateMove','Window_Scrollable_update','index','mainAreaHeightSideButtonLayout','writeFile','pixelated','ParseItemNotetags','log','OptionsBgType','_statusParamsWindow','none','Subtitle','Title','Sprite_Button_updateOpacity','Spriteset_Base_updatePosition','ShowDevTools','drawCircle','initVisuMZCoreEngine','isOptionValid','onload','ParseActorNotetags','moveMenuButtonSideButtonLayout','scaleMode','_currentBgs','create','RegExp','call','PDR','round','Scene_Title','Window_Gold_refresh','F15','clearTp','command355','_colorTone','_storedMapText','AutoScrollLockY','exportAllTroopStrings','fillText','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','normal','TGR','pageup','EVAL','NoTileShadows','buttonAssistText3','buttonAssistOffset4','process_VisuMZ_CoreEngine_ControllerButtons','SellBgType','WIN_OEM_FJ_TOUROKU','shake','smoothSelect','isMapScrollLinked','itemBackColor1','enemy','battlebacks2','_origin','left','setGuard','WIN_OEM_WSCTRL','_stored_expGaugeColor1','Keyboard','string','DOWN','_sellWindow','_backgroundSprite','createContents','Sprite_Battler_startMove','PositionX','faceHeight','isCursorMovable','PHA','WindowLayer_render','PTB','paramBaseAboveLevel99','makeFontSmaller','padZero','TitlePicButtons','isSideButtonLayout','_offsetY','loadMapData','createPointAnimationSprite','Game_Interpreter_updateWaitMode','createTileExtendSprites','maxPictures','_slotWindow','_hp','PictureCoordinatesMode','_phase','clearZoom','CustomParamType','framesMax','Bitmap_strokeRect','Window_NameInput_initialize','_saveFileID','COLON','encounterStep','CLOSE_BRACKET','substring','DamageColor','Game_Map_scrollRight','SParamVocab2','moveRelativeToResolutionChange','URL','gameTitle','_actorWindow','CtrlQuickLoad','_duration','valueOutlineWidth','TextCodeNicknames','outlineColor','centerSprite','Scene_MenuBase_createPageButtons','ExportStrFromAllTroops','IconSParam1','updatePointAnimations','_currentMap','operation','buttonAssistText2','BuyRect','startMove','loadBitmapCoreEngine','SkillTypeBgType','PIPE','INOUTBACK','updateData','isArrowPressed','item','_onceParallelInterpreters','turn','Game_BattlerBase_refresh','createCommandWindow','integer','slotWindowRect','loading','WIN_OEM_BACKTAB','buttonAssistText4','INQUART','centerX','_buyWindow','animationShouldMirror','VariableJsBlock','_targetAnchor','toString','doesNameContainBannedWords','Sprite_AnimationMV_processTimingData','successRate','_centerCameraCheck','drawActorNickname','Window_refreshBack','LATIN1','ColorMaxLvGauge1','getColor','Rate2','Bitmap_initialize','autoRemovalTiming','fontSize','ColorExpGauge2','Map%1.json','mainAreaBottom','setupScrollBarBitmap','Scene_Base_create','_closing','onClick','cursorUp','RIGHT','_shakeSpeed','RepositionEnemies','LESS_THAN','TextFmt','updateRotation','IconXParam1','keyCode','Input_onKeyDown','552190csysOV','BattleManager_checkSubstitute','MAT','checkSubstitute','isTouchedInsideFrame','platform','SELECT','applyEasing','GREATER_THAN','destroyed','DetachMapPictureContainer','randomJS','Graphics_printError','TextStr','_cache','setMute','_bgsBuffer','XParamVocab7','_shiftY','pages','drawGoldItemStyle','createChildSprite','keypress','ValueJS','optSideView','Sprite_Animation_processSoundTimings','pictureButtons','LoadMenu','isRepeated','volume','TranslucentOpacity','playEscape','bitmapHeight','_currentBgm','encounterStepsMinimum','NON_FRAME','Scene_Map_createSpriteset_detach','push','goldWindowRect','_sideButtonLayout','ARRAYNUM','Window_NameInput_refresh','buttonAssistWindowRect','onMoveEnd','Game_Map_scrollDown','terms','Game_Map_scrollUp','CustomParam','IconParam3','KeyItemProtect','setSkill','_coreEngineShakeStyle','standardIconWidth','_stored_systemColor','blockWidth','altKey','InputRect','OptionsMenu','storeMapData','renderNoMask','Game_Actor_paramBase','RightMenus','GoldOverlap','_muteSound','target','_textQueue','gainItem','DELETE','Game_System_initialize','blendFunc','onBattleStart','_refreshPauseSign','requestMotion','Game_Action_updateLastTarget','valueOutlineColor','checkCoreEngineDisplayCenter','isBottomHelpMode','exportAllMapStrings','CTB','Sprite_Picture_updateOrigin','HRG','scrollLeft','Game_Map_changeTileset','Spriteset_Base_destroy','F20','stop','updateMove','sv_actors','isHandled','expRate','Spriteset_Base_update','drawBackgroundRect','Rate1','ARRAYSTRUCT','destroy','MultiKeyFmt','this.paramBase(5)','seek','ColorExpGauge1','ParamChange','Plus2','paramRate','setupButtonImage','initCoreEasing','displayX','MIN_SAFE_INTEGER','initialBattleSystem','X:\x20%1','VOLUME_MUTE','Item-%1-%2','select','scrollX','BarOffset','loadTitle1','_targetOffsetY','ColSpacing','VOLUME_DOWN','createBackground','CrisisRate','_listWindow','CommandList','createDimmerSprite','addEventListener','XParamVocab4','XParamVocab5','removeTileExtendSprites','SaveMenu','end','AntiZoomPictures','Key%1','NUMPAD7','repeat','Game_Interpreter_command122','ItemBackColor1','mhp','createTextState','Bitmap_drawCircle','ColorNormal','DETACH_PICTURE_CONTAINER','OUTCIRC','_timerSprite','CIRCUMFLEX','WIN_ICO_CLEAR','animationId','_gamepadWait','TextJS','isPreserveTp','loadBitmap','cursorLeft','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawParamName','playTestShiftR','setupFont','Window_Base_initialize','itemSuccessRate','SParamVocab0','isGamepadAxisMoved','BarThickness','clearRect','StatusRect','F6key','MaxDuration','MAXMP','F16','CNT','lineHeight','itemBackColor2','Smooth','ShowJS','OUTQUINT','clear','windowPadding','_baseSprite','_hideTileShadows','targetScaleY','〘Common\x20Event\x20%1:\x20%2〙\x20End','_makeFontNameText','_url','_tpbChargeTime','Scene_Boot_startNormalGame','Window_NameInput_processHandling','actorWindowRect','paramRateJS','_eventId','Game_Picture_x','BattleSystem','worldTransform','BattleManager_processEscape','isMagical','Window_StatusBase_drawActorLevel','_stored_crisisColor','isMenuButtonAssistEnabled','home','isSmartEventCollisionOn','PGUP','replace','itemEva','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_moveEasingType','ActorMPColor','nah','Color','Gold','advanced','AccuracyBoost','setCommonEvent','_coreEasing','alignBottom','MRG','down','_lastScrollBarValues','_cacheScaleX','enabled','areButtonsHidden','Flat1','targetOpacity','xScrollLinkedOffset','SwitchToggleOne','helpAreaTopSideButtonLayout','Game_Action_numRepeats','playLoad','Game_Interpreter_command355','this.paramBase(','Window_Selectable_drawBackgroundRect','DEF','makeActionList','normalColor','Plus','BannedWords','SParamVocab5','BarBodyColor','updatePictureCoordinates','nextLevelExp','reservePlayTestNewGameCommonEvent','EVA','useFontWidthFix','IconXParam2','paramWidth','Scene_GameEnd_createBackground','isClosed','SideView','BTestArmors','_lastIconIndex','_active','_stored_hpGaugeColor2','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','ItemPadding','isMVAnimation','systemColor','asin','performMiss','IconXParam8','scrollUp','Window_Base_update','Match','paramchangeTextColor','isNextScene','checkSmartEventCollision','processCursorMove','targetBackOpacity','OpenConsole','drawGauge','PERCENT','EquipMenu','cursorDown','ColorDeath','STR','QUOTE','bitmap','StateIconsNonFrame','dummyWindowRect','paramRate2','OUTBOUNCE','StatusEquipRect','BasicParameterFormula','setBackgroundOpacity','makeInputButtonString','createExtendedTileSprite','setupRate','onDatabaseLoaded','updateBgsParameters','updateMainMultiply','ALWAYS','ONE','offOpacity','paramFlatBonus','xparam','Sprite_Animation_setViewport','contents','StatusParamsRect','subjectHitRate','ARRAYEVAL','_stored_powerDownColor','PreserveNumbers','processKeyboardEnd','ADD','OUTBACK','anglePlus','fadeSpeed','exit','drawGameTitle','setup','image-rendering','EncounterRateMinimum','PictureShowIcon','rgba(0,\x200,\x200,\x200.7)','VisuMZ_2_BattleSystemCTB','Scene_Boot_loadSystemImages','_scrollBarVert','INCIRC','origin','_fauxAnimationSprites','processEscape','CEV','Name','OUTELASTIC','_isPlaytest','moveCancelButtonSideButtonLayout','filters','PictureRotate','buyWindowRect','Game_Actor_levelUp','setViewport','INOUTCUBIC','jsQuickFunc','xparamFlatJS','Game_Temp_initialize','meVolume','getButtonAssistLocation','BottomHelp','_pagedownButton','ColorMPGauge2','updateOpen','AutoScrollLockX','setEvent','ctrlKey','setLastPluginCommandInterpreter','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','defaultInputMode','_cancelButton','removeOnceParallelInterpreter','buttonAssistOffset%1','length','Troop%1','SParameterFormula','_fauxAnimationQueue','_anchor','Bitmap_clearRect','animationNextDelay','_digitGrouping','setupNewGame','originalJS','_mainSprite','picture','Game_Map_scrollLeft','NUMPAD1','paramPlus','initRotation','processBack','buttonAssistWindowButtonRect','Sprite_AnimationMV_updatePosition','drawGameSubtitle','boxWidth','retrievePointAnimation','maxGold','Game_Battler_initTpbChargeTime','OutlineColor','_timeDuration','0.00','statusWindowRect','CRI','ScreenResolution','Game_Interpreter_command105','scrollDown','showIncompleteTilesetError','drawActorSimpleStatus','sparamPlus','consumeItem','Window_Base_createContents','constructor','connected','mainAreaHeight','PageChange','hpColor','windowRect','NUM_LOCK','isUseModernControls','menu','playtestQuickLoad','Mirror','_editWindow','SystemSetBattleSystem','Game_Picture_initRotation','_backSprite2','_buttonType','isPlaytest','OffBarOpacity','makeFontBigger','drawGameVersion','canEquip','adjustX','isGamepadTriggered','GetParamIcon','initBasic','needsUpdate','targetEvaRate','getTileExtendTerrainTags','Scene_Boot_onDatabaseLoaded','loadIconBitmap','Sprite_Actor_setActorHome','AdjustAngle','JSON','HIT','calcEasing','F11','process_VisuMZ_CoreEngine_jsQuickFunctions','Conditional\x20Branch\x20Script\x20Error','PLUS','ParseArmorNotetags','clamp','addWindow','ItemHeight','mainCommandWidth','Window_Selectable_processCursorMove','baseTextRect','OPEN_BRACKET','_registerKeyInput','shift','Scene_Map_update','Upper\x20Left','gaugeHeight','_createInternalTextures','reserveNewGameCommonEvent','transform','setTileFrame','numRepeats','Param','FontShadows','GoldIcon','escape','ALT','updatePosition','sparamPlus1','drawParamText','sparamPlus2','SystemLoadImages','Spriteset_Base_initialize','LoadError','clearCachedKeys','RPGMAKER_VERSION','CreateBattleSystemID','_setupEventHandlers','ActorRect','XParameterFormula','angle','isAnimationForEach','this.paramBase(1)','_texture','EXR','setViewportCoreEngineFix','indexOf','EQUAL','keys','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','setAction','REC','strokeRect','getCoreEngineScreenShakeStyle','ARRAYJSON','right','Padding','ColorCrisis','outbounce','Window_Base_drawText','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','SmartEventCollisionPriority','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','IconParam5','makeDocumentTitle','ColorMPGauge1','updateFauxAnimations','expParams','movePageButtonSideButtonLayout','fillStyle','_actor','getLastUsedGamepadType','INOUTSINE','processFauxAnimationRequests','FontWidthFix','title','createButtonAssistWindow','XParamVocab6','isScrollBarVisible','_playtestF7Looping','Scene_Map_initialize','isDying','switchModes','invokeCounterAttack','HELP','createMenuButton','itemHeight','RepositionEnemies130','vertical','backspace','resize','isTpb','OUTCUBIC','_buttonAssistWindow','_rate','AudioChangeBgsPan','updateFrameCoreEngine','XParamVocab8','retrieveFauxAnimation','_movementDuration','addLoadListener','_centerElementCoreEngine','F24','MDF','INBOUNCE','Type','Scene_Item_create','isAlive','PRINTSCREEN','setColorTone','updatePadding','StatusMenu','_repositioned','setEasingType','_dummyWindow','itemHit','_displayY','GroupDigits','Skill-%1-%2','maxScrollbar','Enemy','activate','F17','Scene_Map_createMenuButton','%1:\x20Exit\x20','tileWidth','_refreshBack','ForceNoPlayTest','_tileExtendSprites','endAction','removeFauxAnimation','18869587CQtwsJ','operand','isRightInputMode','CategoryRect','Graphics_centerElement','scrollbar','initDigitGrouping','standardIconHeight','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','executeLoad','TRG','scaleX','isOpening','SlotRect','maxScrollY','ExtractStrFromTroop','centerY','TILDE','xparamFlat1','SParamVocab6','changeAnglePlusData','TPB\x20WAIT','initMembers','quit','helpAreaHeight','erasePicture','damageColor','updateCoreEasing','categoryWindowRect','SwitchToggleRange','displayName','Window_NameInput_cursorUp','this.paramBase(3)','dimColor2','ItemStyle','setValue','Opacity','backgroundBitmap','F22','PictureEraseAll','getCustomBackgroundSettings','ScreenShake','_goldWindow','DataManager_setupNewGame','VOLUME_UP','buttonAssistWindowSideRect','updateBgmParameters','BgFilename1','DefaultMode','updateWaitMode','Scene_Boot_updateDocumentTitle','imageSmoothingEnabled','eventsXyNt','isEnabled','META','Scene_Shop_create','CANCEL','isMaskingEnabled','animationBaseDelay','DebugConsoleLastControllerID','updateScrollBarVisibility','OnLoadJS','updatePositionCoreEngineShakeRand','learnings','removeAnimationFromContainer','option','OffBarColor','EQUALS','setFrame','_commandWindow','thickness','drawCurrentParam','_realScale','Scene_Map_shouldAutosave','sparamFlatJS','Game_Actor_isPreserveTp','processPointAnimationRequests','RequireFocus','randomInt','AudioChangeBgsPitch','TextPopupShow','_stored_mpCostColor','drawActorIcons','LvExpGauge','refresh','33717hzkYNM','faces','atypeId','slice','Window_Selectable_processTouch','AMPERSAND','_battlerName','Plus1','DurationPerChat','setHome','createTilemap','_iconIndex','createJsQuickFunction','IconXParam3','playBgs','number','STB','Game_Map_setup','name','isItemStyle','RowSpacing','pointX','areButtonsOutsideMainUI','loadTileBitmap','XParamVocab2','setWindowPadding','_stored_powerUpColor','button','isSideView','_screenY','#%1','SwitchRandomizeOne','Center','buttonAssistText5','NameInputMessage','currentExp','_drawTextBody','Scene_Base_terminateAnimationClearBugFix','isNwjs','requestPointAnimation','ParseSkillNotetags','_animationQueue','Chance','_movementWholeDuration','WIN_OEM_COPY','tilesetNames','MRF','_tpbState','Actor','TCR','ShiftT_Toggle','RevertPreserveNumbers','BKSP','adjustSprite','DummyBgType','ExtJS','inBattle','_profileWindow','createFauxAnimationQueue','ParseAllNotetags','initialLevel','_pointAnimationSprites','WIN_OEM_PA2','ctrl','Game_Picture_y','floor','isLoopVertical','currencyUnit','paramName','paramValueByName','_targetX','playCursorSound','250901iLQpwT','_pictureCoordinatesWindow','BTestItems','%1〘End\x20Choice\x20Selection〙%1','SystemSetWindowPadding','createCustomParameter','listWindowRect','blt','loadSystemImages','Bitmap_gradientFillRect','FTB','GRD','_commonEventLayers','REPLACE','Bitmap_drawText','TimeProgress','refreshScrollBarBitmap','gaugeRate','removeChild','updatePositionCoreEngineShakeHorz','Scene_MenuBase_helpAreaTop','key%1','Max','_effectsContainer','createTitleButtons','drawText','DisplayLockY','gainGold','_mapY','_onError','isMaxLevel','skillTypeWindowRect','setMainFontSize','start','isPointAnimationPlaying','updatePictureSettings','drawTextEx','overallWidth','SceneManager_onKeyDown','numberShowButton','updateAnchor','resetTextColor','\x5c}❪SHIFT❫\x5c{','_pictureContainer','textHeight','sqrt','ItemRect','win32','%2%1%3','Scene_Map_updateMain','bgm','FUNC','ONE_MINUS_SRC_ALPHA','_data','showPicture','tilesets','test','DigitGroupingExText','split','smallParamFontSize','numActions','isTriggered','Game_Unit_onBattleEnd','CommonEventID','clearOnceParallelInterpreters','random','addChildToBack','TextCodeClassNames','show','Scene_Title_drawGameTitle','charAt','gradientFillRect','_inputSpecialKeyCode','process_VisuMZ_CoreEngine_RegExp','alphabetic','Window_Base_createTextState','tilesetFlags','tab','removeAllPointAnimations','onLoad','\x20this.','NameMenu','EnableNameInput','IconSParam0','_lastX','itemWindowRect','Game_Picture_updateRotation','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','ControllerButtons','loadGameImagesCoreEngine','padding','buttonAssistKey3','paintOpacity','innerHeight','ProfileBgType','ACCEPT','_CoreEngineSettings','setSideView','CoreEngine','Scene_Base_createWindowLayer','Weapon-%1-%2','getCombinedScrollingText','SEPARATOR','F23','yScrollLinkedOffset','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','overrideMimeType','BoxMargin','ASTERISK','_statusEquipWindow','SHIFT','SwitchRandomizeRange','Flat','Game_Event_start','measureTextWidthNoRounding','CustomParamAbb','Armor-%1-%2','_hideButtons','IconParam4','forceOutOfPlaytest','drawing','isClosing','loadWindowskin','_optionsWindow','isOpen','createDigits','paramPlusJS','showDevTools','paramMaxJS','command357','drawActorLevel','_allTextHeight','this.paramBase(0)','Input_shouldPreventDefault','VisuMZ_2_BattleSystemPTB','$dataMap','GoldFontSize','maxHorz','selectLast','_itemWindow','OutlineColorGauge','SplitEscape','Sprite_StateIcon_loadBitmap','Total','Game_Character_processMoveCommand','startAnimation','getControllerInputButtonMatch','xparamPlus2','_scene','Y:\x20%1','Renderer','cursorPagedown','Game_Picture_angle','updateFrame','onActorChange','Sprite_StateIcon_updateFrame','SEMICOLON','ShowActorLevel','MAXHP','\x5c}❪TAB❫\x5c{','pictures','onKeyDownKeysF6F7','_textPopupWindow','CategoryBgType','hpGaugeColor1','Linear','%1%2','skills','_defaultStretchMode','_loadingState','CancelText','UpdatePictureCoordinates','Bitmap_fillRect','buttonAssistText%1','\x0a\x0a\x0a\x0a\x0a','ShortcutScripts','Scene_Menu_create','ActorBgType','ShiftR_Toggle','makeAutoBattleActions','targetContentsOpacity','GameEnd','_lastPluginCommandInterpreter','equips','IconXParam6','Basic','level','pagedownShowButton','getBattleSystem','OPEN_PAREN','IconXParam9','isGameActive','setCoreEngineScreenShakeStyle','font','EditRect','mirror','sparamRate1','Sprite_Picture_loadBitmap','F7key','COMMA','_text','getLevel','DocumentTitleFmt','xdg-open','_animation','scaleY','MapNameTextCode','changeTileset','targetY','drawIcon','wait','scaleSprite','sceneTerminationClearEffects','Scene_Name_onInputOk','KANA','smooth','Game_Picture_initBasic','_displayedPassageError','_commandList','ENTER','ModernControls','_clientArea','_customModified','reduce','params','buttonAssistKey%1','createScrollBarSprites','processMoveCommand','onKeyDown','anchorCoreEasing','BACK_QUOTE','helpAreaBottom','SkillMenu','maxCols','_windowLayer','_displayX','_margin','isKeyItem','INOUTQUAD','pow','easingType','default','mapId','buttonAssistSwitch','ScaleY','updateScrollBarPosition','EnableJS','isActor','Scene_Map_updateScene','ColorManager_loadWindowskin','sparam','buttonY','EscapeAlways','iconWidth','_balloonQueue','removeAllFauxAnimations','windowOpacity','processDigitChange','printError','_windowskin','openURL','MAX_SAFE_INTEGER','original','close','Scene_Battle_update','Game_Picture_show','visible','outlineColorGauge','drawFace','map','subtitle','removePointAnimation','processKeyboardBackspace','_playTestFastMode','GoldRect','IDs','ButtonAssist','xparamPlusJS','SCROLLBAR','parseForcedGameTroopSettingsCoreEngine','1.10.0','LineHeight','drawValue','_opening','position','value','refreshWithTextCodeSupport','restore','RepositionActors','Sprite_Button_initialize','Scene_Battle_createSpriteset','missed','setBackgroundType','status','MODECHANGE','%1\x0a','SystemSetFontSize','_targetOffsetX','ESC','EditBgType','cos','deselect','processTouch','VisuMZ_2_BattleSystemSTB','bgmVolume','FontSmoothing','join','ceil','pagedown','_stored_tpGaugeColor2','createEnemies','_battleField','addAnimationSpriteToContainer','scale','SellRect','_inputString','maxLvGaugeColor1','Window_NameInput_cursorPagedown','INOUTELASTIC','maxVert','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','sparamFlat1','fromCharCode','Game_Action_setAttack','_bgmBuffer','playOnceParallelInterpreter','reserveCommonEvent','_refreshArrows','buttonAssistKey2','getControllerInputButtonString','Game_Troop_setup','Scene_Battle_createSpritesetFix','events','_clickHandler','getGamepads','mainAreaTop','numberWindowRect','textBaseline','VisuMZ_2_BattleSystemOTB','NUMPAD5','HOME','refreshDimmerBitmap','updateTransform','F14','Game_Picture_calcEasing','playOk','createAnimationSprite','updateMain','changeClass','_tileExtendTerrainTags','system','isGamepadConnected','Window_NameInput_cursorLeft','CTRL','contains','PixelateImageRendering','CLOSE_CURLY_BRACKET','loadTileset','terminate','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','ActorTPColor','max','INOUTEXPO','initialize','characters','MenuLayout','tpbAcceleration','framesPerChar','destroyCoreEngineMarkedBitmaps','isAutoColorAffected','updateOnceParallelInterpreters','onTpbCharged','SParamVocab4','Bitmap_resize','_lastGamepad','wtypeId','OS_KEY','outlineColorDmg','Window_Base_drawFace','remove','Game_Picture_move','_context','Map%1','subject','_forcedBattleGridSystem','FDR','MenuBg','TitleCommandList','maxScrollX','mainFontSize','BuyBgType','contentsOpacity','DimColor2','SceneManager_initialize','AudioChangeBgmPitch','FadeSpeed','viewport','QwertyLayout','iconHeight','_lastY','Scene_Battle_createSpriteset_detach','isNormalPriority','child_process','VariableEvalReference','current','refreshActor','hideButtonFromView','checkScrollBarBitmap','SCALE_MODES','Window_NumberInput_processDigitChange','enter','createPointAnimationQueue','sv_enemies','OTB','ColorPowerDown','bitmapWidth','setupCustomRateCoreEngine','makeDeepCopy','onerror','setCoreEngineUpdateWindowBg','process_VisuMZ_CoreEngine_CustomParameters','XParamVocab9','batch','〘Scrolling\x20Text〙\x0a','FINAL','WIN_OEM_FJ_MASSHOU','onEscapeSuccess','buttonAssistOffset2','ExtDisplayedParams','NUMPAD4','initCoreEngineScreenShake','isSpecialCode','_lastOrigin','_cacheScaleY','_mapX','isExpGaugeDrawn','ImprovedAccuracySystem','_pictureName','sellWindowRect','gaugeBackColor','END','Bitmap_measureTextWidth','filter','VisuMZ_2_BattleSystemBTB','_targets','applyCoreEasing','onInputBannedWords','makeCoreEngineCommandList','KeyboardInput','xparamFlatBonus','isAnimationOffsetXMirrored','useDigitGrouping','_mode','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','powerUpColor','applyEasingAnglePlus','parallaxes','ZERO','processHandling','translucentOpacity','sin','OUTQUART','15597JVEvOY','_scrollBarHorz','BlendMode','createTroopNote','HelpRect','pos','initRotationCoreEngine','MDR','_bypassCanCounterCheck','EXSEL','_encounterCount','Scene_MenuBase_mainAreaTop','KeySHIFT','prepare','prototype','ATK','ConvertToBase','stencilOp','BTB','Scene_Options_create','ExportAllTroopText','updateBattleVariables','getLastPluginCommandInterpreter','isEventTest','JsReplaceUserVar','Window_Base_drawCharacter','Scene_MenuBase_mainAreaHeight','_smooth','OPEN_CURLY_BRACKET','showFauxAnimations','Icon','resetFontSettings','currentLevelExp','expGaugeColor1','Scene_Map_createSpritesetFix','tileHeight','setDisplayPos','text','Input_updateGamepadState','_baseTexture','framesMin','SideButtons','SceneManager_exit','textSizeEx','_shakeDuration','ETB','drawAllParams','ButtonHeight','VisuMZ_2_BattleSystemFTB','onButtonImageLoad','measureText','format','_patternHeight','onInputOk','tpGaugeColor2','Input_setupEventHandlers','ExportAllMapText','Window_Selectable_cursorUp','WIN_OEM_FINISH','WIN_OEM_FJ_ROYA','StatusParamsBgType','updateDashToggle','CallHandlerJS','OUTSINE','Bitmap_drawTextOutline','result','toLowerCase','_onKeyDown','flush','hasEncryptedImages','checkCacheKey','_updateGamepadState','OUTEXPO','seVolume','goto','onlyfilename','text%1','_destroyCanvas','currentValue','GoldMax','baseId','gainSilentTp','Game_Party_consumeItem','DECIMAL','createSpriteset','AnimationID','TAB','Tilemap_addShadow','framebuffer','Duration','targets','SLEEP','Power','cursorPageup','ItemMenu','move','createSubSprite','Manual','Exported_Script_%1.txt','itemPadding','textColor','keyMapper','ColorTPGauge1','helpWindowRect','get','ATTN','toUpperCase','contentsBack','sparamRate2','DisplayedParams','_list','this.paramBase(2)','_upArrowSprite','update','vertJS','Class-%1-%2','BattleManager_invokeCounterAttack','Sprite_Gauge_currentValue','Spriteset_Battle_createEnemies','SParamVocab8','SUBTRACT','pressed','WIN_OEM_PA1','drawNewParam','measureTextWidth','horz','HYPHEN_MINUS','save','toLocaleString','4088iiPwTL','_tile','3518370jDHRqE','setHandler','IconXParam0','commandWindowRect','AutoStretch','updatePositionCoreEngine','ColorCTGauge1','maxTp','makeCommandList','_tempActor','_stored_ctGaugeColor1','Control\x20Variables\x20Script\x20Error','_statusWindow','Window_NameInput_cursorDown','playBuzzer','Game_Event_isCollidedWithEvents','traitObjects','MinDuration','Window_EquipItem_isEnabled','Scene_MenuBase_createCancelButton','_skillTypeWindow','textWidth','guardSkillId','openingSpeed','backOpacity','AGI','gaugeLineHeight','BTestAddedQuantity','updateClose','_numberWindow','BattleManager_update','battlerHue','_number','targetScaleX','trim','SystemLoadAudio','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','makeTargetSprites','description','maxItems','CommandBgType','getColorDataFromPluginParameters','_maxDigits','ZOOM','playTestShiftT','NUMPAD2','_pollGamepads','traitsPi','opacity','processSoundTimings','height','coreEngineRepositionEnemies','Scene_Equip_create','evaluate','setBattleSystem','isOpenAndActive','rgba(0,\x200,\x200,\x201.0)','areTileShadowsHidden','buttonAssistOk','buttonAssistKey5','levelUpRecovery','ShowItemBackground','IconSParam8','refreshSpritesetForExtendedTiles','ShopMenu','offsetX','markCoreEngineModified','min','drawActorExpGauge','parameters','duration','ListBgType','212aeVdSQ','open','SParamVocab1','this.paramBase(7)','playTestF6','targetSpritePosition','command105','createPageButtons','wholeDuration','note','_lastCommandSymbol','animations','EndingID','BgFilename2','Sprite_Gauge_gaugeRate','Window_NameInput_processTouch','isWindowMaskingEnabled','_target','_onKeyPress','DrawIcons','nw.gui','VisuMZ_4_UniqueTileEffects','endAnimation','_screenX','Input_pollGamepads','maxBattleMembers','isGamepadButtonPressed','Window_ShopSell_isEnabled','Game_BattlerBase_initMembers','_backSprite1','StartID','tileset','Rate','EnableNumberInput','_inputWindow','drawItem','Window_Base_drawIcon','alpha','Game_Action_itemHit','DisplayLockX','StatusBgType','initTpbChargeTime','updateText','drawIconBySize','levelUp','_digitGroupingEx','eva','targetPosition','stringKeyMap','IconSet','updatePositionCoreEngineShakeOriginal','xparamRate','buttonAssistKey1','destroyScrollBarBitmaps','_startPlaying','version','AudioChangeBgmPan','isNumpadPressed','code','createTextPopupWindow','AnimationMirrorOffset','recoverAll','adjustBoxSize','_pointAnimationQueue','allowShiftScrolling','Game_Picture_scaleX','ExtractStrFromList','ctGaugeColor2','Window_Selectable_cursorDown','VisuMZ_1_BattleCore','updateDocumentTitle','ImgLoad','bind','addChild','textAlign','buttonAssistCancel','NewGameBoot','Spriteset_Base_isAnimationPlaying','maxVisibleItems','10hcuzdr','Settings','INOUTCIRC','playCursor','LINEAR','PictureEraseRange','EISU','buttonAssistText1','up2','_tileSprite','CommandRect','MAX_GL_TEXTURES','setTopRow','processKeyboardDelete','nickname','NEAREST','initCoreEngine','Tilemap_addSpotTile','_targetOpacity','isPhysical','_helpWindow','isTileExtended','anchor','getInputMultiButtonStrings','ConvertNumberToString','Enemy-%1-%2','INBACK','cancel','updateAnglePlus','INOUTQUINT','destroyContents','Page','CustomParamNames','createFauxAnimationSprite','_isButtonHidden','endBattlerActions','dashToggle','and\x20add\x20it\x20onto\x20this\x20one.','ExportString','_forcedBattleSys','process_VisuMZ_CoreEngine_Notetags','font-smooth','stretch','App','layoutSettings','Scene_Battle_createCancelButton','_dimmerSprite','repositionCancelButtonSideButtonLayout','ApplyEasing','3437106oYRNzu','concat','send','_spriteset','zoomScale','processTimingData','setAttack','calcCoreEasing','3sWEHXU','isLoopHorizontal','_scaleY','addCommand','inbounce','render','setupTileExtendTerrainTags','DOLLAR','SceneManager_isGameActive','_inBattle','enemies','offColor','Scene_Name_create','allTiles','changeTextColor','offset','scrollY','defineProperty','centerCameraCheckData','IconXParam7','openness','processAlwaysEscape','popScene','Unnamed','ControllerMatches','_width','stencilFunc','CONTEXT_MENU','PRINT','BgType','editWindowRect','width','helpAreaTop','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','ParseWeaponNotetags','itemHitImprovedAccuracy','Game_Actor_changeClass','resetBattleSystem','targetX','style','titles2','setAnglePlusData','ParseEnemyNotetags','startNormalGame','isPressed','PA1','Input_update','initMembersCoreEngine','SystemSetSideView','catchNormalError','createPointAnimation','ActorHPColor','mainAreaTopSideButtonLayout','IconSParam2','NUM','Finish','CustomParamIcons','updateOrigin','arePageButtonsEnabled','fillRect','Scene_Map_updateMainMultiply','type','inputWindowRect','updateOpacity','ListRect','_pageupButton','setupCoreEngine','getInputButtonString','catchLoadError','Symbol','GoldBgType','Window','isSceneBattle','_shakePower','_tilemap','Scene_SingleLoadTransition','bodyColor','BlurFilter','list','exp','ColorSystem','maxLevel','ItemBackColor2','DummyRect','Untitled','center','IconParam7','ENTER_SPECIAL','mpGaugeColor1','actor','addQueue','attackSkillId','AllMaps','ExportCurTroopText','enable','NUMPAD8','redraw','Graphics_defaultStretchMode','OUTQUAD','skillTypes','FunctionName','innerWidth','statusParamsWindowRect','_stypeId','DrawItemBackgroundJS','_originalViewport','_srcBitmap','Location','adjustPictureAntiZoom','paramY','_offsetX','pop','powerDownColor','setMoveEasingType','Wait','BackOpacity','MCR','xparamPlus1','PictureID'];_0x2615=function(){return _0xbee267;};return _0x2615();}$onceParallel=function(_0x7a1381,_0xe1a594){const _0x5e18c3=_0x2e6bc0;if(SceneManager[_0x5e18c3(0x81e)]())SceneManager[_0x5e18c3(0x49a)][_0x5e18c3(0x54b)](_0x7a1381,_0xe1a594);else{if(SceneManager[_0x5e18c3(0x76f)]()){if(Imported[_0x5e18c3(0x6e4)])SceneManager[_0x5e18c3(0x49a)][_0x5e18c3(0x54b)](_0x7a1381);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x5e18c3(0x8a2));}else $gameTemp&&$gameTemp[_0x5e18c3(0x2d3)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}},StorageManager['jsonToZip']=function(_0x1f4bc6){return new Promise((_0x35c141,_0x54d6a)=>{const _0x9cbd39=_0x545e;try{const _0x37c503=pako['deflate'](_0x1f4bc6,{'to':_0x9cbd39(0x8b9),'level':0x1});if(_0x37c503['length']>=0xc350){}_0x35c141(_0x37c503);}catch(_0x3c6156){_0x54d6a(_0x3c6156);}});},TextManager[_0x2e6bc0(0x6cf)]=['','','',_0x2e6bc0(0x3a1),'','',_0x2e6bc0(0x33a),'','BACKSPACE',_0x2e6bc0(0x62a),'','','CLEAR',_0x2e6bc0(0x4e1),_0x2e6bc0(0x77e),'',_0x2e6bc0(0x474),_0x2e6bc0(0x567),_0x2e6bc0(0x300),'PAUSE','CAPSLOCK',_0x2e6bc0(0x4dc),_0x2e6bc0(0x6f4),'JUNJA',_0x2e6bc0(0x5ae),'HANJA','',_0x2e6bc0(0x530),'CONVERT','NONCONVERT',_0x2e6bc0(0x465),_0x2e6bc0(0x52c),'SPACE',_0x2e6bc0(0x209),'PGDN',_0x2e6bc0(0x5be),_0x2e6bc0(0x55a),_0x2e6bc0(0x83b),'UP',_0x2e6bc0(0x13e),_0x2e6bc0(0x8ba),_0x2e6bc0(0x14d),_0x2e6bc0(0x743),_0x2e6bc0(0x869),_0x2e6bc0(0x352),_0x2e6bc0(0x7d1),_0x2e6bc0(0x18a),'','0','1','2','3','4','5','6','7','8','9',_0x2e6bc0(0xf8),_0x2e6bc0(0x4a2),_0x2e6bc0(0x141),_0x2e6bc0(0x3ac),_0x2e6bc0(0x14f),_0x2e6bc0(0x79e),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2e6bc0(0x57e),'',_0x2e6bc0(0x742),'',_0x2e6bc0(0x62f),'NUMPAD0',_0x2e6bc0(0x2ab),_0x2e6bc0(0x684),_0x2e6bc0(0x85f),_0x2e6bc0(0x5b3),_0x2e6bc0(0x559),'NUMPAD6',_0x2e6bc0(0x1c9),_0x2e6bc0(0x786),_0x2e6bc0(0x828),'MULTIPLY',_0x2e6bc0(0x26e),_0x2e6bc0(0x46c),_0x2e6bc0(0x64c),_0x2e6bc0(0x627),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x2e6bc0(0x2e6),'F12','F13',_0x2e6bc0(0x55d),_0x2e6bc0(0x89a),_0x2e6bc0(0x1ea),_0x2e6bc0(0x360),'F18','F19',_0x2e6bc0(0x19b),'F21',_0x2e6bc0(0x38f),_0x2e6bc0(0x46d),_0x2e6bc0(0x34c),'','','','','','','','',_0x2e6bc0(0x2c9),_0x2e6bc0(0x84a),'WIN_OEM_FJ_JISHO',_0x2e6bc0(0x5af),_0x2e6bc0(0x8ac),'WIN_OEM_FJ_LOYA',_0x2e6bc0(0x60f),'','','','','','','','','',_0x2e6bc0(0x1d4),'EXCLAMATION',_0x2e6bc0(0x7df),_0x2e6bc0(0x817),_0x2e6bc0(0x72e),_0x2e6bc0(0x24d),_0x2e6bc0(0x3c3),'UNDERSCORE',_0x2e6bc0(0x4c3),'CLOSE_PAREN',_0x2e6bc0(0x472),_0x2e6bc0(0x2e9),_0x2e6bc0(0x114),_0x2e6bc0(0x652),_0x2e6bc0(0x5f0),_0x2e6bc0(0x56a),_0x2e6bc0(0x37a),'','','','',_0x2e6bc0(0x1b3),_0x2e6bc0(0x1bb),_0x2e6bc0(0x395),'','',_0x2e6bc0(0x4a2),_0x2e6bc0(0x3ac),_0x2e6bc0(0x4cd),'MINUS','PERIOD','SLASH',_0x2e6bc0(0x4ec),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2e6bc0(0x2f1),'BACK_SLASH',_0x2e6bc0(0xfa),_0x2e6bc0(0x252),'',_0x2e6bc0(0x39f),'ALTGR','',_0x2e6bc0(0x7a9),'WIN_ICO_00','',_0x2e6bc0(0x1d5),'','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x2e6bc0(0x64e),_0x2e6bc0(0x3fc),'WIN_OEM_PA3',_0x2e6bc0(0x8b6),_0x2e6bc0(0x84f),'WIN_OEM_ATTN',_0x2e6bc0(0x60e),_0x2e6bc0(0x3ea),'WIN_OEM_AUTO',_0x2e6bc0(0x82d),_0x2e6bc0(0x120),_0x2e6bc0(0x63d),'CRSEL',_0x2e6bc0(0x5dd),'EREOF',_0x2e6bc0(0x7ed),_0x2e6bc0(0x682),'',_0x2e6bc0(0x754),'WIN_OEM_CLEAR',''],TextManager[_0x2e6bc0(0x691)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x51a)]['OkText'],TextManager[_0x2e6bc0(0x6ea)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x51a)][_0x2e6bc0(0x4b0)],TextManager[_0x2e6bc0(0x4f9)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x51a)]['SwitchActorText'],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x846)]=TextManager['param'],TextManager[_0x2e6bc0(0x85c)]=function(_0x15a816){const _0x1ce4d6=_0x2e6bc0;return typeof _0x15a816===_0x1ce4d6(0x3cd)?VisuMZ[_0x1ce4d6(0x468)][_0x1ce4d6(0x846)][_0x1ce4d6(0x895)](this,_0x15a816):this[_0x1ce4d6(0x402)](_0x15a816);},TextManager[_0x2e6bc0(0x402)]=function(_0x2ef155){const _0x3c1fca=_0x2e6bc0;_0x2ef155=String(_0x2ef155||'')[_0x3c1fca(0x63e)]();const _0x5c7dde=VisuMZ['CoreEngine'][_0x3c1fca(0x6ef)][_0x3c1fca(0x2fc)];if(_0x2ef155===_0x3c1fca(0x4a4))return $dataSystem[_0x3c1fca(0x174)][_0x3c1fca(0x4e6)][0x0];if(_0x2ef155===_0x3c1fca(0x1e9))return $dataSystem[_0x3c1fca(0x174)][_0x3c1fca(0x4e6)][0x1];if(_0x2ef155===_0x3c1fca(0x5e3))return $dataSystem[_0x3c1fca(0x174)]['params'][0x2];if(_0x2ef155===_0x3c1fca(0x227))return $dataSystem[_0x3c1fca(0x174)][_0x3c1fca(0x4e6)][0x3];if(_0x2ef155==='MAT')return $dataSystem['terms'][_0x3c1fca(0x4e6)][0x4];if(_0x2ef155===_0x3c1fca(0x34d))return $dataSystem[_0x3c1fca(0x174)][_0x3c1fca(0x4e6)][0x5];if(_0x2ef155===_0x3c1fca(0x670))return $dataSystem['terms']['params'][0x6];if(_0x2ef155==='LUK')return $dataSystem['terms']['params'][0x7];if(_0x2ef155===_0x3c1fca(0x2e4))return _0x5c7dde['XParamVocab0'];if(_0x2ef155===_0x3c1fca(0x231))return _0x5c7dde['XParamVocab1'];if(_0x2ef155===_0x3c1fca(0x2ba))return _0x5c7dde[_0x3c1fca(0x3d6)];if(_0x2ef155==='CEV')return _0x5c7dde['XParamVocab3'];if(_0x2ef155===_0x3c1fca(0x7e4))return _0x5c7dde[_0x3c1fca(0x1c2)];if(_0x2ef155===_0x3c1fca(0x3ec))return _0x5c7dde[_0x3c1fca(0x1c3)];if(_0x2ef155===_0x3c1fca(0x1eb))return _0x5c7dde[_0x3c1fca(0x333)];if(_0x2ef155===_0x3c1fca(0x197))return _0x5c7dde[_0x3c1fca(0x158)];if(_0x2ef155===_0x3c1fca(0x217))return _0x5c7dde[_0x3c1fca(0x347)];if(_0x2ef155===_0x3c1fca(0x373))return _0x5c7dde[_0x3c1fca(0x5ab)];if(_0x2ef155==='TGR')return _0x5c7dde[_0x3c1fca(0x1e2)];if(_0x2ef155==='GRD')return _0x5c7dde[_0x3c1fca(0x6a1)];if(_0x2ef155===_0x3c1fca(0x319))return _0x5c7dde[_0x3c1fca(0xfe)];if(_0x2ef155==='PHA')return _0x5c7dde[_0x3c1fca(0x873)];if(_0x2ef155===_0x3c1fca(0x79b))return _0x5c7dde[_0x3c1fca(0x57a)];if(_0x2ef155===_0x3c1fca(0x3ef))return _0x5c7dde[_0x3c1fca(0x22c)];if(_0x2ef155===_0x3c1fca(0x896))return _0x5c7dde[_0x3c1fca(0x37c)];if(_0x2ef155==='MDR')return _0x5c7dde['SParamVocab7'];if(_0x2ef155===_0x3c1fca(0x587))return _0x5c7dde[_0x3c1fca(0x64b)];if(_0x2ef155==='EXR')return _0x5c7dde['SParamVocab9'];if(VisuMZ[_0x3c1fca(0x468)][_0x3c1fca(0x70e)][_0x2ef155])return VisuMZ[_0x3c1fca(0x468)][_0x3c1fca(0x70e)][_0x2ef155];return'';},TextManager[_0x2e6bc0(0x76a)]=function(_0x57a330){const _0x2733fe=_0x2e6bc0,_0x4e8a26=Input[_0x2733fe(0x32d)]();return _0x4e8a26===_0x2733fe(0x8b8)?this['getKeyboardInputButtonString'](_0x57a330):this[_0x2733fe(0x54f)](_0x4e8a26,_0x57a330);},TextManager[_0x2e6bc0(0x7d0)]=function(_0x33fb67){const _0x2dceea=_0x2e6bc0;let _0x2f7af1=VisuMZ['CoreEngine'][_0x2dceea(0x6ef)][_0x2dceea(0x51a)][_0x2dceea(0x493)];if(!_0x2f7af1){if(_0x33fb67===_0x2dceea(0x709))_0x33fb67=_0x2dceea(0x2ff);if(_0x33fb67===_0x2dceea(0x2cb))_0x33fb67='escape';}let _0x19b120=[];for(let _0x27d166 in Input['keyMapper']){_0x27d166=Number(_0x27d166);if(_0x27d166>=0x60&&_0x27d166<=0x69)continue;if([0x12,0x20][_0x2dceea(0x7fe)](_0x27d166))continue;_0x33fb67===Input['keyMapper'][_0x27d166]&&_0x19b120[_0x2dceea(0x16c)](_0x27d166);}for(let _0x51891c=0x0;_0x51891c<_0x19b120[_0x2dceea(0x29e)];_0x51891c++){_0x19b120[_0x51891c]=TextManager[_0x2dceea(0x6cf)][_0x19b120[_0x51891c]];}return this[_0x2dceea(0x25b)](_0x19b120);},TextManager[_0x2e6bc0(0x25b)]=function(_0x239c76){const _0x3253ed=_0x2e6bc0,_0x30a615=VisuMZ['CoreEngine'][_0x3253ed(0x6ef)][_0x3253ed(0x51a)],_0x1d6d92=_0x30a615[_0x3253ed(0x7a1)];let _0x1839e8='';if(_0x239c76[_0x3253ed(0x7fe)]('UP'))_0x1839e8='UP';else{if(_0x239c76[_0x3253ed(0x7fe)]('DOWN'))_0x1839e8='DOWN';else{if(_0x239c76['includes'](_0x3253ed(0x83b)))_0x1839e8=_0x3253ed(0x83b);else _0x239c76['includes']('RIGHT')?_0x1839e8=_0x3253ed(0x13e):_0x1839e8=_0x239c76[_0x3253ed(0x796)]();}}const _0x5f5659=_0x3253ed(0x1c8)[_0x3253ed(0x607)](_0x1839e8);return _0x30a615[_0x5f5659]?_0x30a615[_0x5f5659]:_0x1d6d92[_0x3253ed(0x607)](_0x1839e8);},TextManager[_0x2e6bc0(0x705)]=function(_0x448f5c,_0x5a16e2){const _0x225773=_0x2e6bc0,_0xcd0048=VisuMZ[_0x225773(0x468)]['Settings'][_0x225773(0x51a)],_0x10a35c=_0xcd0048[_0x225773(0x1a6)],_0x12a735=this[_0x225773(0x76a)](_0x448f5c),_0x1489d1=this['getInputButtonString'](_0x5a16e2);return _0x10a35c['format'](_0x12a735,_0x1489d1);},TextManager[_0x2e6bc0(0x54f)]=function(_0x4db76b,_0x198060){const _0x491297=_0x2e6bc0,_0x59e064=_0x4db76b[_0x491297(0x616)]()['trim'](),_0x19246e=VisuMZ[_0x491297(0x468)]['ControllerButtons'][_0x59e064];if(!_0x19246e)return this[_0x491297(0x498)](_0x4db76b,_0x198060);return _0x19246e[_0x198060]||this[_0x491297(0x7d0)](_0x4db76b,_0x198060);},TextManager[_0x2e6bc0(0x498)]=function(_0x5ecc83,_0x5f57cc){const _0x7a829e=_0x2e6bc0,_0xd84bd8=_0x5ecc83[_0x7a829e(0x616)]()['trim']();for(const _0x372604 in VisuMZ[_0x7a829e(0x468)][_0x7a829e(0x73f)]){if(_0xd84bd8[_0x7a829e(0x7fe)](_0x372604)){const _0x401a59=VisuMZ['CoreEngine'][_0x7a829e(0x73f)][_0x372604],_0x17e657=VisuMZ[_0x7a829e(0x468)][_0x7a829e(0x45e)][_0x401a59];return _0x17e657[_0x5f57cc]||this[_0x7a829e(0x7d0)](_0x5f57cc);}}return this[_0x7a829e(0x7d0)](_0x5f57cc);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4ff)]=ColorManager['loadWindowskin'],ColorManager[_0x2e6bc0(0x480)]=function(){const _0x5864e6=_0x2e6bc0;VisuMZ[_0x5864e6(0x468)][_0x5864e6(0x4ff)]['call'](this),this['_colorCache']=this[_0x5864e6(0x82b)]||{};},ColorManager[_0x2e6bc0(0x680)]=function(_0x4f842f,_0x28c31d){const _0x1d12f0=_0x2e6bc0;return _0x28c31d=String(_0x28c31d),this[_0x1d12f0(0x82b)]=this[_0x1d12f0(0x82b)]||{},_0x28c31d['match'](/#(.*)/i)?this['_colorCache'][_0x4f842f]=_0x1d12f0(0x3dc)[_0x1d12f0(0x607)](String(RegExp['$1'])):this['_colorCache'][_0x4f842f]=this[_0x1d12f0(0x638)](Number(_0x28c31d)),this[_0x1d12f0(0x82b)][_0x4f842f];},ColorManager[_0x2e6bc0(0x131)]=function(_0x5c17a4){const _0x2d425b=_0x2e6bc0;return _0x5c17a4=String(_0x5c17a4),_0x5c17a4[_0x2d425b(0x298)](/#(.*)/i)?_0x2d425b(0x3dc)[_0x2d425b(0x607)](String(RegExp['$1'])):this[_0x2d425b(0x638)](Number(_0x5c17a4));},ColorManager[_0x2e6bc0(0x308)]=function(){const _0x520b1b=_0x2e6bc0;this[_0x520b1b(0x82b)]={};},ColorManager[_0x2e6bc0(0x229)]=function(){const _0x16da77=_0x2e6bc0,_0x25f815='_stored_normalColor';this['_colorCache']=this[_0x16da77(0x82b)]||{};if(this[_0x16da77(0x82b)][_0x25f815])return this[_0x16da77(0x82b)][_0x25f815];const _0x405542=VisuMZ[_0x16da77(0x468)][_0x16da77(0x6ef)]['Color'][_0x16da77(0x1d0)];return this[_0x16da77(0x680)](_0x25f815,_0x405542);},ColorManager[_0x2e6bc0(0x23f)]=function(){const _0x1e3732=_0x2e6bc0,_0x8a06c6=_0x1e3732(0x17c);this[_0x1e3732(0x82b)]=this[_0x1e3732(0x82b)]||{};if(this[_0x1e3732(0x82b)][_0x8a06c6])return this[_0x1e3732(0x82b)][_0x8a06c6];const _0x5dd9b4=VisuMZ[_0x1e3732(0x468)][_0x1e3732(0x6ef)][_0x1e3732(0x210)][_0x1e3732(0x777)];return this[_0x1e3732(0x680)](_0x8a06c6,_0x5dd9b4);},ColorManager['crisisColor']=function(){const _0x473228=_0x2e6bc0,_0x1a3096=_0x473228(0x205);this[_0x473228(0x82b)]=this[_0x473228(0x82b)]||{};if(this[_0x473228(0x82b)][_0x1a3096])return this[_0x473228(0x82b)][_0x1a3096];const _0x32b83a=VisuMZ[_0x473228(0x468)][_0x473228(0x6ef)][_0x473228(0x210)][_0x473228(0x31f)];return this[_0x473228(0x680)](_0x1a3096,_0x32b83a);},ColorManager['deathColor']=function(){const _0x317090=_0x2e6bc0,_0xe7b8bf='_stored_deathColor';this['_colorCache']=this[_0x317090(0x82b)]||{};if(this[_0x317090(0x82b)][_0xe7b8bf])return this[_0x317090(0x82b)][_0xe7b8bf];const _0x5d023f=VisuMZ[_0x317090(0x468)][_0x317090(0x6ef)][_0x317090(0x210)][_0x317090(0x250)];return this[_0x317090(0x680)](_0xe7b8bf,_0x5d023f);},ColorManager[_0x2e6bc0(0x5bd)]=function(){const _0x3eed7c=_0x2e6bc0,_0x14888f=_0x3eed7c(0x7ef);this[_0x3eed7c(0x82b)]=this[_0x3eed7c(0x82b)]||{};if(this[_0x3eed7c(0x82b)][_0x14888f])return this[_0x3eed7c(0x82b)][_0x14888f];const _0x254b5e=VisuMZ[_0x3eed7c(0x468)][_0x3eed7c(0x6ef)][_0x3eed7c(0x210)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x14888f,_0x254b5e);},ColorManager[_0x2e6bc0(0x4aa)]=function(){const _0x324bfb=_0x2e6bc0,_0x73e5bb=_0x324bfb(0x819);this['_colorCache']=this[_0x324bfb(0x82b)]||{};if(this[_0x324bfb(0x82b)][_0x73e5bb])return this[_0x324bfb(0x82b)][_0x73e5bb];const _0x4ad50b=VisuMZ[_0x324bfb(0x468)][_0x324bfb(0x6ef)][_0x324bfb(0x210)][_0x324bfb(0x864)];return this[_0x324bfb(0x680)](_0x73e5bb,_0x4ad50b);},ColorManager['hpGaugeColor2']=function(){const _0x3d8a75=_0x2e6bc0,_0x757906=_0x3d8a75(0x23b);this[_0x3d8a75(0x82b)]=this[_0x3d8a75(0x82b)]||{};if(this[_0x3d8a75(0x82b)][_0x757906])return this[_0x3d8a75(0x82b)][_0x757906];const _0x3e1f7e=VisuMZ[_0x3d8a75(0x468)][_0x3d8a75(0x6ef)][_0x3d8a75(0x210)]['ColorHPGauge2'];return this[_0x3d8a75(0x680)](_0x757906,_0x3e1f7e);},ColorManager[_0x2e6bc0(0x77f)]=function(){const _0xe2d0e1=_0x2e6bc0,_0x3ce205=_0xe2d0e1(0x7af);this['_colorCache']=this[_0xe2d0e1(0x82b)]||{};if(this[_0xe2d0e1(0x82b)][_0x3ce205])return this[_0xe2d0e1(0x82b)][_0x3ce205];const _0x3977a0=VisuMZ[_0xe2d0e1(0x468)][_0xe2d0e1(0x6ef)]['Color'][_0xe2d0e1(0x327)];return this[_0xe2d0e1(0x680)](_0x3ce205,_0x3977a0);},ColorManager['mpGaugeColor2']=function(){const _0x8bcc99=_0x2e6bc0,_0x40281f=_0x8bcc99(0x7ca);this[_0x8bcc99(0x82b)]=this[_0x8bcc99(0x82b)]||{};if(this['_colorCache'][_0x40281f])return this[_0x8bcc99(0x82b)][_0x40281f];const _0xf7941d=VisuMZ['CoreEngine'][_0x8bcc99(0x6ef)]['Color'][_0x8bcc99(0x292)];return this[_0x8bcc99(0x680)](_0x40281f,_0xf7941d);},ColorManager['mpCostColor']=function(){const _0x495823=_0x2e6bc0,_0x5dad1f=_0x495823(0x3ba);this[_0x495823(0x82b)]=this[_0x495823(0x82b)]||{};if(this[_0x495823(0x82b)][_0x5dad1f])return this[_0x495823(0x82b)][_0x5dad1f];const _0x581035=VisuMZ['CoreEngine'][_0x495823(0x6ef)][_0x495823(0x210)][_0x495823(0x866)];return this[_0x495823(0x680)](_0x5dad1f,_0x581035);},ColorManager[_0x2e6bc0(0x5cc)]=function(){const _0x41b3cd=_0x2e6bc0,_0x136c42=_0x41b3cd(0x3d8);this[_0x41b3cd(0x82b)]=this[_0x41b3cd(0x82b)]||{};if(this[_0x41b3cd(0x82b)][_0x136c42])return this[_0x41b3cd(0x82b)][_0x136c42];const _0x48d349=VisuMZ['CoreEngine'][_0x41b3cd(0x6ef)]['Color']['ColorPowerUp'];return this[_0x41b3cd(0x680)](_0x136c42,_0x48d349);},ColorManager[_0x2e6bc0(0x797)]=function(){const _0x58d5d1=_0x2e6bc0,_0xa7793c=_0x58d5d1(0x26b);this[_0x58d5d1(0x82b)]=this[_0x58d5d1(0x82b)]||{};if(this[_0x58d5d1(0x82b)][_0xa7793c])return this['_colorCache'][_0xa7793c];const _0x2acb65=VisuMZ[_0x58d5d1(0x468)][_0x58d5d1(0x6ef)][_0x58d5d1(0x210)][_0x58d5d1(0x5a4)];return this[_0x58d5d1(0x680)](_0xa7793c,_0x2acb65);},ColorManager[_0x2e6bc0(0x835)]=function(){const _0x391842=_0x2e6bc0,_0x283c92=_0x391842(0x661);this[_0x391842(0x82b)]=this[_0x391842(0x82b)]||{};if(this[_0x391842(0x82b)][_0x283c92])return this[_0x391842(0x82b)][_0x283c92];const _0x32d831=VisuMZ[_0x391842(0x468)][_0x391842(0x6ef)]['Color'][_0x391842(0x65d)];return this[_0x391842(0x680)](_0x283c92,_0x32d831);},ColorManager[_0x2e6bc0(0x6e2)]=function(){const _0x151fb2=_0x2e6bc0,_0x16d703=_0x151fb2(0x808);this['_colorCache']=this['_colorCache']||{};if(this[_0x151fb2(0x82b)][_0x16d703])return this[_0x151fb2(0x82b)][_0x16d703];const _0x1fa1c9=VisuMZ['CoreEngine']['Settings'][_0x151fb2(0x210)]['ColorCTGauge2'];return this[_0x151fb2(0x680)](_0x16d703,_0x1fa1c9);},ColorManager['tpGaugeColor1']=function(){const _0x601b16=_0x2e6bc0,_0x17ae58='_stored_tpGaugeColor1';this[_0x601b16(0x82b)]=this[_0x601b16(0x82b)]||{};if(this[_0x601b16(0x82b)][_0x17ae58])return this[_0x601b16(0x82b)][_0x17ae58];const _0x3f7620=VisuMZ[_0x601b16(0x468)]['Settings'][_0x601b16(0x210)][_0x601b16(0x63a)];return this[_0x601b16(0x680)](_0x17ae58,_0x3f7620);},ColorManager[_0x2e6bc0(0x60a)]=function(){const _0x4fd32d=_0x2e6bc0,_0x3e5d92=_0x4fd32d(0x53b);this[_0x4fd32d(0x82b)]=this[_0x4fd32d(0x82b)]||{};if(this[_0x4fd32d(0x82b)][_0x3e5d92])return this[_0x4fd32d(0x82b)][_0x3e5d92];const _0x117364=VisuMZ[_0x4fd32d(0x468)][_0x4fd32d(0x6ef)][_0x4fd32d(0x210)]['ColorTPGauge2'];return this[_0x4fd32d(0x680)](_0x3e5d92,_0x117364);},ColorManager[_0x2e6bc0(0x82a)]=function(){const _0x324295=_0x2e6bc0,_0x4389b4='_stored_tpCostColor';this[_0x324295(0x82b)]=this['_colorCache']||{};if(this[_0x324295(0x82b)][_0x4389b4])return this[_0x324295(0x82b)][_0x4389b4];const _0x115c3e=VisuMZ[_0x324295(0x468)][_0x324295(0x6ef)][_0x324295(0x210)][_0x324295(0x858)];return this[_0x324295(0x680)](_0x4389b4,_0x115c3e);},ColorManager['pendingColor']=function(){const _0x2b4894=_0x2e6bc0,_0x1de99e='_stored_pendingColor';this[_0x2b4894(0x82b)]=this[_0x2b4894(0x82b)]||{};if(this['_colorCache'][_0x1de99e])return this[_0x2b4894(0x82b)][_0x1de99e];const _0x57f8d4=VisuMZ[_0x2b4894(0x468)][_0x2b4894(0x6ef)][_0x2b4894(0x210)][_0x2b4894(0x858)];return this[_0x2b4894(0x680)](_0x1de99e,_0x57f8d4);},ColorManager[_0x2e6bc0(0x5f5)]=function(){const _0x1505c6=_0x2e6bc0,_0x346de4=_0x1505c6(0x8b7);this[_0x1505c6(0x82b)]=this['_colorCache']||{};if(this[_0x1505c6(0x82b)][_0x346de4])return this[_0x1505c6(0x82b)][_0x346de4];const _0x320654=VisuMZ[_0x1505c6(0x468)][_0x1505c6(0x6ef)][_0x1505c6(0x210)][_0x1505c6(0x1a9)];return this[_0x1505c6(0x680)](_0x346de4,_0x320654);},ColorManager['expGaugeColor2']=function(){const _0x5649d0=_0x2e6bc0,_0x4a3cd2=_0x5649d0(0x84b);this[_0x5649d0(0x82b)]=this[_0x5649d0(0x82b)]||{};if(this[_0x5649d0(0x82b)][_0x4a3cd2])return this['_colorCache'][_0x4a3cd2];const _0x4159e6=VisuMZ[_0x5649d0(0x468)]['Settings'][_0x5649d0(0x210)][_0x5649d0(0x136)];return this[_0x5649d0(0x680)](_0x4a3cd2,_0x4159e6);},ColorManager[_0x2e6bc0(0x542)]=function(){const _0x5aa3df=_0x2e6bc0,_0x3c46ce='_stored_maxLvGaugeColor1';this[_0x5aa3df(0x82b)]=this[_0x5aa3df(0x82b)]||{};if(this[_0x5aa3df(0x82b)][_0x3c46ce])return this[_0x5aa3df(0x82b)][_0x3c46ce];const _0x4089f1=VisuMZ[_0x5aa3df(0x468)][_0x5aa3df(0x6ef)][_0x5aa3df(0x210)][_0x5aa3df(0x130)];return this['getColorDataFromPluginParameters'](_0x3c46ce,_0x4089f1);},ColorManager['maxLvGaugeColor2']=function(){const _0x306b00=_0x2e6bc0,_0x5e3cab=_0x306b00(0x822);this[_0x306b00(0x82b)]=this[_0x306b00(0x82b)]||{};if(this['_colorCache'][_0x5e3cab])return this['_colorCache'][_0x5e3cab];const _0x3a72e8=VisuMZ[_0x306b00(0x468)][_0x306b00(0x6ef)][_0x306b00(0x210)][_0x306b00(0x81c)];return this[_0x306b00(0x680)](_0x5e3cab,_0x3a72e8);},ColorManager[_0x2e6bc0(0x2c7)]=function(_0x29e0ff){const _0xf3d312=_0x2e6bc0;return VisuMZ[_0xf3d312(0x468)][_0xf3d312(0x6ef)][_0xf3d312(0x210)][_0xf3d312(0x75a)]['call'](this,_0x29e0ff);},ColorManager['mpColor']=function(_0x41d574){const _0x4118b6=_0x2e6bc0;return VisuMZ[_0x4118b6(0x468)][_0x4118b6(0x6ef)][_0x4118b6(0x210)][_0x4118b6(0x20e)]['call'](this,_0x41d574);},ColorManager['tpColor']=function(_0x4dd654){const _0x49a1d9=_0x2e6bc0;return VisuMZ[_0x49a1d9(0x468)][_0x49a1d9(0x6ef)][_0x49a1d9(0x210)][_0x49a1d9(0x56e)]['call'](this,_0x4dd654);},ColorManager[_0x2e6bc0(0x246)]=function(_0x4e7c22){const _0x448bea=_0x2e6bc0;return VisuMZ[_0x448bea(0x468)][_0x448bea(0x6ef)]['Color'][_0x448bea(0x1aa)][_0x448bea(0x895)](this,_0x4e7c22);},ColorManager[_0x2e6bc0(0x383)]=function(_0xf6930d){const _0x180f19=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x180f19(0x6ef)][_0x180f19(0x210)][_0x180f19(0xfc)][_0x180f19(0x895)](this,_0xf6930d);},ColorManager[_0x2e6bc0(0x107)]=function(){const _0x2793d5=_0x2e6bc0;return VisuMZ[_0x2793d5(0x468)]['Settings']['Color'][_0x2793d5(0x2b6)];},ColorManager[_0x2e6bc0(0x57f)]=function(){const _0x2609a7=_0x2e6bc0;return VisuMZ[_0x2609a7(0x468)][_0x2609a7(0x6ef)][_0x2609a7(0x210)][_0x2609a7(0x7da)]||_0x2609a7(0x278);},ColorManager[_0x2e6bc0(0x511)]=function(){const _0x1d4b0c=_0x2e6bc0;return VisuMZ[_0x1d4b0c(0x468)][_0x1d4b0c(0x6ef)][_0x1d4b0c(0x210)][_0x1d4b0c(0x492)]||_0x1d4b0c(0x68f);},ColorManager['dimColor1']=function(){const _0x564990=_0x2e6bc0;return VisuMZ[_0x564990(0x468)][_0x564990(0x6ef)][_0x564990(0x210)]['DimColor1'];},ColorManager[_0x2e6bc0(0x38a)]=function(){const _0x40b313=_0x2e6bc0;return VisuMZ['CoreEngine']['Settings']['Color'][_0x40b313(0x58e)];},ColorManager[_0x2e6bc0(0x8b0)]=function(){const _0x4269ca=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x4269ca(0x6ef)][_0x4269ca(0x210)][_0x4269ca(0x1cc)];},ColorManager[_0x2e6bc0(0x1ed)]=function(){const _0x4e8bbe=_0x2e6bc0;return VisuMZ[_0x4e8bbe(0x468)][_0x4e8bbe(0x6ef)][_0x4e8bbe(0x210)][_0x4e8bbe(0x779)];},SceneManager['_storedStack']=[],SceneManager[_0x2e6bc0(0x76f)]=function(){const _0x674aa7=_0x2e6bc0;return this[_0x674aa7(0x49a)]&&this['_scene'][_0x674aa7(0x2c3)]===Scene_Battle;},SceneManager[_0x2e6bc0(0x81e)]=function(){const _0x460a7d=_0x2e6bc0;return this[_0x460a7d(0x49a)]&&this[_0x460a7d(0x49a)][_0x460a7d(0x2c3)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x3522cd=_0x2e6bc0;return this[_0x3522cd(0x49a)]&&this[_0x3522cd(0x49a)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x2e6bc0(0x58f)]=SceneManager[_0x2e6bc0(0x571)],SceneManager[_0x2e6bc0(0x571)]=function(){const _0x51fd95=_0x2e6bc0;VisuMZ['CoreEngine'][_0x51fd95(0x58f)][_0x51fd95(0x895)](this),this[_0x51fd95(0x88c)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x42c)]=SceneManager[_0x2e6bc0(0x4ea)],SceneManager[_0x2e6bc0(0x4ea)]=function(_0x5e179c){const _0x29524f=_0x2e6bc0;if($gameTemp)this[_0x29524f(0x4a7)](_0x5e179c);VisuMZ['CoreEngine'][_0x29524f(0x42c)]['call'](this,_0x5e179c);},SceneManager[_0x2e6bc0(0x4a7)]=function(_0x31dac2){const _0x5a6b61=_0x2e6bc0;if(!_0x31dac2[_0x5a6b61(0x296)]&&!_0x31dac2[_0x5a6b61(0x17e)])switch(_0x31dac2[_0x5a6b61(0x145)]){case 0x52:this[_0x5a6b61(0x1de)]();break;case 0x54:this[_0x5a6b61(0x683)]();break;case 0x75:this[_0x5a6b61(0x6a3)]();break;case 0x76:if(Input[_0x5a6b61(0x753)](_0x5a6b61(0x2f3))||Input['isPressed'](_0x5a6b61(0x3fd)))return;this['playTestF7']();break;}else{if(_0x31dac2[_0x5a6b61(0x296)]){let _0x57120e=_0x31dac2[_0x5a6b61(0x145)];if(_0x57120e>=0x31&&_0x57120e<=0x39){const _0x457ca0=_0x57120e-0x30;return SceneManager['playtestQuickLoad'](_0x457ca0);}else{if(_0x57120e>=0x61&&_0x57120e<=0x69){const _0x3541d1=_0x57120e-0x60;return SceneManager[_0x5a6b61(0x2cc)](_0x3541d1);}}}}},SceneManager[_0x2e6bc0(0x6a3)]=function(){const _0x438b7b=_0x2e6bc0;if($gameTemp[_0x438b7b(0x2d3)]()&&VisuMZ[_0x438b7b(0x468)]['Settings'][_0x438b7b(0x818)][_0x438b7b(0x1e7)]){ConfigManager[_0x438b7b(0x61d)]!==0x0?(ConfigManager[_0x438b7b(0x536)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x438b7b(0x61d)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x438b7b(0x28e)]=0x64,ConfigManager[_0x438b7b(0x61d)]=0x64);ConfigManager[_0x438b7b(0x653)]();if(this[_0x438b7b(0x49a)][_0x438b7b(0x2c3)]===Scene_Options){if(this[_0x438b7b(0x49a)][_0x438b7b(0x481)])this[_0x438b7b(0x49a)][_0x438b7b(0x481)][_0x438b7b(0x3bd)]();if(this[_0x438b7b(0x49a)][_0x438b7b(0x1be)])this['_scene'][_0x438b7b(0x1be)][_0x438b7b(0x3bd)]();}}},SceneManager['playTestF7']=function(){const _0x5a1e36=_0x2e6bc0;$gameTemp[_0x5a1e36(0x2d3)]()&&VisuMZ['CoreEngine'][_0x5a1e36(0x6ef)][_0x5a1e36(0x818)][_0x5a1e36(0x4cc)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x5a1e36(0x517)]);},SceneManager[_0x2e6bc0(0x1de)]=function(){const _0x45fc55=_0x2e6bc0;if(!VisuMZ[_0x45fc55(0x468)]['Settings'][_0x45fc55(0x818)][_0x45fc55(0x4b8)])return;if(!$gameTemp[_0x45fc55(0x2d3)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x45fc55(0x753)](_0x45fc55(0x2f3)))return;for(const _0x236d0e of $gameParty[_0x45fc55(0x7be)]()){if(!_0x236d0e)continue;_0x236d0e[_0x45fc55(0x6dc)]();}},SceneManager[_0x2e6bc0(0x683)]=function(){const _0x2a03ae=_0x2e6bc0;if(!VisuMZ['CoreEngine'][_0x2a03ae(0x6ef)]['QoL'][_0x2a03ae(0x3f0)])return;if(!$gameTemp[_0x2a03ae(0x2d3)]())return;if(!SceneManager[_0x2a03ae(0x76f)]())return;if(!Input[_0x2a03ae(0x753)]('shift'))return;for(const _0x562ae3 of $gameParty[_0x2a03ae(0x7be)]()){if(!_0x562ae3)continue;_0x562ae3[_0x2a03ae(0x625)](_0x562ae3[_0x2a03ae(0x65e)]());}},SceneManager[_0x2e6bc0(0x2cc)]=function(_0x1418f0){const _0x3c5434=_0x2e6bc0;if(!$gameTemp[_0x3c5434(0x2d3)]())return;if(!DataManager[_0x3c5434(0x857)](_0x1418f0))return;if(!(VisuMZ[_0x3c5434(0x468)][_0x3c5434(0x6ef)][_0x3c5434(0x818)][_0x3c5434(0x103)]??!![]))return;this['push'](Scene_QuickLoad),this['prepareNextScene'](_0x1418f0);},SceneManager['initVisuMZCoreEngine']=function(){const _0x12d405=_0x2e6bc0;this[_0x12d405(0x16e)]=![],this[_0x12d405(0x47b)]=!VisuMZ[_0x12d405(0x468)]['Settings']['UI']['ShowButtons'];},SceneManager[_0x2e6bc0(0x878)]=function(_0x4594dd){const _0x1e2884=_0x2e6bc0;VisuMZ['CoreEngine'][_0x1e2884(0x6ef)]['UI'][_0x1e2884(0x5fd)]&&(this[_0x1e2884(0x16e)]=_0x4594dd);},SceneManager[_0x2e6bc0(0xe7)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x2e6bc0(0x21c)]=function(){return this['_hideButtons'];},SceneManager[_0x2e6bc0(0x3d4)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x72f)]=SceneManager[_0x2e6bc0(0x4c5)],SceneManager[_0x2e6bc0(0x4c5)]=function(){const _0x21bbd5=_0x2e6bc0;return VisuMZ[_0x21bbd5(0x468)]['Settings'][_0x21bbd5(0x818)][_0x21bbd5(0x3b6)]?VisuMZ[_0x21bbd5(0x468)][_0x21bbd5(0x72f)][_0x21bbd5(0x895)](this):!![];},SceneManager['catchException']=function(_0x1e31b5){const _0x3eca63=_0x2e6bc0;if(_0x1e31b5 instanceof Error)this[_0x3eca63(0x758)](_0x1e31b5);else _0x1e31b5 instanceof Array&&_0x1e31b5[0x0]===_0x3eca63(0x307)?this[_0x3eca63(0x76b)](_0x1e31b5):this['catchUnknownError'](_0x1e31b5);this[_0x3eca63(0x19c)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x202)]=BattleManager[_0x2e6bc0(0x27f)],BattleManager[_0x2e6bc0(0x27f)]=function(){const _0x201719=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x201719(0x6ef)][_0x201719(0x818)][_0x201719(0x502)]?this[_0x201719(0x73c)]():VisuMZ[_0x201719(0x468)][_0x201719(0x202)][_0x201719(0x895)](this);},BattleManager[_0x2e6bc0(0x73c)]=function(){const _0x5ae5b2=_0x2e6bc0;return $gameParty['performEscape'](),SoundManager[_0x5ae5b2(0x166)](),this[_0x5ae5b2(0x5b0)](),!![];},BattleManager[_0x2e6bc0(0x341)]=function(){const _0x4ee390=_0x2e6bc0;return $gameSystem[_0x4ee390(0x4c2)]()>=0x1;},BattleManager[_0x2e6bc0(0x7e1)]=function(){const _0x1ddcbd=_0x2e6bc0;return $gameSystem[_0x1ddcbd(0x4c2)]()===0x1;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x28d)]=Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)],Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(){const _0x521500=_0x2e6bc0;VisuMZ['CoreEngine'][_0x521500(0x28d)][_0x521500(0x895)](this),this[_0x521500(0x47d)](),this[_0x521500(0x3f8)](),this['createPointAnimationQueue']();},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x47d)]=function(){const _0xb03901=_0x2e6bc0;VisuMZ['CoreEngine'][_0xb03901(0x6ef)][_0xb03901(0x818)][_0xb03901(0x365)]&&(this[_0xb03901(0x283)]=![]);},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x297)]=function(_0x13ac54){this['_lastPluginCommandInterpreter']=_0x13ac54;},Game_Temp['prototype'][_0x2e6bc0(0x5ea)]=function(){const _0x32d341=_0x2e6bc0;return this[_0x32d341(0x4bc)];},Game_Temp['prototype'][_0x2e6bc0(0x81f)]=function(){const _0x1abc28=_0x2e6bc0;this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined,this[_0x1abc28(0x586)]=undefined;},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7ae)]=function(_0x930161){const _0x2c1619=_0x2e6bc0;$gameMap&&$dataMap&&$dataMap[_0x2c1619(0x6a8)]&&this[_0x2c1619(0x51d)]($dataMap[_0x2c1619(0x6a8)]);const _0xd41f4b=$dataTroops[_0x930161];if(_0xd41f4b){let _0x586e79=DataManager[_0x2c1619(0x5d7)](_0xd41f4b['id']);this[_0x2c1619(0x51d)](_0x586e79);}},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x51d)]=function(_0x44fe16){const _0xe8af33=_0x2e6bc0;if(!_0x44fe16)return;if(_0x44fe16[_0xe8af33(0x298)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0xe8af33(0x810)]='FV';else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x44fe16['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3e450=String(RegExp['$1']);if(_0x3e450[_0xe8af33(0x298)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0xe8af33(0x810)]='FV';else _0x3e450[_0xe8af33(0x298)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0xe8af33(0x810)]='SV');}}}if(_0x44fe16[_0xe8af33(0x298)](/<(?:DTB)>/i))this[_0xe8af33(0x715)]=0x0;else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0xe8af33(0x715)]=0x1;else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0xe8af33(0x715)]=0x2;else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:TPB|ATB)>/i))this[_0xe8af33(0x715)]=0x2;else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:CTB)>/i))Imported[_0xe8af33(0x279)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x195));else{if(_0x44fe16['match'](/<(?:STB)>/i))Imported[_0xe8af33(0x535)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x3ce));else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:BTB)>/i))Imported[_0xe8af33(0x5c1)]&&(this[_0xe8af33(0x715)]='BTB');else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:FTB)>/i))Imported[_0xe8af33(0x604)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x410));else{if(_0x44fe16['match'](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0xe8af33(0x715)]='OTB');else{if(_0x44fe16['match'](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0xe8af33(0x715)]=_0xe8af33(0x601));else{if(_0x44fe16[_0xe8af33(0x298)](/<(?:PTB)>/i))Imported[_0xe8af33(0x48c)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0xe2));else{if(_0x44fe16['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x56fd63=String(RegExp['$1']);if(_0x56fd63[_0xe8af33(0x298)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x56fd63[_0xe8af33(0x298)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0xe8af33(0x715)]=0x1;else{if(_0x56fd63[_0xe8af33(0x298)](/(?:TPB|ATB)[ ]WAIT/i))this[_0xe8af33(0x715)]=0x2;else{if(_0x56fd63[_0xe8af33(0x298)](/CTB/i))Imported[_0xe8af33(0x279)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x195));else{if(_0x56fd63['match'](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0xe8af33(0x3ce));else{if(_0x56fd63[_0xe8af33(0x298)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0xe8af33(0x715)]='BTB');else{if(_0x56fd63[_0xe8af33(0x298)](/FTB/i))Imported[_0xe8af33(0x604)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x410));else{if(_0x56fd63['match'](/OTB/i))Imported[_0xe8af33(0x558)]&&(this[_0xe8af33(0x715)]=_0xe8af33(0x5a3));else{if(_0x56fd63[_0xe8af33(0x298)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0xe8af33(0x715)]='ETB');else _0x56fd63[_0xe8af33(0x298)](/PTB/i)&&(Imported[_0xe8af33(0x48c)]&&(this['_forcedBattleSys']=_0xe8af33(0xe2)));}}}}}}}}}}}}}}}}}}}}if(_0x44fe16[_0xe8af33(0x298)](/<(?:|BATTLE )GRID>/i))this[_0xe8af33(0x586)]=!![];else _0x44fe16[_0xe8af33(0x298)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0xe8af33(0x586)]=![]);},Game_Temp['prototype'][_0x2e6bc0(0x3f8)]=function(){const _0x55b19d=_0x2e6bc0;this[_0x55b19d(0x2a1)]=[];},Game_Temp[_0x2e6bc0(0x5e2)]['requestFauxAnimation']=function(_0x5791ce,_0x412e44,_0x536be7,_0x2549d1){const _0x10e458=_0x2e6bc0;if(!this[_0x10e458(0x5f1)]())return;_0x536be7=_0x536be7||![],_0x2549d1=_0x2549d1||![];if($dataAnimations[_0x412e44]){const _0x505783={'targets':_0x5791ce,'animationId':_0x412e44,'mirror':_0x536be7,'mute':_0x2549d1};this['_fauxAnimationQueue'][_0x10e458(0x16c)](_0x505783);for(const _0x122996 of _0x5791ce){_0x122996[_0x10e458(0x497)]&&_0x122996[_0x10e458(0x497)]();}}},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5f1)]=function(){return!![];},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x348)]=function(){const _0x53920c=_0x2e6bc0;return this[_0x53920c(0x2a1)][_0x53920c(0x2f3)]();},Game_Temp[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a1)]=function(){const _0x133ffb=_0x2e6bc0;this[_0x133ffb(0x6de)]=[];},Game_Temp['prototype'][_0x2e6bc0(0x3e5)]=function(_0x5cb824,_0x5481e3,_0x6e96e2,_0x53dc4a,_0x26e823){const _0x1ce82e=_0x2e6bc0;if(!this[_0x1ce82e(0x7d3)]())return;_0x53dc4a=_0x53dc4a||![],_0x26e823=_0x26e823||![];if($dataAnimations[_0x6e96e2]){const _0xc4f1c9={'x':_0x5cb824,'y':_0x5481e3,'animationId':_0x6e96e2,'mirror':_0x53dc4a,'mute':_0x26e823};this[_0x1ce82e(0x6de)][_0x1ce82e(0x16c)](_0xc4f1c9);}},Game_Temp[_0x2e6bc0(0x5e2)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x2e6bc0(0x5e2)]['retrievePointAnimation']=function(){const _0x336eff=_0x2e6bc0;return this[_0x336eff(0x6de)][_0x336eff(0x2f3)]();},VisuMZ[_0x2e6bc0(0x468)]['Game_System_initialize']=Game_System['prototype']['initialize'],Game_System['prototype']['initialize']=function(){const _0x2793d1=_0x2e6bc0;VisuMZ[_0x2793d1(0x468)][_0x2793d1(0x18b)][_0x2793d1(0x895)](this),this[_0x2793d1(0x6fe)]();},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6fe)]=function(){const _0x4a4be6=_0x2e6bc0;this[_0x4a4be6(0x466)]={'SideView':$dataSystem[_0x4a4be6(0x15f)],'BattleSystem':this[_0x4a4be6(0x1b1)](),'FontSize':$dataSystem[_0x4a4be6(0x212)][_0x4a4be6(0x135)],'Padding':0xc};},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3da)]=function(){const _0x51ddbb=_0x2e6bc0;if($gameTemp[_0x51ddbb(0x810)]==='SV')return!![];else{if($gameTemp[_0x51ddbb(0x810)]==='FV')return![];}if(this[_0x51ddbb(0x466)]===undefined)this[_0x51ddbb(0x6fe)]();if(this[_0x51ddbb(0x466)][_0x51ddbb(0x237)]===undefined)this[_0x51ddbb(0x6fe)]();return this[_0x51ddbb(0x466)][_0x51ddbb(0x237)];},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x467)]=function(_0x415ed4){const _0x248091=_0x2e6bc0;if(this[_0x248091(0x466)]===undefined)this[_0x248091(0x6fe)]();if(this[_0x248091(0x466)][_0x248091(0x237)]===undefined)this[_0x248091(0x6fe)]();this[_0x248091(0x466)][_0x248091(0x237)]=_0x415ed4;},Game_System['prototype'][_0x2e6bc0(0x74c)]=function(){const _0x4e40f5=_0x2e6bc0;if(this[_0x4e40f5(0x466)]===undefined)this[_0x4e40f5(0x6fe)]();this[_0x4e40f5(0x466)][_0x4e40f5(0x200)]=this[_0x4e40f5(0x1b1)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x297de0=_0x2e6bc0,_0x3651c9=(VisuMZ['CoreEngine'][_0x297de0(0x6ef)][_0x297de0(0x200)]||'DATABASE')['toUpperCase']()[_0x297de0(0x679)]();return VisuMZ[_0x297de0(0x468)][_0x297de0(0x30a)](_0x3651c9);},Game_System[_0x2e6bc0(0x5e2)]['getBattleSystem']=function(){const _0x41d736=_0x2e6bc0;if($gameTemp[_0x41d736(0x715)]!==undefined)return $gameTemp[_0x41d736(0x715)];if(this[_0x41d736(0x466)]===undefined)this[_0x41d736(0x6fe)]();if(this[_0x41d736(0x466)][_0x41d736(0x200)]===undefined)this['resetBattleSystem']();return this[_0x41d736(0x466)][_0x41d736(0x200)];},Game_System['prototype'][_0x2e6bc0(0x68d)]=function(_0x5c96fb){const _0x4c305c=_0x2e6bc0;if(this[_0x4c305c(0x466)]===undefined)this[_0x4c305c(0x6fe)]();if(this['_CoreEngineSettings'][_0x4c305c(0x200)]===undefined)this[_0x4c305c(0x74c)]();this[_0x4c305c(0x466)][_0x4c305c(0x200)]=_0x5c96fb;},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x58b)]=function(){const _0x1eb5ab=_0x2e6bc0;if(this['_CoreEngineSettings']===undefined)this[_0x1eb5ab(0x6fe)]();if(this[_0x1eb5ab(0x466)][_0x1eb5ab(0x7c9)]===undefined)this[_0x1eb5ab(0x6fe)]();return this[_0x1eb5ab(0x466)][_0x1eb5ab(0x7c9)];},Game_System[_0x2e6bc0(0x5e2)]['setMainFontSize']=function(_0x258821){const _0x2c7e9b=_0x2e6bc0;if(this['_CoreEngineSettings']===undefined)this[_0x2c7e9b(0x6fe)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this[_0x2c7e9b(0x6fe)]();this[_0x2c7e9b(0x466)][_0x2c7e9b(0x7c9)]=_0x258821;},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1f2)]=function(){const _0x4a11c4=_0x2e6bc0;if(this[_0x4a11c4(0x466)]===undefined)this['initCoreEngine']();if(this[_0x4a11c4(0x466)][_0x4a11c4(0x31e)]===undefined)this[_0x4a11c4(0x6fe)]();return this[_0x4a11c4(0x466)][_0x4a11c4(0x31e)];},Game_System[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3d7)]=function(_0x25fab8){const _0x4d6dab=_0x2e6bc0;if(this[_0x4d6dab(0x466)]===undefined)this[_0x4d6dab(0x6fe)]();if(this['_CoreEngineSettings'][_0x4d6dab(0x415)]===undefined)this['initCoreEngine']();this[_0x4d6dab(0x466)][_0x4d6dab(0x31e)]=_0x25fab8;},VisuMZ[_0x2e6bc0(0x468)]['Game_Screen_initialize']=Game_Screen[_0x2e6bc0(0x5e2)]['initialize'],Game_Screen[_0x2e6bc0(0x5e2)]['initialize']=function(){const _0x549f43=_0x2e6bc0;VisuMZ[_0x549f43(0x468)]['Game_Screen_initialize'][_0x549f43(0x895)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5b4)]=function(){const _0x4ed356=_0x2e6bc0,_0x40ed6b=VisuMZ[_0x4ed356(0x468)][_0x4ed356(0x6ef)][_0x4ed356(0x392)];this[_0x4ed356(0x17a)]=_0x40ed6b?.['DefaultStyle']||_0x4ed356(0x447);},Game_Screen['prototype'][_0x2e6bc0(0x31b)]=function(){const _0x2eb992=_0x2e6bc0;if(this[_0x2eb992(0x17a)]===undefined)this['initCoreEngineScreenShake']();return this[_0x2eb992(0x17a)];},Game_Screen['prototype'][_0x2e6bc0(0x4c6)]=function(_0x2dcbcd){const _0x379f76=_0x2e6bc0;if(this[_0x379f76(0x17a)]===undefined)this[_0x379f76(0x5b4)]();this[_0x379f76(0x17a)]=_0x2dcbcd[_0x379f76(0x616)]()[_0x379f76(0x679)]();},Game_Picture['prototype']['isMapScrollLinked']=function(){const _0x99a377=_0x2e6bc0;if($gameParty[_0x99a377(0x3f6)]())return![];return this[_0x99a377(0x61f)]()&&this['onlyfilename']()[_0x99a377(0x44c)](0x0)==='!';},Game_Picture['prototype']['onlyfilename']=function(){const _0x5b911d=_0x2e6bc0;return this['_name'][_0x5b911d(0x440)]('/')['pop']();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1ff)]=Game_Picture[_0x2e6bc0(0x5e2)]['x'],Game_Picture[_0x2e6bc0(0x5e2)]['x']=function(){const _0x403d54=_0x2e6bc0;return this[_0x403d54(0x8af)]()?this[_0x403d54(0x21f)]():VisuMZ[_0x403d54(0x468)]['Game_Picture_x'][_0x403d54(0x895)](this);},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x21f)]=function(){const _0x2fa5df=_0x2e6bc0,_0x3d31e2=$gameMap[_0x2fa5df(0x1af)]()*$gameMap[_0x2fa5df(0x363)]();return(this['_x']-_0x3d31e2)*$gameScreen[_0x2fa5df(0x723)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x3fe)]=Game_Picture[_0x2e6bc0(0x5e2)]['y'],Game_Picture[_0x2e6bc0(0x5e2)]['y']=function(){const _0x315841=_0x2e6bc0;return this['isMapScrollLinked']()?this[_0x315841(0x46e)]():VisuMZ[_0x315841(0x468)][_0x315841(0x3fe)][_0x315841(0x895)](this);},Game_Picture['prototype'][_0x2e6bc0(0x46e)]=function(){const _0x2e71c4=_0x2e6bc0,_0x37952f=$gameMap[_0x2e71c4(0x7ac)]()*$gameMap[_0x2e71c4(0x5f7)]();return(this['_y']-_0x37952f)*$gameScreen['zoomScale']();},VisuMZ['CoreEngine']['Game_Picture_scaleX']=Game_Picture['prototype']['scaleX'],Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x374)]=function(){const _0x23aa44=_0x2e6bc0;let _0x1266e9=VisuMZ[_0x23aa44(0x468)][_0x23aa44(0x6e0)]['call'](this);return this[_0x23aa44(0x8af)]()&&(_0x1266e9*=$gameScreen['zoomScale']()),_0x1266e9;},VisuMZ[_0x2e6bc0(0x468)]['Game_Picture_scaleY']=Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4d3)],Game_Picture[_0x2e6bc0(0x5e2)]['scaleY']=function(){const _0x12de09=_0x2e6bc0;let _0x8c4905=VisuMZ[_0x12de09(0x468)]['Game_Picture_scaleY'][_0x12de09(0x895)](this);return this[_0x12de09(0x8af)]()&&(_0x8c4905*=$gameScreen[_0x12de09(0x723)]()),_0x8c4905;},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x357)]=function(_0x4dd9e8){const _0x1d9792=_0x2e6bc0;this[_0x1d9792(0x816)]=_0x4dd9e8;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x55e)]=Game_Picture['prototype']['calcEasing'],Game_Picture['prototype'][_0x2e6bc0(0x2e5)]=function(_0x2d1063){const _0x3fbc0d=_0x2e6bc0;return this['_coreEasingType']=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x3fbc0d(0x7fe)](this[_0x3fbc0d(0x816)])?VisuMZ[_0x3fbc0d(0x468)][_0x3fbc0d(0x55e)][_0x3fbc0d(0x895)](this,_0x2d1063):VisuMZ[_0x3fbc0d(0x71e)](_0x2d1063,this['_coreEasingType']);},VisuMZ['CoreEngine'][_0x2e6bc0(0x2d0)]=Game_Picture['prototype'][_0x2e6bc0(0x2ad)],Game_Picture['prototype'][_0x2e6bc0(0x2ad)]=function(){const _0x4cec4a=_0x2e6bc0;VisuMZ[_0x4cec4a(0x468)][_0x4cec4a(0x2d0)][_0x4cec4a(0x895)](this),this['initRotationCoreEngine']();},Game_Picture[_0x2e6bc0(0x5e2)]['initRotationCoreEngine']=function(){const _0x4ca96d=_0x2e6bc0;this[_0x4ca96d(0x7a6)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x4ca96d(0x4ab)};},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x49e)]=Game_Picture['prototype'][_0x2e6bc0(0x30e)],Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x30e)]=function(){const _0x481741=_0x2e6bc0;let _0x4d7e91=VisuMZ[_0x481741(0x468)]['Game_Picture_angle'][_0x481741(0x895)](this);return _0x4d7e91+=this[_0x481741(0x270)](),_0x4d7e91;},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x270)]=function(){const _0x5c470f=_0x2e6bc0;if(this['_anglePlus']===undefined)this[_0x5c470f(0x5da)]();return this[_0x5c470f(0x7a6)][_0x5c470f(0x59a)]||0x0;},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x750)]=function(_0x442a74,_0x411cbc,_0x312cb4){const _0x30d342=_0x2e6bc0;if(this[_0x30d342(0x7a6)]===undefined)this[_0x30d342(0x5da)]();this[_0x30d342(0x7a6)][_0x30d342(0x187)]=_0x442a74||0x0,this[_0x30d342(0x7a6)][_0x30d342(0x69d)]=_0x411cbc||0x0,this[_0x30d342(0x7a6)][_0x30d342(0x6a7)]=_0x411cbc||0x0,this[_0x30d342(0x7a6)]['easingType']=_0x312cb4||_0x30d342(0x4ab),_0x411cbc<=0x0&&(this[_0x30d342(0x7a6)][_0x30d342(0x59a)]=this[_0x30d342(0x7a6)]['target']);},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x37d)]=function(_0x23b814,_0x36508b,_0xd53a23){const _0x3b5aca=_0x2e6bc0;if(this[_0x3b5aca(0x7a6)]===undefined)this[_0x3b5aca(0x5da)]();this[_0x3b5aca(0x7a6)][_0x3b5aca(0x187)]+=_0x23b814||0x0,this['_anglePlus'][_0x3b5aca(0x69d)]=_0x36508b||0x0,this['_anglePlus'][_0x3b5aca(0x6a7)]=_0x36508b||0x0,this['_anglePlus']['easingType']=_0xd53a23||'Linear',_0x36508b<=0x0&&(this[_0x3b5aca(0x7a6)]['current']=this[_0x3b5aca(0x7a6)][_0x3b5aca(0x187)]);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x45c)]=Game_Picture[_0x2e6bc0(0x5e2)]['updateRotation'],Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x143)]=function(){const _0x19e29e=_0x2e6bc0;VisuMZ[_0x19e29e(0x468)]['Game_Picture_updateRotation'][_0x19e29e(0x895)](this),this[_0x19e29e(0x70a)]();},Game_Picture[_0x2e6bc0(0x5e2)]['updateAnglePlus']=function(){const _0x59a110=_0x2e6bc0;if(this['_anglePlus']===undefined)this[_0x59a110(0x5da)]();const _0x1f2f73=this[_0x59a110(0x7a6)];if(_0x1f2f73[_0x59a110(0x69d)]<=0x0)return;_0x1f2f73[_0x59a110(0x59a)]=this[_0x59a110(0x5cd)](_0x1f2f73['current'],_0x1f2f73['target']),_0x1f2f73[_0x59a110(0x69d)]--,_0x1f2f73['duration']<=0x0&&(_0x1f2f73[_0x59a110(0x59a)]=_0x1f2f73[_0x59a110(0x187)]);},Game_Picture[_0x2e6bc0(0x5e2)]['applyEasingAnglePlus']=function(_0x29b7c1,_0x3780a8){const _0x256e73=_0x2e6bc0,_0x291a2d=this['_anglePlus'],_0x2d4a81=_0x291a2d[_0x256e73(0x4f6)],_0x1ba517=_0x291a2d[_0x256e73(0x69d)],_0x3f2fdb=_0x291a2d[_0x256e73(0x6a7)],_0xaef428=VisuMZ['ApplyEasing']((_0x3f2fdb-_0x1ba517)/_0x3f2fdb,_0x2d4a81),_0x59d7ac=VisuMZ[_0x256e73(0x71e)]((_0x3f2fdb-_0x1ba517+0x1)/_0x3f2fdb,_0x2d4a81),_0x26e00d=(_0x29b7c1-_0x3780a8*_0xaef428)/(0x1-_0xaef428);return _0x26e00d+(_0x3780a8-_0x26e00d)*_0x59d7ac;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6c5)]=Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x359)],Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x359)]=function(_0x31f7b0){const _0x5ec7f1=_0x2e6bc0;return VisuMZ[_0x5ec7f1(0x468)]['Settings'][_0x5ec7f1(0x818)][_0x5ec7f1(0x5ba)]?this[_0x5ec7f1(0x74a)](_0x31f7b0):VisuMZ[_0x5ec7f1(0x468)][_0x5ec7f1(0x6c5)]['call'](this,_0x31f7b0);},Game_Action['prototype'][_0x2e6bc0(0x74a)]=function(_0xcdc590){const _0x3b9def=_0x2e6bc0,_0x37815b=this[_0x3b9def(0x1e1)](_0xcdc590),_0x4d3a61=this[_0x3b9def(0x269)](_0xcdc590),_0x198af8=this['targetEvaRate'](_0xcdc590);return _0x37815b*(_0x4d3a61-_0x198af8);},VisuMZ[_0x2e6bc0(0x468)]['Game_Action_itemEva']=Game_Action['prototype'][_0x2e6bc0(0x20b)],Game_Action[_0x2e6bc0(0x5e2)]['itemEva']=function(_0x1c8418){const _0x2a541a=_0x2e6bc0;return VisuMZ[_0x2a541a(0x468)][_0x2a541a(0x6ef)][_0x2a541a(0x818)]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x2a541a(0x468)][_0x2a541a(0x7e6)][_0x2a541a(0x895)](this,_0x1c8418);},Game_Action['prototype']['itemSuccessRate']=function(_0xbc65af){const _0x420d87=_0x2e6bc0;return this[_0x420d87(0x118)]()[_0x420d87(0x12b)]*0.01;},Game_Action['prototype'][_0x2e6bc0(0x269)]=function(_0x51fa28){const _0x47c5ed=_0x2e6bc0;if(VisuMZ[_0x47c5ed(0x468)]['Settings'][_0x47c5ed(0x818)][_0x47c5ed(0x213)]&&this[_0x47c5ed(0x806)]())return 0x1;return this[_0x47c5ed(0x701)]()?VisuMZ[_0x47c5ed(0x468)][_0x47c5ed(0x6ef)][_0x47c5ed(0x818)]['AccuracyBoost']&&this['subject']()[_0x47c5ed(0x4fd)]()?this[_0x47c5ed(0x585)]()['hit']+0.05:this[_0x47c5ed(0x585)]()['hit']:0x1;},Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2dd)]=function(_0x236b9c){const _0x42ce26=_0x2e6bc0;if(this['subject']()[_0x42ce26(0x4fd)]()===_0x236b9c['isActor']())return 0x0;if(this['isPhysical']())return VisuMZ[_0x42ce26(0x468)][_0x42ce26(0x6ef)][_0x42ce26(0x818)]['AccuracyBoost']&&_0x236b9c['isEnemy']()?_0x236b9c[_0x42ce26(0x6cd)]-0.05:_0x236b9c[_0x42ce26(0x6cd)];else return this[_0x42ce26(0x203)]()?_0x236b9c[_0x42ce26(0x831)]:0x0;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x190)]=Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7cc)],Game_Action['prototype']['updateLastTarget']=function(_0x199263){const _0xcf9130=_0x2e6bc0;VisuMZ[_0xcf9130(0x468)][_0xcf9130(0x190)][_0xcf9130(0x895)](this,_0x199263);if(VisuMZ[_0xcf9130(0x468)][_0xcf9130(0x6ef)][_0xcf9130(0x818)][_0xcf9130(0x5ba)])return;const _0x215e0b=_0x199263[_0xcf9130(0x615)]();_0x215e0b[_0xcf9130(0x529)]&&(0x1-this[_0xcf9130(0x20b)](_0x199263)>this[_0xcf9130(0x359)](_0x199263)&&(_0x215e0b[_0xcf9130(0x529)]=![],_0x215e0b['evaded']=!![]));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6bb)]=Game_BattlerBase['prototype'][_0x2e6bc0(0x37f)],Game_BattlerBase[_0x2e6bc0(0x5e2)]['initMembers']=function(){const _0x4366f9=_0x2e6bc0;this[_0x4366f9(0x155)]={},VisuMZ[_0x4366f9(0x468)]['Game_BattlerBase_initMembers']['call'](this);},VisuMZ['CoreEngine'][_0x2e6bc0(0x11b)]=Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)],Game_BattlerBase['prototype'][_0x2e6bc0(0x3bd)]=function(){const _0x233bd7=_0x2e6bc0;this[_0x233bd7(0x155)]={},VisuMZ[_0x233bd7(0x468)][_0x233bd7(0x11b)][_0x233bd7(0x895)](this);},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x61a)]=function(_0x216f3d){const _0x11b7c9=_0x2e6bc0;return this['_cache']=this[_0x11b7c9(0x155)]||{},this[_0x11b7c9(0x155)][_0x216f3d]!==undefined;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x5ec)]=function(_0xc09dce){const _0x142ab5=_0x2e6bc0;return _0xc09dce=_0xc09dce||'',_0xc09dce='\x20'+_0xc09dce,(VisuMZ['CoreEngine'][_0x142ab5(0x6ef)][_0x142ab5(0x2fc)][_0x142ab5(0x5e4)]??!![])&&(_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.mhp\b/gi,_0x142ab5(0x48a)),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.mmp\b/gi,_0x142ab5(0x310)),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.atk\b/gi,_0x142ab5(0x643)),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.def\b/gi,_0x142ab5(0x389)),_0xc09dce=_0xc09dce['replace'](/\s(?:USER|THIS)\.mat\b/gi,'this.paramBase(4)'),_0xc09dce=_0xc09dce['replace'](/\s(?:USER|THIS)\.mdf\b/gi,_0x142ab5(0x1a7)),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.agi\b/gi,'this.paramBase(6)'),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.luk\b/gi,_0x142ab5(0x6a2)),_0xc09dce=_0xc09dce[_0x142ab5(0x20a)](/\s(?:USER|THIS)\.param\(/gi,_0x142ab5(0x225))),_0xc09dce=_0xc09dce['replace'](/\suser\./gi,_0x142ab5(0x456)),_0xc09dce;},Game_BattlerBase[_0x2e6bc0(0x5e2)]['paramPlus']=function(_0xd2f14a){const _0x31c706=_0x2e6bc0,_0x27e0ef=(_0x367267,_0x3a512a)=>{const _0x49e6c3=_0x545e;if(!_0x3a512a)return _0x367267;if(_0x3a512a[_0x49e6c3(0x6a8)][_0x49e6c3(0x298)](VisuMZ[_0x49e6c3(0x468)][_0x49e6c3(0x894)][_0x49e6c3(0x2ac)][_0xd2f14a])){var _0x950a59=Number(RegExp['$1']);_0x367267+=_0x950a59;}if(_0x3a512a['note'][_0x49e6c3(0x298)](VisuMZ[_0x49e6c3(0x468)][_0x49e6c3(0x894)][_0x49e6c3(0x484)][_0xd2f14a])){var _0x4791d2=String(RegExp['$1']);_0x4791d2=VisuMZ[_0x49e6c3(0x468)][_0x49e6c3(0x5ec)](_0x4791d2);try{_0x367267+=eval(_0x4791d2);}catch(_0xb254a1){if($gameTemp[_0x49e6c3(0x2d3)]())console[_0x49e6c3(0x882)](_0xb254a1);}}return _0x367267;};return this[_0x31c706(0x667)]()[_0x31c706(0x4e5)](_0x27e0ef,this['_paramPlus'][_0xd2f14a]);},Game_BattlerBase[_0x2e6bc0(0x5e2)]['paramMax']=function(_0x5f3a44){const _0x422a3c=_0x2e6bc0;var _0x44b0e7=_0x422a3c(0x4bf)+(this[_0x422a3c(0x4fd)]()?_0x422a3c(0x3ee):_0x422a3c(0x35e))+_0x422a3c(0x877)+_0x5f3a44;if(this[_0x422a3c(0x61a)](_0x44b0e7))return this['_cache'][_0x44b0e7];this[_0x422a3c(0x155)][_0x44b0e7]=eval(VisuMZ[_0x422a3c(0x468)][_0x422a3c(0x6ef)][_0x422a3c(0x2fc)][_0x44b0e7]);const _0x187f86=(_0x9cc426,_0x80f54f)=>{const _0x594c50=_0x422a3c;if(!_0x80f54f)return _0x9cc426;if(_0x80f54f[_0x594c50(0x6a8)][_0x594c50(0x298)](VisuMZ[_0x594c50(0x468)]['RegExp']['paramMax'][_0x5f3a44])){var _0x7beee2=Number(RegExp['$1']);if(_0x7beee2===0x0)_0x7beee2=Number[_0x594c50(0x50b)];_0x9cc426=Math[_0x594c50(0x56f)](_0x9cc426,_0x7beee2);}if(_0x80f54f[_0x594c50(0x6a8)][_0x594c50(0x298)](VisuMZ[_0x594c50(0x468)]['RegExp'][_0x594c50(0x486)][_0x5f3a44])){var _0x460776=String(RegExp['$1']);_0x460776=VisuMZ[_0x594c50(0x468)][_0x594c50(0x5ec)](_0x460776);try{_0x9cc426=Math[_0x594c50(0x56f)](_0x9cc426,Number(eval(_0x460776)));}catch(_0x23b0fb){if($gameTemp['isPlaytest']())console[_0x594c50(0x882)](_0x23b0fb);}}return _0x9cc426;};if(this[_0x422a3c(0x155)][_0x44b0e7]===0x0)this[_0x422a3c(0x155)][_0x44b0e7]=Number[_0x422a3c(0x50b)];return this[_0x422a3c(0x155)][_0x44b0e7]=this[_0x422a3c(0x667)]()[_0x422a3c(0x4e5)](_0x187f86,this[_0x422a3c(0x155)][_0x44b0e7]),this[_0x422a3c(0x155)][_0x44b0e7];},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1ac)]=function(_0x489ffb){const _0x6146c=_0x2e6bc0,_0x49087c=this[_0x6146c(0x686)](Game_BattlerBase['TRAIT_PARAM'],_0x489ffb),_0x3d17a0=(_0x4e93bd,_0x22e8a0)=>{const _0x3fa855=_0x6146c;if(!_0x22e8a0)return _0x4e93bd;if(_0x22e8a0[_0x3fa855(0x6a8)][_0x3fa855(0x298)](VisuMZ['CoreEngine'][_0x3fa855(0x894)]['paramRate1'][_0x489ffb])){var _0x1253ab=Number(RegExp['$1'])/0x64;_0x4e93bd*=_0x1253ab;}if(_0x22e8a0[_0x3fa855(0x6a8)][_0x3fa855(0x298)](VisuMZ[_0x3fa855(0x468)][_0x3fa855(0x894)][_0x3fa855(0x256)][_0x489ffb])){var _0x1253ab=Number(RegExp['$1']);_0x4e93bd*=_0x1253ab;}if(_0x22e8a0[_0x3fa855(0x6a8)][_0x3fa855(0x298)](VisuMZ[_0x3fa855(0x468)][_0x3fa855(0x894)][_0x3fa855(0x1fd)][_0x489ffb])){var _0x15980a=String(RegExp['$1']);_0x15980a=VisuMZ[_0x3fa855(0x468)][_0x3fa855(0x5ec)](_0x15980a);try{_0x4e93bd*=eval(_0x15980a);}catch(_0x1757a4){if($gameTemp[_0x3fa855(0x2d3)]())console[_0x3fa855(0x882)](_0x1757a4);}}return _0x4e93bd;};return this[_0x6146c(0x667)]()[_0x6146c(0x4e5)](_0x3d17a0,_0x49087c);},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x264)]=function(_0x10f66f){const _0x3c1980=_0x2e6bc0,_0xc8dab0=(_0x431eb1,_0x301d78)=>{const _0x446094=_0x545e;if(!_0x301d78)return _0x431eb1;if(_0x301d78[_0x446094(0x6a8)][_0x446094(0x298)](VisuMZ[_0x446094(0x468)][_0x446094(0x894)]['paramFlat'][_0x10f66f])){var _0x598e83=Number(RegExp['$1']);_0x431eb1+=_0x598e83;}if(_0x301d78['note'][_0x446094(0x298)](VisuMZ[_0x446094(0x468)][_0x446094(0x894)][_0x446094(0x863)][_0x10f66f])){var _0x263c95=String(RegExp['$1']);_0x263c95=VisuMZ[_0x446094(0x468)][_0x446094(0x5ec)](_0x263c95);try{_0x431eb1+=eval(_0x263c95);}catch(_0x4cce50){if($gameTemp['isPlaytest']())console[_0x446094(0x882)](_0x4cce50);}}return _0x431eb1;};return this[_0x3c1980(0x667)]()[_0x3c1980(0x4e5)](_0xc8dab0,0x0);},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x85c)]=function(_0x5011fe){const _0x3b4378=_0x2e6bc0;let _0x505007='param'+_0x5011fe+_0x3b4378(0x495);if(this[_0x3b4378(0x61a)](_0x505007))return this[_0x3b4378(0x155)][_0x505007];return this[_0x3b4378(0x155)][_0x505007]=Math[_0x3b4378(0x897)](VisuMZ[_0x3b4378(0x468)][_0x3b4378(0x6ef)][_0x3b4378(0x2fc)][_0x3b4378(0x259)][_0x3b4378(0x895)](this,_0x5011fe)),this[_0x3b4378(0x155)][_0x505007];},Game_BattlerBase['prototype'][_0x2e6bc0(0x80e)]=function(_0x5a63e9){const _0x29f6e9=(_0x218033,_0x2edff9)=>{const _0x888084=_0x545e;if(!_0x2edff9)return _0x218033;if(_0x2edff9[_0x888084(0x6a8)][_0x888084(0x298)](VisuMZ[_0x888084(0x468)][_0x888084(0x894)][_0x888084(0x79c)][_0x5a63e9])){var _0x21bf93=Number(RegExp['$1'])/0x64;_0x218033+=_0x21bf93;}if(_0x2edff9['note'][_0x888084(0x298)](VisuMZ[_0x888084(0x468)]['RegExp'][_0x888084(0x499)][_0x5a63e9])){var _0x21bf93=Number(RegExp['$1']);_0x218033+=_0x21bf93;}if(_0x2edff9[_0x888084(0x6a8)][_0x888084(0x298)](VisuMZ[_0x888084(0x468)]['RegExp'][_0x888084(0x51b)][_0x5a63e9])){var _0x8c302c=String(RegExp['$1']);_0x8c302c=VisuMZ[_0x888084(0x468)]['JsReplaceUserVar'](_0x8c302c);try{_0x218033+=eval(_0x8c302c);}catch(_0x4fcaee){if($gameTemp[_0x888084(0x2d3)]())console[_0x888084(0x882)](_0x4fcaee);}}return _0x218033;};return this['traitObjects']()['reduce'](_0x29f6e9,0x0);},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6d2)]=function(_0x119c57){const _0x283ac6=_0x2e6bc0,_0x3ced98=(_0x5262ba,_0x13e090)=>{const _0x1b434b=_0x545e;if(!_0x13e090)return _0x5262ba;if(_0x13e090[_0x1b434b(0x6a8)]['match'](VisuMZ[_0x1b434b(0x468)]['RegExp']['xparamRate1'][_0x119c57])){var _0x3fd207=Number(RegExp['$1'])/0x64;_0x5262ba*=_0x3fd207;}if(_0x13e090[_0x1b434b(0x6a8)][_0x1b434b(0x298)](VisuMZ[_0x1b434b(0x468)][_0x1b434b(0x894)]['xparamRate2'][_0x119c57])){var _0x3fd207=Number(RegExp['$1']);_0x5262ba*=_0x3fd207;}if(_0x13e090['note']['match'](VisuMZ[_0x1b434b(0x468)]['RegExp'][_0x1b434b(0x825)][_0x119c57])){var _0x40c7fe=String(RegExp['$1']);_0x40c7fe=VisuMZ['CoreEngine'][_0x1b434b(0x5ec)](_0x40c7fe);try{_0x5262ba*=eval(_0x40c7fe);}catch(_0x14dc50){if($gameTemp[_0x1b434b(0x2d3)]())console['log'](_0x14dc50);}}return _0x5262ba;};return this[_0x283ac6(0x667)]()[_0x283ac6(0x4e5)](_0x3ced98,0x1);},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5c7)]=function(_0x2e89bc){const _0x270db1=_0x2e6bc0,_0x34261f=(_0x3e22ba,_0x322ad6)=>{const _0x34e085=_0x545e;if(!_0x322ad6)return _0x3e22ba;if(_0x322ad6[_0x34e085(0x6a8)][_0x34e085(0x298)](VisuMZ[_0x34e085(0x468)][_0x34e085(0x894)][_0x34e085(0x37b)][_0x2e89bc])){var _0x17cc1c=Number(RegExp['$1'])/0x64;_0x3e22ba+=_0x17cc1c;}if(_0x322ad6['note'][_0x34e085(0x298)](VisuMZ[_0x34e085(0x468)][_0x34e085(0x894)]['xparamFlat2'][_0x2e89bc])){var _0x17cc1c=Number(RegExp['$1']);_0x3e22ba+=_0x17cc1c;}if(_0x322ad6[_0x34e085(0x6a8)][_0x34e085(0x298)](VisuMZ[_0x34e085(0x468)]['RegExp'][_0x34e085(0x28c)][_0x2e89bc])){var _0x32268d=String(RegExp['$1']);_0x32268d=VisuMZ['CoreEngine'][_0x34e085(0x5ec)](_0x32268d);try{_0x3e22ba+=eval(_0x32268d);}catch(_0x53c4cf){if($gameTemp['isPlaytest']())console[_0x34e085(0x882)](_0x53c4cf);}}return _0x3e22ba;};return this[_0x270db1(0x667)]()[_0x270db1(0x4e5)](_0x34261f,0x0);},Game_BattlerBase[_0x2e6bc0(0x5e2)]['xparam']=function(_0x4acff5){const _0x35e7ea=_0x2e6bc0;let _0x569f76=_0x35e7ea(0x265)+_0x4acff5+'Total';if(this[_0x35e7ea(0x61a)](_0x569f76))return this[_0x35e7ea(0x155)][_0x569f76];return this['_cache'][_0x569f76]=VisuMZ[_0x35e7ea(0x468)][_0x35e7ea(0x6ef)][_0x35e7ea(0x2fc)][_0x35e7ea(0x30d)][_0x35e7ea(0x895)](this,_0x4acff5),this[_0x35e7ea(0x155)][_0x569f76];},Game_BattlerBase['prototype'][_0x2e6bc0(0x2c0)]=function(_0xe015a){const _0x15b66a=_0x2e6bc0,_0xe3bed4=(_0x44a6b8,_0x479a0a)=>{const _0x1a7e55=_0x545e;if(!_0x479a0a)return _0x44a6b8;if(_0x479a0a['note'][_0x1a7e55(0x298)](VisuMZ[_0x1a7e55(0x468)]['RegExp'][_0x1a7e55(0x302)][_0xe015a])){var _0x2035aa=Number(RegExp['$1'])/0x64;_0x44a6b8+=_0x2035aa;}if(_0x479a0a[_0x1a7e55(0x6a8)][_0x1a7e55(0x298)](VisuMZ['CoreEngine'][_0x1a7e55(0x894)][_0x1a7e55(0x304)][_0xe015a])){var _0x2035aa=Number(RegExp['$1']);_0x44a6b8+=_0x2035aa;}if(_0x479a0a[_0x1a7e55(0x6a8)]['match'](VisuMZ['CoreEngine'][_0x1a7e55(0x894)]['sparamPlusJS'][_0xe015a])){var _0x5dd42c=String(RegExp['$1']);_0x5dd42c=VisuMZ[_0x1a7e55(0x468)]['JsReplaceUserVar'](_0x5dd42c);try{_0x44a6b8+=eval(_0x5dd42c);}catch(_0x26495e){if($gameTemp[_0x1a7e55(0x2d3)]())console[_0x1a7e55(0x882)](_0x26495e);}}return _0x44a6b8;};return this['traitObjects']()[_0x15b66a(0x4e5)](_0xe3bed4,0x0);},Game_BattlerBase[_0x2e6bc0(0x5e2)]['sparamRate']=function(_0x63b66d){const _0x239d95=_0x2e6bc0,_0x304941=(_0x87ea15,_0x4311e9)=>{const _0x3e97b6=_0x545e;if(!_0x4311e9)return _0x87ea15;if(_0x4311e9[_0x3e97b6(0x6a8)][_0x3e97b6(0x298)](VisuMZ[_0x3e97b6(0x468)]['RegExp'][_0x3e97b6(0x4ca)][_0x63b66d])){var _0x1e482e=Number(RegExp['$1'])/0x64;_0x87ea15*=_0x1e482e;}if(_0x4311e9[_0x3e97b6(0x6a8)][_0x3e97b6(0x298)](VisuMZ[_0x3e97b6(0x468)]['RegExp'][_0x3e97b6(0x640)][_0x63b66d])){var _0x1e482e=Number(RegExp['$1']);_0x87ea15*=_0x1e482e;}if(_0x4311e9[_0x3e97b6(0x6a8)][_0x3e97b6(0x298)](VisuMZ['CoreEngine'][_0x3e97b6(0x894)]['sparamRateJS'][_0x63b66d])){var _0x35af3f=String(RegExp['$1']);_0x35af3f=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x35af3f);try{_0x87ea15*=eval(_0x35af3f);}catch(_0x105235){if($gameTemp[_0x3e97b6(0x2d3)]())console[_0x3e97b6(0x882)](_0x105235);}}return _0x87ea15;};return this[_0x239d95(0x667)]()['reduce'](_0x304941,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x3cfcde){const _0x5cd958=_0x2e6bc0,_0x53e38d=(_0xed7a2d,_0x4ade04)=>{const _0x12a4dd=_0x545e;if(!_0x4ade04)return _0xed7a2d;if(_0x4ade04['note'][_0x12a4dd(0x298)](VisuMZ[_0x12a4dd(0x468)]['RegExp'][_0x12a4dd(0x547)][_0x3cfcde])){var _0x25bc7e=Number(RegExp['$1'])/0x64;_0xed7a2d+=_0x25bc7e;}if(_0x4ade04[_0x12a4dd(0x6a8)]['match'](VisuMZ[_0x12a4dd(0x468)][_0x12a4dd(0x894)]['sparamFlat2'][_0x3cfcde])){var _0x25bc7e=Number(RegExp['$1']);_0xed7a2d+=_0x25bc7e;}if(_0x4ade04[_0x12a4dd(0x6a8)][_0x12a4dd(0x298)](VisuMZ[_0x12a4dd(0x468)][_0x12a4dd(0x894)][_0x12a4dd(0x3b3)][_0x3cfcde])){var _0x5e3fce=String(RegExp['$1']);_0x5e3fce=VisuMZ[_0x12a4dd(0x468)][_0x12a4dd(0x5ec)](_0x5e3fce);try{_0xed7a2d+=eval(_0x5e3fce);}catch(_0x97f15b){if($gameTemp['isPlaytest']())console[_0x12a4dd(0x882)](_0x97f15b);}}return _0xed7a2d;};return this[_0x5cd958(0x667)]()[_0x5cd958(0x4e5)](_0x53e38d,0x0);},Game_BattlerBase[_0x2e6bc0(0x5e2)]['sparam']=function(_0x15e14d){const _0x1fa438=_0x2e6bc0;let _0x2b20bc=_0x1fa438(0x500)+_0x15e14d+_0x1fa438(0x495);if(this[_0x1fa438(0x61a)](_0x2b20bc))return this['_cache'][_0x2b20bc];return this['_cache'][_0x2b20bc]=VisuMZ[_0x1fa438(0x468)][_0x1fa438(0x6ef)][_0x1fa438(0x2fc)][_0x1fa438(0x2a0)][_0x1fa438(0x895)](this,_0x15e14d),this[_0x1fa438(0x155)][_0x2b20bc];},Game_BattlerBase['prototype'][_0x2e6bc0(0x403)]=function(_0x436ad5,_0xf1d375){const _0x31f064=_0x2e6bc0;if(typeof paramId==='number')return this[_0x31f064(0x85c)](_0x436ad5);_0x436ad5=String(_0x436ad5||'')[_0x31f064(0x63e)]();if(_0x436ad5===_0x31f064(0x4a4))return this[_0x31f064(0x85c)](0x0);if(_0x436ad5===_0x31f064(0x1e9))return this[_0x31f064(0x85c)](0x1);if(_0x436ad5===_0x31f064(0x5e3))return this[_0x31f064(0x85c)](0x2);if(_0x436ad5===_0x31f064(0x227))return this[_0x31f064(0x85c)](0x3);if(_0x436ad5===_0x31f064(0x149))return this['param'](0x4);if(_0x436ad5===_0x31f064(0x34d))return this[_0x31f064(0x85c)](0x5);if(_0x436ad5===_0x31f064(0x670))return this[_0x31f064(0x85c)](0x6);if(_0x436ad5===_0x31f064(0x853))return this[_0x31f064(0x85c)](0x7);if(_0x436ad5==='HIT')return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x0)*0x64))+'%':this[_0x31f064(0x265)](0x0);if(_0x436ad5===_0x31f064(0x231))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x436ad5===_0x31f064(0x2ba))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x436ad5==='CEV')return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x3)*0x64))+'%':this[_0x31f064(0x265)](0x3);if(_0x436ad5===_0x31f064(0x7e4))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x436ad5==='MRF')return _0xf1d375?String(Math[_0x31f064(0x897)](this['xparam'](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x436ad5==='CNT')return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x6)*0x64))+'%':this[_0x31f064(0x265)](0x6);if(_0x436ad5===_0x31f064(0x197))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x265)](0x7)*0x64))+'%':this[_0x31f064(0x265)](0x7);if(_0x436ad5===_0x31f064(0x217))return _0xf1d375?String(Math['round'](this[_0x31f064(0x265)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x436ad5===_0x31f064(0x373))return _0xf1d375?String(Math['round'](this[_0x31f064(0x265)](0x9)*0x64))+'%':this[_0x31f064(0x265)](0x9);if(_0x436ad5==='TGR')return _0xf1d375?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this[_0x31f064(0x500)](0x0);if(_0x436ad5===_0x31f064(0x411))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x1)*0x64))+'%':this[_0x31f064(0x500)](0x1);if(_0x436ad5==='REC')return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x436ad5===_0x31f064(0x8c2))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x3)*0x64))+'%':this[_0x31f064(0x500)](0x3);if(_0x436ad5===_0x31f064(0x79b))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x4)*0x64))+'%':this[_0x31f064(0x500)](0x4);if(_0x436ad5===_0x31f064(0x3ef))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x5)*0x64))+'%':this[_0x31f064(0x500)](0x5);if(_0x436ad5==='PDR')return _0xf1d375?String(Math[_0x31f064(0x897)](this['sparam'](0x6)*0x64))+'%':this[_0x31f064(0x500)](0x6);if(_0x436ad5==='MDR')return _0xf1d375?String(Math['round'](this[_0x31f064(0x500)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x436ad5===_0x31f064(0x587))return _0xf1d375?String(Math[_0x31f064(0x897)](this[_0x31f064(0x500)](0x8)*0x64))+'%':this[_0x31f064(0x500)](0x8);if(_0x436ad5===_0x31f064(0x312))return _0xf1d375?String(Math['round'](this[_0x31f064(0x500)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x31f064(0x468)][_0x31f064(0x479)][_0x436ad5]){const _0x5d71ec=VisuMZ['CoreEngine'][_0x31f064(0x479)][_0x436ad5],_0x4527e8=this[_0x5d71ec];return VisuMZ['CoreEngine'][_0x31f064(0xf3)][_0x436ad5]===_0x31f064(0x11d)?_0x4527e8:_0xf1d375?String(Math[_0x31f064(0x897)](_0x4527e8*0x64))+'%':_0x4527e8;}return'';},Game_BattlerBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x337)]=function(){const _0x388b4e=_0x2e6bc0;return this[_0x388b4e(0x351)]()&&this[_0x388b4e(0xef)]<this[_0x388b4e(0x1cd)]*VisuMZ[_0x388b4e(0x468)]['Settings'][_0x388b4e(0x2fc)][_0x388b4e(0x1bd)];},Game_Battler[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x241)]=function(){const _0x3b2188=_0x2e6bc0;SoundManager['playMiss'](),this[_0x3b2188(0x18f)]('evade');},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x183)]=Game_Actor[_0x2e6bc0(0x5e2)]['paramBase'],Game_Actor['prototype'][_0x2e6bc0(0x85a)]=function(_0x45cacc){const _0x1d9a30=_0x2e6bc0;if(this[_0x1d9a30(0x4c0)]>0x63)return this[_0x1d9a30(0xe3)](_0x45cacc);return VisuMZ[_0x1d9a30(0x468)][_0x1d9a30(0x183)][_0x1d9a30(0x895)](this,_0x45cacc);},Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0xe3)]=function(_0x339995){const _0xb60f71=_0x2e6bc0,_0x1522e6=this[_0xb60f71(0x7cd)]()[_0xb60f71(0x4e6)][_0x339995][0x63],_0x44f674=this[_0xb60f71(0x7cd)]()[_0xb60f71(0x4e6)][_0x339995][0x62];return _0x1522e6+(_0x1522e6-_0x44f674)*(this['level']-0x63);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x74b)]=Game_Actor['prototype'][_0x2e6bc0(0x562)],Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x562)]=function(_0x392015,_0x2acff5){const _0xb540aa=_0x2e6bc0;$gameTemp['_changingClass']=!![],VisuMZ[_0xb540aa(0x468)][_0xb540aa(0x74b)][_0xb540aa(0x895)](this,_0x392015,_0x2acff5),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x288)]=Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6cb)],Game_Actor['prototype'][_0x2e6bc0(0x6cb)]=function(){const _0xa2173c=_0x2e6bc0;VisuMZ[_0xa2173c(0x468)][_0xa2173c(0x288)][_0xa2173c(0x895)](this);if(!$gameTemp['_changingClass'])this[_0xa2173c(0x693)]();},Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x693)]=function(){const _0x2877d3=_0x2e6bc0;this[_0x2877d3(0x155)]={};if(VisuMZ[_0x2877d3(0x468)][_0x2877d3(0x6ef)][_0x2877d3(0x818)]['LevelUpFullHp'])this[_0x2877d3(0xef)]=this[_0x2877d3(0x1cd)];if(VisuMZ[_0x2877d3(0x468)][_0x2877d3(0x6ef)][_0x2877d3(0x818)]['LevelUpFullMp'])this[_0x2877d3(0x7f2)]=this['mmp'];},Game_Actor['prototype']['expRate']=function(){const _0x542c05=_0x2e6bc0;if(this[_0x542c05(0x424)]())return 0x1;const _0x21f210=this[_0x542c05(0x22f)]()-this['currentLevelExp'](),_0x323906=this[_0x542c05(0x3e1)]()-this[_0x542c05(0x5f4)]();return(_0x323906/_0x21f210)[_0x542c05(0x2eb)](0x0,0x1);},Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x667)]=function(){const _0x528069=_0x2e6bc0,_0x36fe15=Game_Battler[_0x528069(0x5e2)][_0x528069(0x667)][_0x528069(0x895)](this);for(const _0xf5aa40 of this[_0x528069(0x4bd)]()){_0xf5aa40&&_0x36fe15[_0x528069(0x16c)](_0xf5aa40);}return _0x36fe15[_0x528069(0x16c)](this[_0x528069(0x7cd)](),this[_0x528069(0x780)]()),_0x36fe15;},VisuMZ[_0x2e6bc0(0x468)]['Game_Actor_isPreserveTp']=Game_Actor['prototype']['isPreserveTp'],Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1d9)]=function(){const _0x3dbcfa=_0x2e6bc0;if(!$gameParty[_0x3dbcfa(0x3f6)]())return!![];return VisuMZ[_0x3dbcfa(0x468)][_0x3dbcfa(0x3b4)][_0x3dbcfa(0x895)](this);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x7d5)]=Game_Unit['prototype'][_0x2e6bc0(0x18d)],Game_Unit[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x18d)]=function(_0x39a6d2){const _0x16bc24=_0x2e6bc0;this[_0x16bc24(0x730)]=!![],VisuMZ['CoreEngine']['Game_Unit_onBattleStart'][_0x16bc24(0x895)](this,_0x39a6d2);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x444)]=Game_Unit[_0x2e6bc0(0x5e2)]['onBattleEnd'],Game_Unit[_0x2e6bc0(0x5e2)]['onBattleEnd']=function(){const _0x5ceee1=_0x2e6bc0;for(const _0x1613cc of this['members']()){_0x1613cc&&!_0x1613cc[_0x5ceee1(0x1d9)]()&&_0x1613cc[_0x5ceee1(0x89b)]();}VisuMZ[_0x5ceee1(0x468)][_0x5ceee1(0x444)][_0x5ceee1(0x895)](this);},Object[_0x2e6bc0(0x738)](Game_Enemy[_0x2e6bc0(0x5e2)],_0x2e6bc0(0x4c0),{'get':function(){const _0x4fdbbd=_0x2e6bc0;return this[_0x4fdbbd(0x4cf)]();},'configurable':!![]}),Game_Enemy[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4cf)]=function(){const _0xdabf8e=_0x2e6bc0;return this[_0xdabf8e(0x8b1)]()['level'];},Game_Enemy[_0x2e6bc0(0x5e2)][_0x2e6bc0(0xff)]=function(){const _0x523c37=_0x2e6bc0;!this[_0x523c37(0x356)]&&(this[_0x523c37(0x3db)]+=Math[_0x523c37(0x897)]((Graphics['height']-0x270)/0x2),this[_0x523c37(0x3db)]-=Math[_0x523c37(0x3ff)]((Graphics[_0x523c37(0x689)]-Graphics[_0x523c37(0x849)])/0x2),$gameSystem['isSideView']()?this[_0x523c37(0x6b6)]-=Math[_0x523c37(0x3ff)]((Graphics['width']-Graphics[_0x523c37(0x2b2)])/0x2):this['_screenX']+=Math['round']((Graphics['boxWidth']-0x330)/0x2)),this[_0x523c37(0x356)]=!![];},Game_Party['prototype'][_0x2e6bc0(0x2b4)]=function(){const _0x364daf=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x364daf(0x6ef)][_0x364daf(0x211)][_0x364daf(0x623)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party['prototype']['consumeItem'],Game_Party[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c1)]=function(_0x48fd68){const _0x1205ef=_0x2e6bc0;if(VisuMZ[_0x1205ef(0x468)][_0x1205ef(0x6ef)]['QoL'][_0x1205ef(0x178)]&&DataManager['isKeyItem'](_0x48fd68))return;VisuMZ[_0x1205ef(0x468)][_0x1205ef(0x626)][_0x1205ef(0x895)](this,_0x48fd68);},Game_Party[_0x2e6bc0(0x5e2)]['setupBattleTestItems']=function(){const _0x1350c2=_0x2e6bc0,_0x3f28e7=VisuMZ[_0x1350c2(0x468)][_0x1350c2(0x6ef)]['QoL'],_0x388739=_0x3f28e7[_0x1350c2(0x672)]??0x63;let _0x5bd308=[];(_0x3f28e7[_0x1350c2(0x408)]??!![])&&(_0x5bd308=_0x5bd308['concat']($dataItems));(_0x3f28e7['BTestWeapons']??!![])&&(_0x5bd308=_0x5bd308[_0x1350c2(0x720)]($dataWeapons));(_0x3f28e7[_0x1350c2(0x238)]??!![])&&(_0x5bd308=_0x5bd308['concat']($dataArmors));for(const _0x2a158d of _0x5bd308){if(!_0x2a158d)continue;if(_0x2a158d[_0x1350c2(0x3d0)]['trim']()<=0x0)continue;if(_0x2a158d['name'][_0x1350c2(0x298)](/-----/i))continue;this[_0x1350c2(0x189)](_0x2a158d,_0x388739);}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x550)]=Game_Troop[_0x2e6bc0(0x5e2)]['setup'],Game_Troop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x274)]=function(_0x9c9e9a){const _0x4c679a=_0x2e6bc0;$gameTemp[_0x4c679a(0x81f)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x9c9e9a),VisuMZ[_0x4c679a(0x468)][_0x4c679a(0x550)]['call'](this,_0x9c9e9a);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x3cf)]=Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x274)],Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x274)]=function(_0x2a25c2){const _0x4f736d=_0x2e6bc0;VisuMZ[_0x4f736d(0x468)][_0x4f736d(0x3cf)]['call'](this,_0x2a25c2),this[_0x4f736d(0x192)](),this[_0x4f736d(0x769)](_0x2a25c2),this['setupTileExtendTerrainTags']();},Game_Map['prototype'][_0x2e6bc0(0x769)]=function(){const _0x2c1083=_0x2e6bc0;this[_0x2c1083(0x1f4)]=VisuMZ[_0x2c1083(0x468)]['Settings'][_0x2c1083(0x818)][_0x2c1083(0x8a7)]||![];const _0x48ab7a=VisuMZ[_0x2c1083(0x468)][_0x2c1083(0x6ef)][_0x2c1083(0x2bb)],_0x17d80b=$dataMap?$dataMap[_0x2c1083(0x6a8)]||'':'';if(_0x17d80b['match'](/<SHOW TILE SHADOWS>/i))this[_0x2c1083(0x1f4)]=![];else _0x17d80b[_0x2c1083(0x298)](/<HIDE TILE SHADOWS>/i)&&(this[_0x2c1083(0x1f4)]=!![]);if(_0x17d80b[_0x2c1083(0x298)](/<SCROLL LOCK X>/i))this[_0x2c1083(0x739)]()[_0x2c1083(0x123)]=!![],this['centerCameraCheckData']()[_0x2c1083(0x1af)]=_0x48ab7a[_0x2c1083(0x6c6)];else _0x17d80b['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x2c1083(0x739)]()[_0x2c1083(0x123)]=!![],this[_0x2c1083(0x739)]()[_0x2c1083(0x1af)]=Number(RegExp['$1']));if(_0x17d80b[_0x2c1083(0x298)](/<SCROLL LOCK Y>/i))this[_0x2c1083(0x739)]()[_0x2c1083(0x379)]=!![],this[_0x2c1083(0x739)]()['displayY']=_0x48ab7a[_0x2c1083(0x420)];else _0x17d80b[_0x2c1083(0x298)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x2c1083(0x739)]()['centerY']=!![],this[_0x2c1083(0x739)]()[_0x2c1083(0x7ac)]=Number(RegExp['$1']));},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x690)]=function(){const _0x7acd8e=_0x2e6bc0;if(this[_0x7acd8e(0x1f4)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x192)]=function(){const _0x15426d=_0x2e6bc0,_0x363edc=VisuMZ[_0x15426d(0x468)][_0x15426d(0x6ef)]['ScreenResolution'];this[_0x15426d(0x12c)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x363edc[_0x15426d(0x294)]){const _0x2514cb=Graphics[_0x15426d(0x746)]/this[_0x15426d(0x363)]();_0x2514cb%0x1!==0x0&&Math[_0x15426d(0x539)](_0x2514cb)===this[_0x15426d(0x746)]()&&!this[_0x15426d(0x728)]()&&(this[_0x15426d(0x12c)][_0x15426d(0x123)]=!![],this[_0x15426d(0x12c)]['displayX']=_0x363edc['DisplayLockX']||0x0);}if(_0x363edc[_0x15426d(0x89f)]){const _0x4d36da=Graphics[_0x15426d(0x689)]/this[_0x15426d(0x5f7)]();_0x4d36da%0x1!==0x0&&Math[_0x15426d(0x539)](_0x4d36da)===this[_0x15426d(0x689)]()&&!this['isLoopVertical']()&&(this[_0x15426d(0x12c)][_0x15426d(0x379)]=!![],this[_0x15426d(0x12c)]['displayY']=_0x363edc[_0x15426d(0x420)]||0x0);}$gameScreen[_0x15426d(0x723)]()===0x1&&(this[_0x15426d(0x739)]()[_0x15426d(0x123)]&&(this[_0x15426d(0x4f1)]=this[_0x15426d(0x739)]()[_0x15426d(0x1af)]),this[_0x15426d(0x739)]()['centerY']&&(this['_displayY']=this[_0x15426d(0x739)]()[_0x15426d(0x7ac)]));},VisuMZ[_0x2e6bc0(0x468)]['Game_Map_setDisplayPos']=Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5f8)],Game_Map[_0x2e6bc0(0x5e2)]['setDisplayPos']=function(_0x4cca87,_0x2b64d7){const _0x122db6=_0x2e6bc0;VisuMZ[_0x122db6(0x468)]['Game_Map_setDisplayPos'][_0x122db6(0x895)](this,_0x4cca87,_0x2b64d7),$gameScreen['zoomScale']()===0x1&&(!this[_0x122db6(0x728)]()&&this[_0x122db6(0x739)]()[_0x122db6(0x123)]&&(this[_0x122db6(0x4f1)]=this['centerCameraCheckData']()[_0x122db6(0x1af)]),!this[_0x122db6(0x400)]()&&this[_0x122db6(0x739)]()[_0x122db6(0x379)]&&(this[_0x122db6(0x35a)]=this['centerCameraCheckData']()[_0x122db6(0x7ac)]));},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x739)]=function(){const _0x4d7538=_0x2e6bc0;if(this['_centerCameraCheck']===undefined)this[_0x4d7538(0x192)]();return this['_centerCameraCheck'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x173)]=Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2bd)],Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2bd)]=function(_0x43bab7){const _0x4d5d98=_0x2e6bc0;if(this[_0x4d5d98(0x739)]()[_0x4d5d98(0x379)]&&$gameScreen[_0x4d5d98(0x723)]()===0x1){this[_0x4d5d98(0x35a)]=this[_0x4d5d98(0x739)]()[_0x4d5d98(0x7ac)];return;}VisuMZ[_0x4d5d98(0x468)]['Game_Map_scrollDown'][_0x4d5d98(0x895)](this,_0x43bab7);},VisuMZ[_0x2e6bc0(0x468)]['Game_Map_scrollLeft']=Game_Map[_0x2e6bc0(0x5e2)]['scrollLeft'],Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x198)]=function(_0xb6af62){const _0x29bb3c=_0x2e6bc0;if(this[_0x29bb3c(0x739)]()[_0x29bb3c(0x123)]&&$gameScreen[_0x29bb3c(0x723)]()===0x1){this[_0x29bb3c(0x4f1)]=this[_0x29bb3c(0x739)]()[_0x29bb3c(0x1af)];return;}VisuMZ[_0x29bb3c(0x468)][_0x29bb3c(0x2aa)][_0x29bb3c(0x895)](this,_0xb6af62);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0xfd)]=Game_Map['prototype']['scrollRight'],Game_Map[_0x2e6bc0(0x5e2)]['scrollRight']=function(_0xe864ab){const _0x21b0b4=_0x2e6bc0;if(this[_0x21b0b4(0x739)]()[_0x21b0b4(0x123)]&&$gameScreen[_0x21b0b4(0x723)]()===0x1){this[_0x21b0b4(0x4f1)]=this[_0x21b0b4(0x739)]()['displayX'];return;}VisuMZ[_0x21b0b4(0x468)][_0x21b0b4(0xfd)][_0x21b0b4(0x895)](this,_0xe864ab);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x175)]=Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x243)],Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x243)]=function(_0x262201){const _0x3c77f9=_0x2e6bc0;if(this[_0x3c77f9(0x739)]()[_0x3c77f9(0x379)]&&$gameScreen[_0x3c77f9(0x723)]()===0x1){this[_0x3c77f9(0x35a)]=this[_0x3c77f9(0x739)]()[_0x3c77f9(0x7ac)];return;}VisuMZ[_0x3c77f9(0x468)][_0x3c77f9(0x175)][_0x3c77f9(0x895)](this,_0x262201);},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x72d)]=function(){const _0x2fd7e9=_0x2e6bc0;this[_0x2fd7e9(0x563)]={};const _0x3d3393=this[_0x2fd7e9(0x6be)]();if(!_0x3d3393)return{};const _0x4c3478=_0x3d3393['note']||'',_0x481a03=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x18bf32={};const _0x35f2eb=_0x4c3478[_0x2fd7e9(0x298)](_0x481a03);if(_0x35f2eb)for(const _0x5c1120 of _0x35f2eb){_0x5c1120[_0x2fd7e9(0x298)](_0x481a03);const _0x22862e=Number(RegExp['$1'])[_0x2fd7e9(0x2eb)](0x1,0x10),_0x134414=String(RegExp['$2'])[_0x2fd7e9(0x440)](',')['map'](_0x16fb6f=>Number(_0x16fb6f)['clamp'](0x1,0x7));for(const _0x593843 of _0x134414){_0x18bf32[_0x593843]=_0x22862e;}}this[_0x2fd7e9(0x563)]=_0x18bf32;},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2de)]=function(){const _0x212365=_0x2e6bc0;if(this[_0x212365(0x563)]===undefined)this[_0x212365(0x72d)]();return this[_0x212365(0x563)];},Game_Map[_0x2e6bc0(0x5e2)]['isTileExtended']=function(_0x17f436){const _0x2147fa=_0x2e6bc0;if(_0x17f436>=0x400)return![];const _0xa1a08=$gameMap['getTileExtendTerrainTags']();if(Object[_0x2147fa(0x316)](_0xa1a08)[_0x2147fa(0x29e)]<=0x0)return![];const _0x23ff7a=this[_0x2147fa(0x452)](),_0x4de59e=_0x23ff7a[_0x17f436]>>0xc,_0x1dfe76=_0xa1a08[_0x4de59e]||0x0;return _0x1dfe76>0x0;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x199)]=Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4d5)],Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4d5)]=function(_0x4949b4){const _0x27f148=_0x2e6bc0;VisuMZ[_0x27f148(0x468)]['Game_Map_changeTileset'][_0x27f148(0x895)](this,_0x4949b4),this[_0x27f148(0x696)](),SceneManager[_0x27f148(0x49a)]['_spriteset'][_0x27f148(0x645)]();},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x696)]=function(){const _0x2c21f4=_0x2e6bc0,_0x524035=this['getTileExtendTerrainTags']();if(Object[_0x2c21f4(0x316)](_0x524035)[_0x2c21f4(0x29e)]<=0x0)return;const _0x43548b=SceneManager[_0x2c21f4(0x49a)][_0x2c21f4(0x722)];_0x43548b&&(_0x43548b[_0x2c21f4(0x1c4)]&&_0x43548b['removeTileExtendSprites'](),_0x43548b[_0x2c21f4(0xec)]&&_0x43548b[_0x2c21f4(0xec)]());},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x496)]=Game_Character[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4e9)],Game_Character[_0x2e6bc0(0x5e2)]['processMoveCommand']=function(_0x1a8c3e){const _0x4ca2b4=_0x2e6bc0;try{VisuMZ[_0x4ca2b4(0x468)][_0x4ca2b4(0x496)][_0x4ca2b4(0x895)](this,_0x1a8c3e);}catch(_0x54e250){if($gameTemp[_0x4ca2b4(0x2d3)]())console[_0x4ca2b4(0x882)](_0x54e250);}},Game_Player[_0x2e6bc0(0x5e2)]['makeEncounterCount']=function(){const _0x139b51=_0x2e6bc0,_0x2b5446=$gameMap[_0x139b51(0xf9)]();this[_0x139b51(0x5de)]=Math[_0x139b51(0x3b7)](_0x2b5446)+Math[_0x139b51(0x3b7)](_0x2b5446)+this[_0x139b51(0x169)]();},Game_Player['prototype'][_0x2e6bc0(0x169)]=function(){const _0x3e8b75=_0x2e6bc0;return $dataMap&&$dataMap[_0x3e8b75(0x6a8)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x3e8b75(0x468)]['Settings'][_0x3e8b75(0x818)][_0x3e8b75(0x276)];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x666)]=Game_Event[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7a8)],Game_Event[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7a8)]=function(_0x2c756f,_0x21049c){const _0xeaee38=_0x2e6bc0;return this['isSmartEventCollisionOn']()?this[_0xeaee38(0x248)](_0x2c756f,_0x21049c):VisuMZ[_0xeaee38(0x468)][_0xeaee38(0x666)][_0xeaee38(0x895)](this,_0x2c756f,_0x21049c);},Game_Event['prototype'][_0x2e6bc0(0x208)]=function(){const _0x1de601=_0x2e6bc0;return VisuMZ[_0x1de601(0x468)]['Settings'][_0x1de601(0x818)][_0x1de601(0x323)];},Game_Event[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x248)]=function(_0xde9bfd,_0x3dfc01){const _0x5ebccf=_0x2e6bc0;if(!this[_0x5ebccf(0x597)]())return![];else{const _0x53b488=$gameMap[_0x5ebccf(0x39d)](_0xde9bfd,_0x3dfc01)[_0x5ebccf(0x5c0)](_0x23898c=>_0x23898c[_0x5ebccf(0x597)]());return _0x53b488['length']>0x0;}},VisuMZ['CoreEngine'][_0x2e6bc0(0x2bc)]=Game_Interpreter['prototype']['command105'],Game_Interpreter['prototype'][_0x2e6bc0(0x6a5)]=function(_0x32ffe6){const _0x21df92=_0x2e6bc0,_0x3fcfc8=this['getCombinedScrollingText']();return _0x3fcfc8[_0x21df92(0x298)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x3fcfc8):VisuMZ[_0x21df92(0x468)][_0x21df92(0x2bc)][_0x21df92(0x895)](this,_0x32ffe6);},Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x46b)]=function(){const _0x59da05=_0x2e6bc0;let _0x45b395='',_0x22666e=this[_0x59da05(0x7f8)]+0x1;while(this[_0x59da05(0x642)][_0x22666e]&&this[_0x59da05(0x642)][_0x22666e][_0x59da05(0x6d9)]===0x195){_0x45b395+=this[_0x59da05(0x642)][_0x22666e][_0x59da05(0x69c)][0x0]+'\x0a',_0x22666e++;}return _0x45b395;},Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x86c)]=function(_0x315cd6){const _0x51cb84=_0x2e6bc0;try{eval(_0x315cd6);}catch(_0x30e7ad){$gameTemp[_0x51cb84(0x2d3)]()&&(console['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x51cb84(0x882)](_0x30e7ad));}return!![];},VisuMZ['CoreEngine'][_0x2e6bc0(0x7e0)]=Game_Interpreter['prototype']['command111'],Game_Interpreter[_0x2e6bc0(0x5e2)]['command111']=function(_0xba97ed){const _0x783cee=_0x2e6bc0;try{VisuMZ['CoreEngine'][_0x783cee(0x7e0)][_0x783cee(0x895)](this,_0xba97ed);}catch(_0x11bca1){$gameTemp[_0x783cee(0x2d3)]()&&(console[_0x783cee(0x882)](_0x783cee(0x2e8)),console[_0x783cee(0x882)](_0x11bca1)),this[_0x783cee(0x7ce)]();}return!![];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1cb)]=Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7c4)],Game_Interpreter['prototype'][_0x2e6bc0(0x7c4)]=function(_0x59bbac){const _0x4251de=_0x2e6bc0;try{VisuMZ[_0x4251de(0x468)][_0x4251de(0x1cb)]['call'](this,_0x59bbac);}catch(_0x3ad035){$gameTemp[_0x4251de(0x2d3)]()&&(console[_0x4251de(0x882)](_0x4251de(0x662)),console[_0x4251de(0x882)](_0x3ad035));}return!![];},VisuMZ['CoreEngine'][_0x2e6bc0(0x224)]=Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x89c)],Game_Interpreter[_0x2e6bc0(0x5e2)]['command355']=function(){const _0xfb5954=_0x2e6bc0;try{VisuMZ['CoreEngine']['Game_Interpreter_command355']['call'](this);}catch(_0x5d8939){$gameTemp[_0xfb5954(0x2d3)]()&&(console['log']('Script\x20Call\x20Error'),console[_0xfb5954(0x882)](_0x5d8939));}return!![];},VisuMZ['CoreEngine'][_0x2e6bc0(0x814)]=Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x487)],Game_Interpreter['prototype'][_0x2e6bc0(0x487)]=function(_0x1f3026){const _0x21d888=_0x2e6bc0;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x21d888(0x468)][_0x21d888(0x814)][_0x21d888(0x895)](this,_0x1f3026);},Scene_Base[_0x2e6bc0(0x5e2)]['fadeSpeed']=function(){const _0x1c11aa=_0x2e6bc0;return VisuMZ[_0x1c11aa(0x468)][_0x1c11aa(0x6ef)]['UI'][_0x1c11aa(0x591)];},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x193)]=function(){const _0x318602=_0x2e6bc0;return VisuMZ[_0x318602(0x468)][_0x318602(0x6ef)]['UI'][_0x318602(0x290)];},Scene_Base['prototype'][_0x2e6bc0(0x7dd)]=function(){const _0x412b07=_0x2e6bc0;return VisuMZ[_0x412b07(0x468)][_0x412b07(0x6ef)]['UI']['BottomButtons'];},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x36b)]=function(){const _0x4927e5=_0x2e6bc0;return VisuMZ[_0x4927e5(0x468)][_0x4927e5(0x6ef)]['UI'][_0x4927e5(0x184)];},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2ee)]=function(){const _0x5238d4=_0x2e6bc0;return VisuMZ[_0x5238d4(0x468)][_0x5238d4(0x6ef)]['UI']['CommandWidth'];},Scene_Base['prototype']['buttonAreaHeight']=function(){const _0x3c6e51=_0x2e6bc0;return VisuMZ[_0x3c6e51(0x468)][_0x3c6e51(0x6ef)]['UI'][_0x3c6e51(0x603)];},Scene_Base['prototype'][_0x2e6bc0(0x6af)]=function(){const _0x2acfff=_0x2e6bc0;return VisuMZ[_0x2acfff(0x468)][_0x2acfff(0x6ef)][_0x2acfff(0x76e)]['EnableMasking'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x469)]=Scene_Base[_0x2e6bc0(0x5e2)]['createWindowLayer'],Scene_Base[_0x2e6bc0(0x5e2)]['createWindowLayer']=function(){const _0x521048=_0x2e6bc0;VisuMZ[_0x521048(0x468)][_0x521048(0x469)][_0x521048(0x895)](this),this[_0x521048(0x332)](),this[_0x521048(0x6da)](),this[_0x521048(0x4f0)]['x']=Math[_0x521048(0x897)](this[_0x521048(0x4f0)]['x']),this[_0x521048(0x4f0)]['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x2e6bc0(0x332)]=function(){},Scene_Base['prototype'][_0x2e6bc0(0x6da)]=function(){const _0x3900a9=_0x2e6bc0;this[_0x3900a9(0x4a8)]=new Window_TextPopup(),this[_0x3900a9(0x6e8)](this[_0x3900a9(0x4a8)]);},$textPopup=function(_0x20e303){const _0x41660f=_0x2e6bc0,_0x39a3c2=SceneManager['_scene'][_0x41660f(0x4a8)];_0x39a3c2&&_0x39a3c2[_0x41660f(0x781)](_0x20e303);},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6d3)]=function(){const _0x15c52b=_0x2e6bc0;return TextManager[_0x15c52b(0x705)](_0x15c52b(0x8a5),_0x15c52b(0x53a));},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x54e)]=function(){return TextManager['getInputButtonString']('tab');},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x461)]=function(){const _0x3ee00d=_0x2e6bc0;return TextManager[_0x3ee00d(0x76a)](_0x3ee00d(0x2f3));},Scene_Base['prototype']['buttonAssistKey4']=function(){const _0x51163f=_0x2e6bc0;return TextManager[_0x51163f(0x76a)]('ok');},Scene_Base[_0x2e6bc0(0x5e2)]['buttonAssistKey5']=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6f5)]=function(){const _0x2bc02e=_0x2e6bc0;return this[_0x2bc02e(0x768)]&&this[_0x2bc02e(0x768)]['visible']?TextManager[_0x2bc02e(0x4f9)]:'';},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x10f)]=function(){return'';},Scene_Base[_0x2e6bc0(0x5e2)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x121)]=function(){const _0x345972=_0x2e6bc0;return TextManager[_0x345972(0x691)];},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3df)]=function(){const _0x10baf5=_0x2e6bc0;return TextManager[_0x10baf5(0x6ea)];},Scene_Base['prototype'][_0x2e6bc0(0x7b8)]=function(){return 0x0;},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5b1)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x8a9)]=function(){return 0x0;},Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x83d)]=function(){return 0x0;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x27a)]=Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x40e)],Scene_Boot[_0x2e6bc0(0x5e2)]['loadSystemImages']=function(){const _0x3a50d3=_0x2e6bc0;VisuMZ['CoreEngine'][_0x3a50d3(0x27a)][_0x3a50d3(0x895)](this),this[_0x3a50d3(0x45f)]();},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x45f)]=function(){const _0x448953=_0x2e6bc0,_0x4d7ace=['animations','battlebacks1',_0x448953(0x8b2),_0x448953(0x572),'enemies',_0x448953(0x3bf),_0x448953(0x5ce),'pictures','sv_actors',_0x448953(0x5a2),_0x448953(0x564),_0x448953(0x43d),_0x448953(0x7b6),'titles2'];for(const _0x30c364 of _0x4d7ace){const _0xb77a3c=VisuMZ[_0x448953(0x468)][_0x448953(0x6ef)][_0x448953(0x6e6)][_0x30c364],_0x3742b6=_0x448953(0x7bc)[_0x448953(0x607)](_0x30c364);for(const _0x3891f5 of _0xb77a3c){ImageManager[_0x448953(0x1da)](_0x3742b6,_0x3891f5);}}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1fa)]=Scene_Boot[_0x2e6bc0(0x5e2)]['startNormalGame'],Scene_Boot['prototype'][_0x2e6bc0(0x752)]=function(){const _0x54b748=_0x2e6bc0;Utils[_0x54b748(0x88d)]('test')&&VisuMZ[_0x54b748(0x468)]['Settings'][_0x54b748(0x818)][_0x54b748(0x6eb)]?this['startAutoNewGame']():VisuMZ['CoreEngine'][_0x54b748(0x1fa)][_0x54b748(0x895)](this);},Scene_Boot[_0x2e6bc0(0x5e2)]['startAutoNewGame']=function(){const _0x2f0e80=_0x2e6bc0;this['checkPlayerLocation'](),DataManager['setupNewGame'](),SceneManager[_0x2f0e80(0x61e)](Scene_Map);},Scene_Boot['prototype'][_0x2e6bc0(0x6dd)]=function(){const _0x4b4c74=_0x2e6bc0,_0x47d112=$dataSystem[_0x4b4c74(0x212)]['uiAreaWidth'],_0x13ebb0=$dataSystem[_0x4b4c74(0x212)][_0x4b4c74(0x86f)],_0xab3850=VisuMZ[_0x4b4c74(0x468)][_0x4b4c74(0x6ef)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x47d112-_0xab3850*0x2,Graphics['boxHeight']=_0x13ebb0-_0xab3850*0x2,this[_0x4b4c74(0x80d)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x39b)]=Scene_Boot['prototype'][_0x2e6bc0(0x6e5)],Scene_Boot[_0x2e6bc0(0x5e2)]['updateDocumentTitle']=function(){const _0x255a1b=_0x2e6bc0;this[_0x255a1b(0x867)]()?this[_0x255a1b(0x326)]():VisuMZ[_0x255a1b(0x468)][_0x255a1b(0x39b)]['call'](this);},Scene_Boot[_0x2e6bc0(0x5e2)]['isFullDocumentTitle']=function(){const _0x31c04e=_0x2e6bc0;if(Scene_Title['subtitle']==='')return![];if(Scene_Title['subtitle']==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x31c04e(0x6d6)]===_0x31c04e(0x2b8))return![];return!![];},Scene_Boot['prototype'][_0x2e6bc0(0x326)]=function(){const _0xe2697a=_0x2e6bc0,_0x302a26=$dataSystem[_0xe2697a(0x101)],_0x260719=Scene_Title[_0xe2697a(0x514)]||'',_0xd769=Scene_Title[_0xe2697a(0x6d6)]||'',_0x1b0286=VisuMZ[_0xe2697a(0x468)][_0xe2697a(0x6ef)][_0xe2697a(0x573)][_0xe2697a(0x887)][_0xe2697a(0x4d0)],_0x1a30b8=_0x1b0286[_0xe2697a(0x607)](_0x302a26,_0x260719,_0xd769);document[_0xe2697a(0x331)]=_0x1a30b8;},Scene_Boot[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x80d)]=function(){const _0x2ff7a3=_0x2e6bc0;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x2ff7a3(0x5fd)]){const _0x29ca29=Graphics[_0x2ff7a3(0x746)]-Graphics[_0x2ff7a3(0x2b2)]-VisuMZ['CoreEngine']['Settings']['UI'][_0x2ff7a3(0x471)]*0x2,_0x1606d7=Sprite_Button[_0x2ff7a3(0x5e2)][_0x2ff7a3(0x17d)][_0x2ff7a3(0x895)](this)*0x4;if(_0x29ca29>=_0x1606d7)SceneManager[_0x2ff7a3(0x878)](!![]);}},Scene_Title[_0x2e6bc0(0x514)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x887)]['Subtitle'],Scene_Title['version']=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x887)]['Version'],Scene_Title[_0x2e6bc0(0x161)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0xe6)],VisuMZ['CoreEngine'][_0x2e6bc0(0x44b)]=Scene_Title[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x273)],Scene_Title['prototype'][_0x2e6bc0(0x273)]=function(){const _0x1ea5ef=_0x2e6bc0;VisuMZ['CoreEngine'][_0x1ea5ef(0x6ef)][_0x1ea5ef(0x573)][_0x1ea5ef(0x887)][_0x1ea5ef(0x273)]['call'](this);if(Scene_Title[_0x1ea5ef(0x514)]!==''&&Scene_Title[_0x1ea5ef(0x514)]!==_0x1ea5ef(0x886))this[_0x1ea5ef(0x2b1)]();if(Scene_Title[_0x1ea5ef(0x6d6)]!==''&&Scene_Title[_0x1ea5ef(0x6d6)]!==_0x1ea5ef(0x2b8))this[_0x1ea5ef(0x2d6)]();},Scene_Title[_0x2e6bc0(0x5e2)]['drawGameSubtitle']=function(){const _0x4b46ef=_0x2e6bc0;VisuMZ[_0x4b46ef(0x468)][_0x4b46ef(0x6ef)][_0x4b46ef(0x573)][_0x4b46ef(0x887)]['drawGameSubtitle'][_0x4b46ef(0x895)](this);},Scene_Title[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2d6)]=function(){const _0x5a8314=_0x2e6bc0;VisuMZ[_0x5a8314(0x468)][_0x5a8314(0x6ef)][_0x5a8314(0x573)][_0x5a8314(0x887)][_0x5a8314(0x2d6)][_0x5a8314(0x895)](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x269a59=_0x2e6bc0;this['createTitleButtons']();const _0x5be268=$dataSystem['titleCommandWindow']['background'],_0x2bb009=this[_0x269a59(0x65a)]();this[_0x269a59(0x3ae)]=new Window_TitleCommand(_0x2bb009),this[_0x269a59(0x3ae)][_0x269a59(0x52a)](_0x5be268);const _0x33c3c9=this[_0x269a59(0x65a)]();this[_0x269a59(0x3ae)]['move'](_0x33c3c9['x'],_0x33c3c9['y'],_0x33c3c9[_0x269a59(0x746)],_0x33c3c9['height']),this[_0x269a59(0x3ae)]['createContents'](),this[_0x269a59(0x3ae)][_0x269a59(0x3bd)](),this[_0x269a59(0x3ae)]['selectLast'](),this[_0x269a59(0x2ec)](this[_0x269a59(0x3ae)]);},Scene_Title[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x829)]=function(){const _0xaf4127=_0x2e6bc0;return this[_0xaf4127(0x3ae)]?this['_commandWindow'][_0xaf4127(0x67e)]():VisuMZ[_0xaf4127(0x468)][_0xaf4127(0x6ef)][_0xaf4127(0x589)][_0xaf4127(0x29e)];},Scene_Title[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x65a)]=function(){const _0x2af62d=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x2af62d(0x6ef)]['MenuLayout']['Title']['CommandRect'][_0x2af62d(0x895)](this);},Scene_Title[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x41e)]=function(){const _0x22f96f=_0x2e6bc0;for(const _0x2ec17a of Scene_Title[_0x22f96f(0x161)]){const _0x155cf3=new Sprite_TitlePictureButton(_0x2ec17a);this[_0x22f96f(0x6e8)](_0x155cf3);}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x336)]=Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)],Scene_Map['prototype'][_0x2e6bc0(0x571)]=function(){const _0x402b16=_0x2e6bc0;VisuMZ[_0x402b16(0x468)][_0x402b16(0x336)][_0x402b16(0x895)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x402b16(0x446)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x763)]=Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x260)],Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x260)]=function(){const _0x22d8f3=_0x2e6bc0;VisuMZ['CoreEngine'][_0x22d8f3(0x763)][_0x22d8f3(0x895)](this),$gameTemp[_0x22d8f3(0x517)]&&!$gameMessage['isBusy']()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map[_0x2e6bc0(0x5e2)]['terminate']=function(){const _0x52d51c=_0x2e6bc0;Scene_Message[_0x52d51c(0x5e2)]['terminate'][_0x52d51c(0x895)](this),!SceneManager[_0x52d51c(0x247)](Scene_Battle)&&(this[_0x52d51c(0x722)][_0x52d51c(0x645)](),this['_mapNameWindow']['hide'](),this[_0x52d51c(0x4f0)][_0x52d51c(0x510)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x52d51c(0xf2)](),this[_0x52d51c(0x446)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x361)]=Scene_Map[_0x2e6bc0(0x5e2)]['createMenuButton'],Scene_Map['prototype'][_0x2e6bc0(0x33b)]=function(){const _0x1ffa7=_0x2e6bc0;VisuMZ[_0x1ffa7(0x468)][_0x1ffa7(0x361)]['call'](this),SceneManager[_0x1ffa7(0xe7)]()&&this[_0x1ffa7(0x890)]();},Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x890)]=function(){const _0x24afb6=_0x2e6bc0;this[_0x24afb6(0x86b)]['x']=Graphics[_0x24afb6(0x2b2)]+0x4;},VisuMZ['CoreEngine'][_0x2e6bc0(0x4fe)]=Scene_Map[_0x2e6bc0(0x5e2)]['updateScene'],Scene_Map[_0x2e6bc0(0x5e2)]['updateScene']=function(){const _0x30137b=_0x2e6bc0;VisuMZ[_0x30137b(0x468)][_0x30137b(0x4fe)][_0x30137b(0x895)](this),this[_0x30137b(0x611)]();},Scene_Map[_0x2e6bc0(0x5e2)]['updateDashToggle']=function(){const _0x4d775d=_0x2e6bc0;Input[_0x4d775d(0x443)](_0x4d775d(0x712))&&(ConfigManager[_0x4d775d(0x83c)]=!ConfigManager[_0x4d775d(0x83c)],ConfigManager[_0x4d775d(0x653)]());},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x437)]=Scene_Map['prototype'][_0x2e6bc0(0x561)],Scene_Map[_0x2e6bc0(0x5e2)]['updateMain']=function(){const _0x2c7cc7=_0x2e6bc0;VisuMZ['CoreEngine']['Scene_Map_updateMain'][_0x2c7cc7(0x895)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x446)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x578)]=function(){const _0x4694c2=_0x2e6bc0;if(!this[_0x4694c2(0x119)])return;for(const _0x39bd04 of this[_0x4694c2(0x119)]){_0x39bd04&&_0x39bd04['update']();}},Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x54b)]=function(_0x3f6158,_0x37793d){const _0xc20b2e=_0x2e6bc0,_0x1c2309=$dataCommonEvents[_0x3f6158];if(!_0x1c2309)return;const _0x737ebf=new Game_OnceParallelInterpreter();this[_0xc20b2e(0x7ea)](_0x737ebf),_0x737ebf[_0xc20b2e(0x214)](_0x3f6158),_0x737ebf[_0xc20b2e(0x295)](_0x37793d);},Scene_Map['prototype'][_0x2e6bc0(0x7ea)]=function(_0x151bb7){const _0xd6a980=_0x2e6bc0;this['_onceParallelInterpreters']=this[_0xd6a980(0x119)]||[],this[_0xd6a980(0x119)][_0xd6a980(0x16c)](_0x151bb7);},Scene_Map['prototype']['removeOnceParallelInterpreter']=function(_0x397ab2){const _0x13e724=_0x2e6bc0;this[_0x13e724(0x119)]=this[_0x13e724(0x119)]||[],this[_0x13e724(0x119)][_0x13e724(0x581)](_0x397ab2);};function Game_OnceParallelInterpreter(){const _0x3bce27=_0x2e6bc0;this[_0x3bce27(0x571)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c3)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x214)]=function(_0x416f4d){const _0x2142da=_0x2e6bc0,_0x313c0f=$dataCommonEvents[_0x416f4d];_0x313c0f?this['setup'](_0x313c0f[_0x2142da(0x775)],0x0):this[_0x2142da(0x56c)]();},Game_OnceParallelInterpreter['prototype'][_0x2e6bc0(0x295)]=function(_0x2cee3a){const _0x2aa398=_0x2e6bc0;this[_0x2aa398(0x1fe)]=_0x2cee3a||0x0;},Game_OnceParallelInterpreter['prototype'][_0x2e6bc0(0x56c)]=function(){const _0x313826=_0x2e6bc0;if(!SceneManager['isSceneMap']())return;SceneManager[_0x313826(0x49a)][_0x313826(0x29c)](this),Game_Interpreter['prototype'][_0x313826(0x56c)]['call'](this);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x41a)]=Scene_MenuBase['prototype'][_0x2e6bc0(0x747)],Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x747)]=function(){const _0x5f09be=_0x2e6bc0;let _0x40c11d=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x40c11d=this[_0x5f09be(0x221)]():_0x40c11d=VisuMZ[_0x5f09be(0x468)]['Scene_MenuBase_helpAreaTop'][_0x5f09be(0x895)](this),_0x40c11d;},Scene_MenuBase[_0x2e6bc0(0x5e2)]['helpAreaTopSideButtonLayout']=function(){const _0x44f4a6=_0x2e6bc0;return this[_0x44f4a6(0x193)]()?this[_0x44f4a6(0x138)]():0x0;},VisuMZ['CoreEngine'][_0x2e6bc0(0x5df)]=Scene_MenuBase['prototype']['mainAreaTop'],Scene_MenuBase['prototype'][_0x2e6bc0(0x555)]=function(){const _0x45d540=_0x2e6bc0;return SceneManager[_0x45d540(0x3d4)]()?this[_0x45d540(0x75b)]():VisuMZ[_0x45d540(0x468)]['Scene_MenuBase_mainAreaTop'][_0x45d540(0x895)](this);},Scene_MenuBase['prototype'][_0x2e6bc0(0x75b)]=function(){const _0x37fdaa=_0x2e6bc0;if(!this['isBottomHelpMode']())return this[_0x37fdaa(0x4ed)]();else return this[_0x37fdaa(0x206)]()&&this[_0x37fdaa(0x28f)]()==='top'?Window_ButtonAssist[_0x37fdaa(0x5e2)][_0x37fdaa(0x1ec)]():0x0;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x5ee)]=Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c5)],Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c5)]=function(){const _0x53de5b=_0x2e6bc0;let _0x113244=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x113244=this['mainAreaHeightSideButtonLayout']():_0x113244=VisuMZ['CoreEngine'][_0x53de5b(0x5ee)]['call'](this),this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!=='button'&&(_0x113244-=Window_ButtonAssist[_0x53de5b(0x5e2)][_0x53de5b(0x1ec)]()),_0x113244;},Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x87e)]=function(){const _0x599596=_0x2e6bc0;return Graphics[_0x599596(0x849)]-this['helpAreaHeight']();},VisuMZ[_0x2e6bc0(0x468)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype'][_0x2e6bc0(0x1bc)],Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1bc)]=function(){const _0x81e37=_0x2e6bc0,_0x2905bb=VisuMZ[_0x81e37(0x468)]['Settings'][_0x81e37(0x588)]['BlurStrength']??0x8;this['_backgroundFilter']=new PIXI['filters'][(_0x81e37(0x774))](_0x2905bb),this['_backgroundSprite']=new Sprite(),this[_0x81e37(0x8bc)][_0x81e37(0x253)]=SceneManager[_0x81e37(0x38e)](),this[_0x81e37(0x8bc)][_0x81e37(0x285)]=[this[_0x81e37(0x7b1)]],this[_0x81e37(0x6e8)](this['_backgroundSprite']),this[_0x81e37(0x25a)](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype']['getBackgroundOpacity']=function(){const _0xafe834=_0x2e6bc0,_0x28596c=String(this[_0xafe834(0x2c3)][_0xafe834(0x3d0)]),_0x2c765c=this[_0xafe834(0x391)](_0x28596c);return _0x2c765c?_0x2c765c['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x2e6bc0(0x7b7)]=function(){const _0x35d917=_0x2e6bc0,_0x28a7bd=String(this[_0x35d917(0x2c3)][_0x35d917(0x3d0)]),_0x545c75=this[_0x35d917(0x391)](_0x28a7bd);_0x545c75&&(_0x545c75[_0x35d917(0x398)]!==''||_0x545c75['BgFilename2']!=='')&&(this[_0x35d917(0x6bc)]=new Sprite(ImageManager[_0x35d917(0x1b8)](_0x545c75[_0x35d917(0x398)])),this[_0x35d917(0x2d1)]=new Sprite(ImageManager['loadTitle2'](_0x545c75[_0x35d917(0x6ac)])),this[_0x35d917(0x6e8)](this['_backSprite1']),this['addChild'](this[_0x35d917(0x2d1)]),this[_0x35d917(0x6bc)]['bitmap'][_0x35d917(0x34a)](this[_0x35d917(0x3f3)][_0x35d917(0x6e7)](this,this['_backSprite1'])),this[_0x35d917(0x2d1)][_0x35d917(0x253)][_0x35d917(0x34a)](this[_0x35d917(0x3f3)][_0x35d917(0x6e7)](this,this[_0x35d917(0x2d1)])));},Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x391)]=function(_0x3a1df3){const _0x197a9b=_0x2e6bc0;return VisuMZ[_0x197a9b(0x468)][_0x197a9b(0x6ef)][_0x197a9b(0x588)][_0x3a1df3]||VisuMZ[_0x197a9b(0x468)][_0x197a9b(0x6ef)]['MenuBg']['Scene_Unlisted'];},Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3f3)]=function(_0x5e1f67){const _0x5b3979=_0x2e6bc0;this[_0x5b3979(0x4d9)](_0x5e1f67),this[_0x5b3979(0x108)](_0x5e1f67);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x66a)]=Scene_MenuBase['prototype'][_0x2e6bc0(0x803)],Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x803)]=function(){const _0x4aa327=_0x2e6bc0;VisuMZ[_0x4aa327(0x468)][_0x4aa327(0x66a)][_0x4aa327(0x895)](this),SceneManager[_0x4aa327(0xe7)]()&&this[_0x4aa327(0x284)]();},Scene_MenuBase['prototype'][_0x2e6bc0(0x284)]=function(){const _0x4357fd=_0x2e6bc0;this[_0x4357fd(0x29b)]['x']=Graphics[_0x4357fd(0x2b2)]+0x4;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x109)]=Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6a6)],Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6a6)]=function(){const _0x4cea3c=_0x2e6bc0;VisuMZ[_0x4cea3c(0x468)][_0x4cea3c(0x109)][_0x4cea3c(0x895)](this),SceneManager[_0x4cea3c(0xe7)]()&&this[_0x4cea3c(0x32a)]();},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0x33800c=_0x2e6bc0;this[_0x33800c(0x768)]['x']=-0x1*(this[_0x33800c(0x768)][_0x33800c(0x746)]+this[_0x33800c(0x291)][_0x33800c(0x746)]+0x8),this[_0x33800c(0x291)]['x']=-0x1*(this[_0x33800c(0x291)][_0x33800c(0x746)]+0x4);},Scene_MenuBase[_0x2e6bc0(0x5e2)]['isMenuButtonAssistEnabled']=function(){const _0x397484=_0x2e6bc0;return VisuMZ[_0x397484(0x468)][_0x397484(0x6ef)][_0x397484(0x51a)][_0x397484(0x7e5)];},Scene_MenuBase['prototype'][_0x2e6bc0(0x28f)]=function(){const _0x22006d=_0x2e6bc0;return SceneManager[_0x22006d(0xe7)]()||SceneManager['areButtonsHidden']()?VisuMZ['CoreEngine'][_0x22006d(0x6ef)][_0x22006d(0x51a)][_0x22006d(0x792)]:'button';},Scene_MenuBase[_0x2e6bc0(0x5e2)]['createButtonAssistWindow']=function(){const _0x25a6eb=_0x2e6bc0;if(!this['isMenuButtonAssistEnabled']())return;const _0x41ec7a=this[_0x25a6eb(0x171)]();this[_0x25a6eb(0x343)]=new Window_ButtonAssist(_0x41ec7a),this[_0x25a6eb(0x2ec)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x171)]=function(){const _0x2f7f55=_0x2e6bc0;return this[_0x2f7f55(0x28f)]()==='button'?this[_0x2f7f55(0x2af)]():this[_0x2f7f55(0x396)]();},Scene_MenuBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2af)]=function(){const _0x22af8b=_0x2e6bc0,_0x3df8d9=ConfigManager[_0x22af8b(0x800)]?(Sprite_Button[_0x22af8b(0x5e2)][_0x22af8b(0x17d)]()+0x6)*0x2:0x0,_0x12000e=this[_0x22af8b(0x501)](),_0x335c63=Graphics[_0x22af8b(0x2b2)]-_0x3df8d9*0x2,_0x56e3aa=this[_0x22af8b(0x7d6)]();return new Rectangle(_0x3df8d9,_0x12000e,_0x335c63,_0x56e3aa);},Scene_MenuBase[_0x2e6bc0(0x5e2)]['buttonAssistWindowSideRect']=function(){const _0x55c9d3=_0x2e6bc0,_0x1752ef=Graphics[_0x55c9d3(0x2b2)],_0x949eea=Window_ButtonAssist[_0x55c9d3(0x5e2)][_0x55c9d3(0x1ec)](),_0x31c262=0x0;let _0x1b89c0=0x0;return this[_0x55c9d3(0x28f)]()==='top'?_0x1b89c0=0x0:_0x1b89c0=Graphics['boxHeight']-_0x949eea,new Rectangle(_0x31c262,_0x1b89c0,_0x1752ef,_0x949eea);},Scene_Menu[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)]['Settings'][_0x2e6bc0(0x573)]['MainMenu'],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4b6)]=Scene_Menu['prototype'][_0x2e6bc0(0x893)],Scene_Menu['prototype'][_0x2e6bc0(0x893)]=function(){const _0x520ead=_0x2e6bc0;VisuMZ[_0x520ead(0x468)][_0x520ead(0x4b6)]['call'](this),this[_0x520ead(0x5a9)]();},Scene_Menu[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0x27f776=_0x2e6bc0;this[_0x27f776(0x3ae)]&&this[_0x27f776(0x3ae)][_0x27f776(0x52a)](Scene_Menu[_0x27f776(0x71a)][_0x27f776(0x67f)]),this['_goldWindow']&&this[_0x27f776(0x393)][_0x27f776(0x52a)](Scene_Menu[_0x27f776(0x71a)][_0x27f776(0x76d)]),this[_0x27f776(0x663)]&&this[_0x27f776(0x663)][_0x27f776(0x52a)](Scene_Menu[_0x27f776(0x71a)][_0x27f776(0x6c7)]);},Scene_Menu[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x65a)]=function(){const _0x2f89b5=_0x2e6bc0;return Scene_Menu[_0x2f89b5(0x71a)][_0x2f89b5(0x6f8)]['call'](this);},Scene_Menu[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x16d)]=function(){const _0x3f81d1=_0x2e6bc0;return Scene_Menu[_0x3f81d1(0x71a)]['GoldRect'][_0x3f81d1(0x895)](this);},Scene_Menu['prototype'][_0x2e6bc0(0x2b9)]=function(){const _0x5660c1=_0x2e6bc0;return Scene_Menu[_0x5660c1(0x71a)][_0x5660c1(0x1e6)][_0x5660c1(0x895)](this);},Scene_Item[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x632)],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x350)]=Scene_Item[_0x2e6bc0(0x5e2)]['create'],Scene_Item['prototype'][_0x2e6bc0(0x893)]=function(){const _0x3df85d=_0x2e6bc0;VisuMZ[_0x3df85d(0x468)]['Scene_Item_create']['call'](this),this[_0x3df85d(0x5a9)]();},Scene_Item[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0xbd6827=_0x2e6bc0;this[_0xbd6827(0x702)]&&this['_helpWindow'][_0xbd6827(0x52a)](Scene_Item[_0xbd6827(0x71a)][_0xbd6827(0x7fa)]),this[_0xbd6827(0x841)]&&this[_0xbd6827(0x841)]['setBackgroundType'](Scene_Item[_0xbd6827(0x71a)][_0xbd6827(0x4a9)]),this[_0xbd6827(0x491)]&&this[_0xbd6827(0x491)][_0xbd6827(0x52a)](Scene_Item[_0xbd6827(0x71a)]['ItemBgType']),this[_0xbd6827(0x102)]&&this['_actorWindow'][_0xbd6827(0x52a)](Scene_Item['layoutSettings'][_0xbd6827(0x4b7)]);},Scene_Item['prototype'][_0x2e6bc0(0x63b)]=function(){return Scene_Item['layoutSettings']['HelpRect']['call'](this);},Scene_Item[_0x2e6bc0(0x5e2)]['categoryWindowRect']=function(){const _0x35bcc6=_0x2e6bc0;return Scene_Item[_0x35bcc6(0x71a)][_0x35bcc6(0x36c)][_0x35bcc6(0x895)](this);},Scene_Item[_0x2e6bc0(0x5e2)]['itemWindowRect']=function(){const _0x28fcc2=_0x2e6bc0;return Scene_Item[_0x28fcc2(0x71a)][_0x28fcc2(0x434)][_0x28fcc2(0x895)](this);},Scene_Item[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1fc)]=function(){const _0x5a433c=_0x2e6bc0;return Scene_Item['layoutSettings']['ActorRect'][_0x5a433c(0x895)](this);},Scene_Skill[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)]['Settings'][_0x2e6bc0(0x573)][_0x2e6bc0(0x4ee)],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x843)]=Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Skill[_0x2e6bc0(0x5e2)]['create']=function(){const _0x486951=_0x2e6bc0;VisuMZ['CoreEngine'][_0x486951(0x843)][_0x486951(0x895)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill['prototype'][_0x2e6bc0(0x5a9)]=function(){const _0x38f388=_0x2e6bc0;this[_0x38f388(0x702)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x38f388(0x71a)]['HelpBgType']),this[_0x38f388(0x66b)]&&this['_skillTypeWindow'][_0x38f388(0x52a)](Scene_Skill['layoutSettings'][_0x38f388(0x113)]),this[_0x38f388(0x663)]&&this['_statusWindow'][_0x38f388(0x52a)](Scene_Skill[_0x38f388(0x71a)]['StatusBgType']),this[_0x38f388(0x491)]&&this[_0x38f388(0x491)]['setBackgroundType'](Scene_Skill[_0x38f388(0x71a)]['ItemBgType']),this[_0x38f388(0x102)]&&this[_0x38f388(0x102)][_0x38f388(0x52a)](Scene_Skill[_0x38f388(0x71a)][_0x38f388(0x4b7)]);},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x63b)]=function(){const _0x48f6ab=_0x2e6bc0;return Scene_Skill['layoutSettings'][_0x48f6ab(0x5d8)][_0x48f6ab(0x895)](this);},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x425)]=function(){const _0xce471e=_0x2e6bc0;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0xce471e(0x895)](this);},Scene_Skill['prototype']['statusWindowRect']=function(){const _0x47d269=_0x2e6bc0;return Scene_Skill['layoutSettings'][_0x47d269(0x1e6)][_0x47d269(0x895)](this);},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x45b)]=function(){const _0x1c2aa1=_0x2e6bc0;return Scene_Skill['layoutSettings'][_0x1c2aa1(0x434)][_0x1c2aa1(0x895)](this);},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1fc)]=function(){const _0x47f0e7=_0x2e6bc0;return Scene_Skill['layoutSettings'][_0x47f0e7(0x30c)][_0x47f0e7(0x895)](this);},Scene_Equip[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)]['Settings'][_0x2e6bc0(0x573)][_0x2e6bc0(0x24e)],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x68b)]=Scene_Equip[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Equip[_0x2e6bc0(0x5e2)]['create']=function(){const _0x5e1896=_0x2e6bc0;VisuMZ[_0x5e1896(0x468)][_0x5e1896(0x68b)][_0x5e1896(0x895)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0x1a5e3b=_0x2e6bc0;this[_0x1a5e3b(0x702)]&&this[_0x1a5e3b(0x702)]['setBackgroundType'](Scene_Equip[_0x1a5e3b(0x71a)]['HelpBgType']),this[_0x1a5e3b(0x663)]&&this[_0x1a5e3b(0x663)][_0x1a5e3b(0x52a)](Scene_Equip['layoutSettings']['StatusBgType']),this[_0x1a5e3b(0x3ae)]&&this[_0x1a5e3b(0x3ae)][_0x1a5e3b(0x52a)](Scene_Equip[_0x1a5e3b(0x71a)][_0x1a5e3b(0x67f)]),this[_0x1a5e3b(0xee)]&&this[_0x1a5e3b(0xee)][_0x1a5e3b(0x52a)](Scene_Equip[_0x1a5e3b(0x71a)]['SlotBgType']),this['_itemWindow']&&this[_0x1a5e3b(0x491)]['setBackgroundType'](Scene_Equip[_0x1a5e3b(0x71a)]['ItemBgType']);},Scene_Equip[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x63b)]=function(){const _0x482efc=_0x2e6bc0;return Scene_Equip['layoutSettings'][_0x482efc(0x5d8)][_0x482efc(0x895)](this);},Scene_Equip['prototype'][_0x2e6bc0(0x2b9)]=function(){const _0x2b0715=_0x2e6bc0;return Scene_Equip[_0x2b0715(0x71a)]['StatusRect'][_0x2b0715(0x895)](this);},Scene_Equip['prototype']['commandWindowRect']=function(){const _0x5e2941=_0x2e6bc0;return Scene_Equip[_0x5e2941(0x71a)][_0x5e2941(0x6f8)][_0x5e2941(0x895)](this);},Scene_Equip[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x11e)]=function(){const _0x1e56f8=_0x2e6bc0;return Scene_Equip[_0x1e56f8(0x71a)][_0x1e56f8(0x376)][_0x1e56f8(0x895)](this);},Scene_Equip[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x45b)]=function(){const _0x581045=_0x2e6bc0;return Scene_Equip['layoutSettings']['ItemRect'][_0x581045(0x895)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)]['MenuLayout'][_0x2e6bc0(0x355)],VisuMZ[_0x2e6bc0(0x468)]['Scene_Status_create']=Scene_Status[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Status['prototype']['create']=function(){const _0x553e8c=_0x2e6bc0;VisuMZ[_0x553e8c(0x468)]['Scene_Status_create'][_0x553e8c(0x895)](this),this[_0x553e8c(0x5a9)]();},Scene_Status[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0x244159=_0x2e6bc0;this[_0x244159(0x3f7)]&&this[_0x244159(0x3f7)]['setBackgroundType'](Scene_Status[_0x244159(0x71a)][_0x244159(0x464)]),this[_0x244159(0x663)]&&this[_0x244159(0x663)][_0x244159(0x52a)](Scene_Status[_0x244159(0x71a)]['StatusBgType']),this['_statusParamsWindow']&&this[_0x244159(0x884)][_0x244159(0x52a)](Scene_Status[_0x244159(0x71a)][_0x244159(0x610)]),this[_0x244159(0x473)]&&this['_statusEquipWindow']['setBackgroundType'](Scene_Status['layoutSettings']['StatusEquipBgType']);},Scene_Status[_0x2e6bc0(0x5e2)]['profileWindowRect']=function(){const _0x5afa89=_0x2e6bc0;return Scene_Status[_0x5afa89(0x71a)]['ProfileRect'][_0x5afa89(0x895)](this);},Scene_Status[_0x2e6bc0(0x5e2)]['statusWindowRect']=function(){const _0x37a61d=_0x2e6bc0;return Scene_Status[_0x37a61d(0x71a)][_0x37a61d(0x1e6)]['call'](this);},Scene_Status['prototype'][_0x2e6bc0(0x78d)]=function(){const _0x185b6a=_0x2e6bc0;return Scene_Status[_0x185b6a(0x71a)][_0x185b6a(0x268)]['call'](this);},Scene_Status[_0x2e6bc0(0x5e2)]['statusEquipWindowRect']=function(){const _0x47d8cc=_0x2e6bc0;return Scene_Status[_0x47d8cc(0x71a)][_0x47d8cc(0x258)][_0x47d8cc(0x895)](this);},Scene_Options[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x180)],VisuMZ[_0x2e6bc0(0x468)]['Scene_Options_create']=Scene_Options[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Options[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)]=function(){const _0x4fc945=_0x2e6bc0;VisuMZ[_0x4fc945(0x468)][_0x4fc945(0x5e7)][_0x4fc945(0x895)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype'][_0x2e6bc0(0x5a9)]=function(){const _0x356a44=_0x2e6bc0;this[_0x356a44(0x481)]&&this[_0x356a44(0x481)][_0x356a44(0x52a)](Scene_Options['layoutSettings'][_0x356a44(0x883)]);},Scene_Options['prototype'][_0x2e6bc0(0x7c1)]=function(){const _0x4b4b0a=_0x2e6bc0;return Scene_Options[_0x4b4b0a(0x71a)][_0x4b4b0a(0x7e9)][_0x4b4b0a(0x895)](this);},Scene_Save['layoutSettings']=VisuMZ['CoreEngine'][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x1c5)],Scene_Save['prototype'][_0x2e6bc0(0x893)]=function(){const _0x474069=_0x2e6bc0;Scene_File[_0x474069(0x5e2)]['create'][_0x474069(0x895)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0x3f52c1=_0x2e6bc0;this[_0x3f52c1(0x702)]&&this['_helpWindow'][_0x3f52c1(0x52a)](Scene_Save['layoutSettings']['HelpBgType']),this['_listWindow']&&this[_0x3f52c1(0x1be)][_0x3f52c1(0x52a)](Scene_Save[_0x3f52c1(0x71a)][_0x3f52c1(0x69e)]);},Scene_Save[_0x2e6bc0(0x5e2)]['helpWindowRect']=function(){const _0x5abeb6=_0x2e6bc0;return Scene_Save[_0x5abeb6(0x71a)]['HelpRect'][_0x5abeb6(0x895)](this);},Scene_Save[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x40c)]=function(){const _0x5c6964=_0x2e6bc0;return Scene_Save[_0x5c6964(0x71a)][_0x5c6964(0x767)][_0x5c6964(0x895)](this);},Scene_Load[_0x2e6bc0(0x71a)]=VisuMZ['CoreEngine'][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x162)],Scene_Load[_0x2e6bc0(0x5e2)]['create']=function(){const _0x61cfe6=_0x2e6bc0;Scene_File[_0x61cfe6(0x5e2)]['create'][_0x61cfe6(0x895)](this),this[_0x61cfe6(0x5a9)]();},Scene_Load[_0x2e6bc0(0x5e2)]['setCoreEngineUpdateWindowBg']=function(){const _0x204e95=_0x2e6bc0;this[_0x204e95(0x702)]&&this[_0x204e95(0x702)][_0x204e95(0x52a)](Scene_Load['layoutSettings']['HelpBgType']),this[_0x204e95(0x1be)]&&this[_0x204e95(0x1be)][_0x204e95(0x52a)](Scene_Load[_0x204e95(0x71a)][_0x204e95(0x69e)]);},Scene_Load['prototype'][_0x2e6bc0(0x63b)]=function(){const _0x227ef5=_0x2e6bc0;return Scene_Load[_0x227ef5(0x71a)][_0x227ef5(0x5d8)][_0x227ef5(0x895)](this);},Scene_Load[_0x2e6bc0(0x5e2)]['listWindowRect']=function(){const _0x202b73=_0x2e6bc0;return Scene_Load[_0x202b73(0x71a)][_0x202b73(0x767)]['call'](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x2e6bc0(0x5e2)]=Object[_0x2e6bc0(0x893)](Scene_Load['prototype']),Scene_QuickLoad[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c3)]=Scene_QuickLoad,Scene_QuickLoad[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(){const _0x201a97=_0x2e6bc0;Scene_Load['prototype'][_0x201a97(0x571)][_0x201a97(0x895)](this);},Scene_QuickLoad[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)]=function(){const _0x4367e1=_0x2e6bc0;this[_0x4367e1(0x372)](this['_saveFileID']);},Scene_QuickLoad[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5e1)]=function(_0xd00f6f){const _0x4ab650=_0x2e6bc0;this[_0x4ab650(0xf7)]=_0xd00f6f;},Scene_QuickLoad[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x427)]=function(){const _0x80ba33=_0x2e6bc0;Scene_MenuBase[_0x80ba33(0x5e2)][_0x80ba33(0x427)][_0x80ba33(0x895)](this);},Scene_GameEnd[_0x2e6bc0(0x71a)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x4bb)],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x235)]=Scene_GameEnd[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1bc)],Scene_GameEnd[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1bc)]=function(){const _0x5f05a0=_0x2e6bc0;Scene_MenuBase['prototype']['createBackground'][_0x5f05a0(0x895)](this);},Scene_GameEnd[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x11c)]=function(){const _0x13a888=_0x2e6bc0,_0x537c16=this[_0x13a888(0x65a)]();this[_0x13a888(0x3ae)]=new Window_GameEnd(_0x537c16),this[_0x13a888(0x3ae)][_0x13a888(0x658)](_0x13a888(0x709),this[_0x13a888(0x73d)][_0x13a888(0x6e7)](this)),this[_0x13a888(0x2ec)](this[_0x13a888(0x3ae)]),this[_0x13a888(0x3ae)]['setBackgroundType'](Scene_GameEnd[_0x13a888(0x71a)][_0x13a888(0x67f)]);},Scene_GameEnd['prototype'][_0x2e6bc0(0x65a)]=function(){const _0x23a5a0=_0x2e6bc0;return Scene_GameEnd[_0x23a5a0(0x71a)][_0x23a5a0(0x6f8)][_0x23a5a0(0x895)](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x697)],VisuMZ['CoreEngine'][_0x2e6bc0(0x3a0)]=Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)]=function(){const _0x41f64f=_0x2e6bc0;VisuMZ[_0x41f64f(0x468)][_0x41f64f(0x3a0)][_0x41f64f(0x895)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5a9)]=function(){const _0x49d95e=_0x2e6bc0;this[_0x49d95e(0x702)]&&this[_0x49d95e(0x702)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)]['HelpBgType']),this['_goldWindow']&&this[_0x49d95e(0x393)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)][_0x49d95e(0x76d)]),this[_0x49d95e(0x3ae)]&&this[_0x49d95e(0x3ae)]['setBackgroundType'](Scene_Shop[_0x49d95e(0x71a)][_0x49d95e(0x67f)]),this[_0x49d95e(0x358)]&&this[_0x49d95e(0x358)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)][_0x49d95e(0x3f4)]),this[_0x49d95e(0x674)]&&this[_0x49d95e(0x674)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)]['NumberBgType']),this[_0x49d95e(0x663)]&&this[_0x49d95e(0x663)][_0x49d95e(0x52a)](Scene_Shop['layoutSettings']['StatusBgType']),this[_0x49d95e(0x124)]&&this[_0x49d95e(0x124)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)][_0x49d95e(0x58c)]),this['_categoryWindow']&&this[_0x49d95e(0x841)]['setBackgroundType'](Scene_Shop[_0x49d95e(0x71a)]['CategoryBgType']),this[_0x49d95e(0x8bb)]&&this[_0x49d95e(0x8bb)][_0x49d95e(0x52a)](Scene_Shop[_0x49d95e(0x71a)][_0x49d95e(0x8ab)]);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x63b)]=function(){const _0x3dfae1=_0x2e6bc0;return Scene_Shop['layoutSettings'][_0x3dfae1(0x5d8)][_0x3dfae1(0x895)](this);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x16d)]=function(){const _0x210e07=_0x2e6bc0;return Scene_Shop[_0x210e07(0x71a)][_0x210e07(0x518)][_0x210e07(0x895)](this);},Scene_Shop['prototype']['commandWindowRect']=function(){const _0x1882e4=_0x2e6bc0;return Scene_Shop['layoutSettings'][_0x1882e4(0x6f8)][_0x1882e4(0x895)](this);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x255)]=function(){const _0x15afaa=_0x2e6bc0;return Scene_Shop[_0x15afaa(0x71a)][_0x15afaa(0x77a)]['call'](this);},Scene_Shop['prototype'][_0x2e6bc0(0x556)]=function(){const _0x33c259=_0x2e6bc0;return Scene_Shop[_0x33c259(0x71a)]['NumberRect'][_0x33c259(0x895)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x32f730=_0x2e6bc0;return Scene_Shop[_0x32f730(0x71a)][_0x32f730(0x1e6)][_0x32f730(0x895)](this);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x287)]=function(){const _0x4c5fd2=_0x2e6bc0;return Scene_Shop[_0x4c5fd2(0x71a)][_0x4c5fd2(0x110)][_0x4c5fd2(0x895)](this);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x385)]=function(){const _0x2066dc=_0x2e6bc0;return Scene_Shop[_0x2066dc(0x71a)][_0x2066dc(0x36c)][_0x2066dc(0x895)](this);},Scene_Shop[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5bc)]=function(){const _0x1b5ac0=_0x2e6bc0;return Scene_Shop['layoutSettings'][_0x1b5ac0(0x540)][_0x1b5ac0(0x895)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x573)][_0x2e6bc0(0x457)],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x733)]=Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x893)],Scene_Name['prototype'][_0x2e6bc0(0x893)]=function(){const _0x5afce8=_0x2e6bc0;VisuMZ[_0x5afce8(0x468)]['Scene_Name_create'][_0x5afce8(0x895)](this),this[_0x5afce8(0x5a9)]();},Scene_Name[_0x2e6bc0(0x5e2)]['setCoreEngineUpdateWindowBg']=function(){const _0x58e8e6=_0x2e6bc0;this['_editWindow']&&this[_0x58e8e6(0x2ce)][_0x58e8e6(0x52a)](Scene_Name['layoutSettings'][_0x58e8e6(0x531)]),this[_0x58e8e6(0x6c1)]&&this[_0x58e8e6(0x6c1)][_0x58e8e6(0x52a)](Scene_Name[_0x58e8e6(0x71a)]['InputBgType']);},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x381)]=function(){return 0x0;},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x745)]=function(){const _0x39df6a=_0x2e6bc0;return Scene_Name[_0x39df6a(0x71a)][_0x39df6a(0x4c8)][_0x39df6a(0x895)](this);},Scene_Name['prototype'][_0x2e6bc0(0x765)]=function(){const _0x542586=_0x2e6bc0;return Scene_Name[_0x542586(0x71a)][_0x542586(0x17f)][_0x542586(0x895)](this);},Scene_Name['prototype'][_0x2e6bc0(0x458)]=function(){const _0x13a719=_0x2e6bc0;if(!this[_0x13a719(0x6c1)])return![];return VisuMZ['CoreEngine']['Settings'][_0x13a719(0x5c6)][_0x13a719(0x458)];},Scene_Name[_0x2e6bc0(0x5e2)]['buttonAssistKey1']=function(){const _0x33980d=_0x2e6bc0;if(this[_0x33980d(0x458)]()&&this[_0x33980d(0x6c1)][_0x33980d(0x5ca)]!=='keyboard')return TextManager[_0x33980d(0x705)]('pageup',_0x33980d(0x53a));return Scene_MenuBase['prototype'][_0x33980d(0x6d3)][_0x33980d(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x461)]=function(){const _0x4cebbc=_0x2e6bc0;return this['EnableNameInput']()?TextManager[_0x4cebbc(0x76a)](_0x4cebbc(0x453)):Scene_MenuBase[_0x4cebbc(0x5e2)][_0x4cebbc(0x461)][_0x4cebbc(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)]['buttonAssistKey4']=function(){const _0x1e7742=_0x2e6bc0;if(this[_0x1e7742(0x458)]()&&this[_0x1e7742(0x6c1)][_0x1e7742(0x5ca)]===_0x1e7742(0x7c2))return TextManager[_0x1e7742(0x25b)]([_0x1e7742(0x4e1)]);return Scene_MenuBase['prototype']['buttonAssistKey4'][_0x1e7742(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x692)]=function(){const _0x2e00f7=_0x2e6bc0;if(this[_0x2e00f7(0x458)]()&&this[_0x2e00f7(0x6c1)][_0x2e00f7(0x5ca)]==='keyboard')return TextManager[_0x2e00f7(0x25b)]([_0x2e00f7(0x3f2)]);return Scene_MenuBase[_0x2e00f7(0x5e2)][_0x2e00f7(0x692)][_0x2e00f7(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6f5)]=function(){const _0x541996=_0x2e6bc0;if(this[_0x541996(0x458)]()&&this[_0x541996(0x6c1)][_0x541996(0x5ca)]!==_0x541996(0x7c2)){const _0x1d964d=VisuMZ['CoreEngine']['Settings'][_0x541996(0x5c6)];return _0x1d964d[_0x541996(0x2c6)]||_0x541996(0x70d);}return Scene_MenuBase[_0x541996(0x5e2)][_0x541996(0x6f5)][_0x541996(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)]['buttonAssistText3']=function(){const _0x140c8a=_0x2e6bc0;if(this[_0x140c8a(0x458)]()){const _0x3f5b87=VisuMZ[_0x140c8a(0x468)]['Settings']['KeyboardInput'];return this[_0x140c8a(0x6c1)][_0x140c8a(0x5ca)]===_0x140c8a(0x7c2)?_0x3f5b87[_0x140c8a(0x8b8)]||'Keyboard':_0x3f5b87['Manual']||_0x140c8a(0x635);}else return Scene_MenuBase[_0x140c8a(0x5e2)][_0x140c8a(0x8a8)][_0x140c8a(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x121)]=function(){const _0x231b8c=_0x2e6bc0;if(this['EnableNameInput']()){const _0x1b201e=VisuMZ[_0x231b8c(0x468)][_0x231b8c(0x6ef)]['KeyboardInput'];if(this[_0x231b8c(0x6c1)][_0x231b8c(0x5ca)]===_0x231b8c(0x7c2))return _0x1b201e[_0x231b8c(0x75e)]||_0x231b8c(0x75e);}return Scene_MenuBase[_0x231b8c(0x5e2)][_0x231b8c(0x121)][_0x231b8c(0x895)](this);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4db)]=Scene_Name['prototype'][_0x2e6bc0(0x609)],Scene_Name[_0x2e6bc0(0x5e2)]['onInputOk']=function(){const _0x411ef3=_0x2e6bc0;this[_0x411ef3(0x129)]()?this['onInputBannedWords']():VisuMZ['CoreEngine'][_0x411ef3(0x4db)][_0x411ef3(0x895)](this);},Scene_Name[_0x2e6bc0(0x5e2)]['doesNameContainBannedWords']=function(){const _0x275818=_0x2e6bc0,_0x2a7455=VisuMZ[_0x275818(0x468)][_0x275818(0x6ef)][_0x275818(0x5c6)];if(!_0x2a7455)return![];const _0x241116=_0x2a7455[_0x275818(0x22b)];if(!_0x241116)return![];const _0xd9e6b4=this['_editWindow'][_0x275818(0x3d0)]()['toLowerCase']();for(const _0x4f75a6 of _0x241116){if(_0xd9e6b4[_0x275818(0x7fe)](_0x4f75a6[_0x275818(0x616)]()))return!![];}return![];},Scene_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5c4)]=function(){const _0x1985ea=_0x2e6bc0;SoundManager[_0x1985ea(0x665)]();},VisuMZ['CoreEngine'][_0x2e6bc0(0x50e)]=Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)],Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)]=function(){const _0x3b7e75=_0x2e6bc0;VisuMZ[_0x3b7e75(0x468)][_0x3b7e75(0x50e)]['call'](this);if($gameTemp[_0x3b7e75(0x517)])this['updatePlayTestF7']();},Scene_Battle[_0x2e6bc0(0x5e2)]['updatePlayTestF7']=function(){const _0x49c6f1=_0x2e6bc0;!BattleManager[_0x49c6f1(0x7c8)]()&&!this[_0x49c6f1(0x335)]&&!$gameMessage[_0x49c6f1(0x7aa)]()&&(this[_0x49c6f1(0x335)]=!![],this['update'](),SceneManager[_0x49c6f1(0x82e)](),this[_0x49c6f1(0x335)]=![]);},VisuMZ['CoreEngine'][_0x2e6bc0(0x71b)]=Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x803)],Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x803)]=function(){const _0x144828=_0x2e6bc0;VisuMZ[_0x144828(0x468)]['Scene_Battle_createCancelButton'][_0x144828(0x895)](this),SceneManager[_0x144828(0xe7)]()&&this[_0x144828(0x71d)]();},Scene_Battle[_0x2e6bc0(0x5e2)]['repositionCancelButtonSideButtonLayout']=function(){const _0x113994=_0x2e6bc0;this['_cancelButton']['x']=Graphics[_0x113994(0x2b2)]+0x4,this[_0x113994(0x7dd)]()?this[_0x113994(0x29b)]['y']=Graphics[_0x113994(0x849)]-this[_0x113994(0x7d6)]():this[_0x113994(0x29b)]['y']=0x0;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x527)]=Sprite_Button[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)],Sprite_Button[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0x4b72ab){const _0x52625e=_0x2e6bc0;VisuMZ['CoreEngine']['Sprite_Button_initialize'][_0x52625e(0x895)](this,_0x4b72ab),this[_0x52625e(0x7f1)]();},Sprite_Button[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7f1)]=function(){const _0xb868b8=_0x2e6bc0,_0x11e0bf=VisuMZ['CoreEngine'][_0xb868b8(0x6ef)]['UI'];this[_0xb868b8(0x710)]=![];switch(this[_0xb868b8(0x2d2)]){case _0xb868b8(0x709):this[_0xb868b8(0x710)]=!_0x11e0bf['cancelShowButton'];break;case'pageup':case'pagedown':this[_0xb868b8(0x710)]=!_0x11e0bf[_0xb868b8(0x4c1)];break;case _0xb868b8(0x218):case'up':case _0xb868b8(0x854):case _0xb868b8(0x6f6):case'ok':this['_isButtonHidden']=!_0x11e0bf[_0xb868b8(0x42d)];break;case _0xb868b8(0x2cb):this[_0xb868b8(0x710)]=!_0x11e0bf['menuShowButton'];break;}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x888)]=Sprite_Button['prototype'][_0x2e6bc0(0x766)],Sprite_Button[_0x2e6bc0(0x5e2)]['updateOpacity']=function(){const _0x4b0015=_0x2e6bc0;SceneManager['areButtonsHidden']()||this[_0x4b0015(0x710)]?this[_0x4b0015(0x59c)]():VisuMZ[_0x4b0015(0x468)]['Sprite_Button_updateOpacity']['call'](this);},Sprite_Button[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x59c)]=function(){const _0xdf6273=_0x2e6bc0;this[_0xdf6273(0x510)]=![],this[_0xdf6273(0x687)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0xdf6273(0x689)]*0xa;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x8be)]=Sprite_Battler[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x111)],Sprite_Battler['prototype']['startMove']=function(_0x3faa64,_0x5a82cd,_0x259940){const _0x465249=_0x2e6bc0;(this[_0x465249(0x52f)]!==_0x3faa64||this[_0x465249(0x1b9)]!==_0x5a82cd)&&(this['setMoveEasingType'](_0x465249(0x4ab)),this[_0x465249(0x3e9)]=_0x259940),VisuMZ[_0x465249(0x468)][_0x465249(0x8be)][_0x465249(0x895)](this,_0x3faa64,_0x5a82cd,_0x259940);},Sprite_Battler[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x798)]=function(_0x216b2b){const _0x59ec2c=_0x2e6bc0;this[_0x59ec2c(0x20d)]=_0x216b2b;},Sprite_Battler['prototype'][_0x2e6bc0(0x19d)]=function(){const _0xe3306=_0x2e6bc0;if(this[_0xe3306(0x349)]<=0x0)return;const _0x2fbe4a=this[_0xe3306(0x349)],_0x46dc89=this['_movementWholeDuration'],_0x5a9a2f=this[_0xe3306(0x20d)];this[_0xe3306(0x795)]=this[_0xe3306(0x14e)](this[_0xe3306(0x795)],this[_0xe3306(0x52f)],_0x2fbe4a,_0x46dc89,_0x5a9a2f),this[_0xe3306(0xe8)]=this[_0xe3306(0x14e)](this[_0xe3306(0xe8)],this['_targetOffsetY'],_0x2fbe4a,_0x46dc89,_0x5a9a2f),this[_0xe3306(0x349)]--;if(this[_0xe3306(0x349)]<=0x0)this[_0xe3306(0x172)]();},Sprite_Battler[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x14e)]=function(_0x5e4d89,_0x3cf38d,_0x14747f,_0x48a873,_0x2c6385){const _0x31169f=_0x2e6bc0,_0x1ae876=VisuMZ[_0x31169f(0x71e)]((_0x48a873-_0x14747f)/_0x48a873,_0x2c6385||'Linear'),_0x136101=VisuMZ[_0x31169f(0x71e)]((_0x48a873-_0x14747f+0x1)/_0x48a873,_0x2c6385||_0x31169f(0x4ab)),_0xf43ccf=(_0x5e4d89-_0x3cf38d*_0x1ae876)/(0x1-_0x1ae876);return _0xf43ccf+(_0x3cf38d-_0xf43ccf)*_0x136101;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2e1)]=Sprite_Actor['prototype'][_0x2e6bc0(0x812)],Sprite_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x812)]=function(_0xd35bed){const _0x991fd1=_0x2e6bc0;VisuMZ[_0x991fd1(0x468)][_0x991fd1(0x6ef)]['UI'][_0x991fd1(0x526)]?this['setActorHomeRepositioned'](_0xd35bed):VisuMZ[_0x991fd1(0x468)]['Sprite_Actor_setActorHome'][_0x991fd1(0x895)](this,_0xd35bed);},Sprite_Actor[_0x2e6bc0(0x5e2)]['setActorHomeRepositioned']=function(_0x23b0e1){const _0x45ac4b=_0x2e6bc0;let _0x35ef73=Math[_0x45ac4b(0x897)](Graphics[_0x45ac4b(0x746)]/0x2+0xc0);_0x35ef73-=Math[_0x45ac4b(0x3ff)]((Graphics[_0x45ac4b(0x746)]-Graphics['boxWidth'])/0x2),_0x35ef73+=_0x23b0e1*0x20;let _0x25ce68=Graphics[_0x45ac4b(0x689)]-0xc8-$gameParty[_0x45ac4b(0x6b8)]()*0x30;_0x25ce68-=Math[_0x45ac4b(0x3ff)]((Graphics['height']-Graphics[_0x45ac4b(0x849)])/0x2),_0x25ce68+=_0x23b0e1*0x30,this[_0x45ac4b(0x3c7)](_0x35ef73,_0x25ce68);},Sprite_Actor[_0x2e6bc0(0x5e2)]['retreat']=function(){const _0x2510f1=_0x2e6bc0;this[_0x2510f1(0x111)](0x4b0,0x0,0x78);},Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x156)]=function(_0x3d7f52){const _0x268800=_0x2e6bc0;this[_0x268800(0x186)]=_0x3d7f52;},VisuMZ[_0x2e6bc0(0x468)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x688)],Sprite_Animation['prototype'][_0x2e6bc0(0x688)]=function(){const _0x1f9ddd=_0x2e6bc0;if(this['_muteSound'])return;VisuMZ[_0x1f9ddd(0x468)][_0x1f9ddd(0x160)]['call'](this);},VisuMZ['CoreEngine'][_0x2e6bc0(0x266)]=Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x289)],Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x289)]=function(_0xf4cde8){const _0x476b67=_0x2e6bc0;this[_0x476b67(0x5c8)]()?this[_0x476b67(0x313)](_0xf4cde8):VisuMZ[_0x476b67(0x468)][_0x476b67(0x266)][_0x476b67(0x895)](this,_0xf4cde8);},Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5c8)]=function(){const _0x1b7717=_0x2e6bc0;if(!this['_animation'])return![];const _0x556df8=this[_0x1b7717(0x4d2)][_0x1b7717(0x3d0)]||'';if(_0x556df8['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x556df8[_0x1b7717(0x298)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1b7717(0x468)][_0x1b7717(0x6ef)][_0x1b7717(0x818)][_0x1b7717(0x6db)];},Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x313)]=function(_0x374006){const _0x431a3b=_0x2e6bc0,_0x359696=this['_viewportSize'],_0x405bc8=this[_0x431a3b(0x7e7)],_0x1cfece=this['_animation'][_0x431a3b(0x698)]*(this[_0x431a3b(0x868)]?-0x1:0x1)-_0x359696/0x2,_0x1969d9=this['_animation'][_0x431a3b(0x83a)]-_0x405bc8/0x2,_0x19f209=this[_0x431a3b(0x6ce)](_0x374006);_0x374006['gl'][_0x431a3b(0x592)](_0x1cfece+_0x19f209['x'],_0x1969d9+_0x19f209['y'],_0x359696,_0x405bc8);},Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6a4)]=function(_0x5dcd66){const _0x4245b3=_0x2e6bc0;if(_0x5dcd66[_0x4245b3(0x2a8)]){}const _0x56ff62=this['_animation'][_0x4245b3(0x3d0)];let _0x498e10=_0x5dcd66[_0x4245b3(0x689)]*_0x5dcd66[_0x4245b3(0x53f)]['y'],_0x4f5621=0x0,_0x5941a5=-_0x498e10/0x2;if(_0x56ff62[_0x4245b3(0x298)](/<(?:HEAD|HEADER|TOP)>/i))_0x5941a5=-_0x498e10;if(_0x56ff62[_0x4245b3(0x298)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x5941a5=0x0;if(this[_0x4245b3(0x4d2)][_0x4245b3(0x216)])_0x5941a5=0x0;if(_0x56ff62[_0x4245b3(0x298)](/<(?:LEFT)>/i))_0x4f5621=-_0x5dcd66[_0x4245b3(0x746)]/0x2;if(_0x56ff62[_0x4245b3(0x298)](/<(?:RIGHT)>/i))_0x4f5621=_0x5dcd66[_0x4245b3(0x746)]/0x2;_0x56ff62[_0x4245b3(0x298)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x4f5621=Number(RegExp['$1'])*_0x5dcd66['width']);_0x56ff62[_0x4245b3(0x298)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x5941a5=(0x1-Number(RegExp['$1']))*-_0x498e10);_0x56ff62['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x4f5621=Number(RegExp['$1'])*_0x5dcd66['width'],_0x5941a5=(0x1-Number(RegExp['$2']))*-_0x498e10);if(_0x56ff62[_0x4245b3(0x298)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x4f5621+=Number(RegExp['$1']);if(_0x56ff62[_0x4245b3(0x298)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x5941a5+=Number(RegExp['$1']);_0x56ff62[_0x4245b3(0x298)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x4f5621+=Number(RegExp['$1']),_0x5941a5+=Number(RegExp['$2']));const _0x5f51b1=new Point(_0x4f5621,_0x5941a5);return _0x5dcd66[_0x4245b3(0x55c)](),_0x5dcd66[_0x4245b3(0x201)]['apply'](_0x5f51b1);},Sprite_AnimationMV[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x25d)]=function(){const _0x2d4f00=_0x2e6bc0;this[_0x2d4f00(0x344)]=VisuMZ['CoreEngine'][_0x2d4f00(0x6ef)][_0x2d4f00(0x818)]['MvAnimationRate']??0x4,this[_0x2d4f00(0x5a6)](),this['_rate']=this[_0x2d4f00(0x344)]['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x2e6bc0(0x5e2)]['setupCustomRateCoreEngine']=function(){const _0xcaa8b8=_0x2e6bc0;if(!this['_animation']);const _0x755d31=this[_0xcaa8b8(0x4d2)][_0xcaa8b8(0x3d0)]||'';_0x755d31['match'](/<RATE:[ ](\d+)>/i)&&(this[_0xcaa8b8(0x344)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x156)]=function(_0x2eda31){const _0x5ebf3c=_0x2e6bc0;this[_0x5ebf3c(0x186)]=_0x2eda31;},VisuMZ['CoreEngine']['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x724)],Sprite_AnimationMV[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x724)]=function(_0x5b08f2){const _0x16dd2f=_0x2e6bc0;this[_0x16dd2f(0x186)]&&(_0x5b08f2=JsonEx[_0x16dd2f(0x5a7)](_0x5b08f2),_0x5b08f2['se']&&(_0x5b08f2['se']['volume']=0x0)),VisuMZ[_0x16dd2f(0x468)][_0x16dd2f(0x12a)][_0x16dd2f(0x895)](this,_0x5b08f2);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2b0)]=Sprite_AnimationMV[_0x2e6bc0(0x5e2)]['updatePosition'],Sprite_AnimationMV[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x301)]=function(){const _0x5e1486=_0x2e6bc0;VisuMZ[_0x5e1486(0x468)]['Sprite_AnimationMV_updatePosition'][_0x5e1486(0x895)](this);if(this[_0x5e1486(0x4d2)][_0x5e1486(0x522)]===0x3){if(this['x']===0x0)this['x']=Math[_0x5e1486(0x897)](Graphics[_0x5e1486(0x746)]/0x2);if(this['y']===0x0)this['y']=Math[_0x5e1486(0x897)](Graphics[_0x5e1486(0x689)]/0x2);}},Sprite_Damage[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x483)]=function(_0xd944e4){const _0x5f3d2b=_0x2e6bc0;let _0xd658ff=Math['abs'](_0xd944e4)[_0x5f3d2b(0x128)]();this[_0x5f3d2b(0x5c9)]()&&(_0xd658ff=VisuMZ['GroupDigits'](_0xd658ff));const _0x3a3460=this[_0x5f3d2b(0x135)](),_0x2a77af=Math[_0x5f3d2b(0x3ff)](_0x3a3460*0.75);for(let _0x400b8c=0x0;_0x400b8c<_0xd658ff[_0x5f3d2b(0x29e)];_0x400b8c++){const _0x3ae24c=this[_0x5f3d2b(0x15c)](_0x2a77af,_0x3a3460);_0x3ae24c[_0x5f3d2b(0x253)][_0x5f3d2b(0x41f)](_0xd658ff[_0x400b8c],0x0,0x0,_0x2a77af,_0x3a3460,'center'),_0x3ae24c['x']=(_0x400b8c-(_0xd658ff[_0x5f3d2b(0x29e)]-0x1)/0x2)*_0x2a77af,_0x3ae24c['dy']=-_0x400b8c;}},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0x38c5b9=_0x2e6bc0;return VisuMZ[_0x38c5b9(0x468)][_0x38c5b9(0x6ef)][_0x38c5b9(0x818)]['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x2e6bc0(0x191)]=function(){const _0x5dbc56=_0x2e6bc0;return ColorManager[_0x5dbc56(0x57f)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ad)]=Sprite_Gauge['prototype'][_0x2e6bc0(0x417)],Sprite_Gauge[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x417)]=function(){const _0x1a26e4=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x1a26e4(0x6ad)]['call'](this)['clamp'](0x0,0x1);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x649)]=Sprite_Gauge[_0x2e6bc0(0x5e2)]['currentValue'],Sprite_Gauge[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x622)]=function(){const _0x2814b2=_0x2e6bc0;let _0x2bb053=VisuMZ[_0x2814b2(0x468)][_0x2814b2(0x649)]['call'](this);return _0x2bb053;},Sprite_Gauge['prototype'][_0x2e6bc0(0x520)]=function(){const _0xa7b8a3=_0x2e6bc0;let _0x228ee7=this[_0xa7b8a3(0x622)]();this[_0xa7b8a3(0x5c9)]()&&(_0x228ee7=VisuMZ['GroupDigits'](_0x228ee7));const _0x3d0bba=this[_0xa7b8a3(0x5a5)]()-0x1,_0x59dfc8=this[_0xa7b8a3(0x432)]?this['textHeight']():this[_0xa7b8a3(0x167)]();this['setupValueFont'](),this[_0xa7b8a3(0x253)][_0xa7b8a3(0x41f)](_0x228ee7,0x0,0x0,_0x3d0bba,_0x59dfc8,'right');},Sprite_Gauge[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x105)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x2e6bc0(0x5c9)]=function(){const _0x126c59=_0x2e6bc0;return VisuMZ[_0x126c59(0x468)]['Settings'][_0x126c59(0x818)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x191)]=function(){const _0x36ccda=_0x2e6bc0;return ColorManager[_0x36ccda(0x511)]();},Sprite_StateIcon[_0x2e6bc0(0x16a)]=VisuMZ[_0x2e6bc0(0x468)]['Settings']['UI'][_0x2e6bc0(0x254)]??!![],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x494)]=Sprite_StateIcon[_0x2e6bc0(0x5e2)]['loadBitmap'],Sprite_StateIcon[_0x2e6bc0(0x5e2)]['loadBitmap']=function(){const _0x3167b6=_0x2e6bc0;Sprite_StateIcon[_0x3167b6(0x16a)]?this[_0x3167b6(0x112)]():VisuMZ[_0x3167b6(0x468)][_0x3167b6(0x494)][_0x3167b6(0x895)](this);},Sprite_StateIcon[_0x2e6bc0(0x5e2)]['loadBitmapCoreEngine']=function(){const _0x473c96=_0x2e6bc0;this[_0x473c96(0x253)]=new Bitmap(ImageManager[_0x473c96(0x503)],ImageManager[_0x473c96(0x594)]),this[_0x473c96(0x791)]=ImageManager['loadSystem']('IconSet');},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4a1)]=Sprite_StateIcon[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x49f)],Sprite_StateIcon[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x49f)]=function(){const _0x54ef54=_0x2e6bc0;Sprite_StateIcon[_0x54ef54(0x16a)]?this[_0x54ef54(0x346)]():VisuMZ['CoreEngine'][_0x54ef54(0x4a1)]['call'](this);},Sprite_StateIcon['prototype'][_0x2e6bc0(0x346)]=function(){const _0x1a762f=_0x2e6bc0;if(this['_lastIconIndex']===this[_0x1a762f(0x3c9)])return;this[_0x1a762f(0x239)]=this['_iconIndex'];const _0x4150fc=ImageManager['iconWidth'],_0x105037=ImageManager[_0x1a762f(0x594)],_0x2d738b=this[_0x1a762f(0x3c9)]%0x10*_0x4150fc,_0x2c0206=Math[_0x1a762f(0x3ff)](this['_iconIndex']/0x10)*_0x105037,_0x438f34=this[_0x1a762f(0x791)],_0x3ae92f=this[_0x1a762f(0x253)];_0x3ae92f[_0x1a762f(0x1f1)](),_0x3ae92f[_0x1a762f(0x40d)](_0x438f34,_0x2d738b,_0x2c0206,_0x4150fc,_0x105037,0x0,0x0,_0x3ae92f[_0x1a762f(0x746)],_0x3ae92f[_0x1a762f(0x689)]);},VisuMZ[_0x2e6bc0(0x468)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1da)],Sprite_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1da)]=function(){const _0x3a5a84=_0x2e6bc0;this['_pictureName']&&this[_0x3a5a84(0x5bb)][_0x3a5a84(0x298)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x3a5a84(0x2e0)](Number(RegExp['$1'])):VisuMZ[_0x3a5a84(0x468)][_0x3a5a84(0x4cb)]['call'](this);},Sprite_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2e0)]=function(_0x370ed3){const _0xf26812=_0x2e6bc0,_0x41bd24=ImageManager['iconWidth'],_0x279932=ImageManager[_0xf26812(0x594)],_0x34762c=this[_0xf26812(0x5bb)][_0xf26812(0x298)](/SMOOTH/i);this[_0xf26812(0x253)]=new Bitmap(_0x41bd24,_0x279932);const _0x2755be=ImageManager['loadSystem']('IconSet'),_0x4ceb2a=_0x370ed3%0x10*_0x41bd24,_0x24cb0e=Math[_0xf26812(0x3ff)](_0x370ed3/0x10)*_0x279932;this[_0xf26812(0x253)][_0xf26812(0x4dd)]=_0x34762c,this[_0xf26812(0x253)][_0xf26812(0x40d)](_0x2755be,_0x4ceb2a,_0x24cb0e,_0x41bd24,_0x279932,0x0,0x0,_0x41bd24,_0x279932);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}function _0x545e(_0x1c3fdb,_0xaff97f){const _0x2615d9=_0x2615();return _0x545e=function(_0x545e3e,_0x5af4d8){_0x545e3e=_0x545e3e-0xe1;let _0x98b2b4=_0x2615d9[_0x545e3e];return _0x98b2b4;},_0x545e(_0x1c3fdb,_0xaff97f);}Sprite_TitlePictureButton['prototype']=Object[_0x2e6bc0(0x893)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton['prototype'][_0x2e6bc0(0x2c3)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0x1cc476){const _0x570481=_0x2e6bc0;Sprite_Clickable['prototype'][_0x570481(0x571)]['call'](this),this[_0x570481(0x43b)]=_0x1cc476,this[_0x570481(0x553)]=null,this[_0x570481(0x274)]();},Sprite_TitlePictureButton['prototype'][_0x2e6bc0(0x274)]=function(){const _0x3d18f6=_0x2e6bc0;this['x']=Graphics[_0x3d18f6(0x746)],this['y']=Graphics[_0x3d18f6(0x689)],this[_0x3d18f6(0x510)]=![],this[_0x3d18f6(0x1ad)]();},Sprite_TitlePictureButton['prototype'][_0x2e6bc0(0x1ad)]=function(){const _0x395a45=_0x2e6bc0;this[_0x395a45(0x253)]=ImageManager['loadPicture'](this['_data'][_0x395a45(0x85b)]),this[_0x395a45(0x253)][_0x395a45(0x34a)](this[_0x395a45(0x605)][_0x395a45(0x6e7)](this));},Sprite_TitlePictureButton['prototype'][_0x2e6bc0(0x605)]=function(){const _0x527577=_0x2e6bc0;this[_0x527577(0x43b)][_0x527577(0x3a6)][_0x527577(0x895)](this),this[_0x527577(0x43b)]['PositionJS'][_0x527577(0x895)](this),this[_0x527577(0x7e3)](this[_0x527577(0x43b)][_0x527577(0x612)][_0x527577(0x6e7)](this));},Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)]=function(){const _0x4b62c2=_0x2e6bc0;Sprite_Clickable[_0x4b62c2(0x5e2)][_0x4b62c2(0x645)]['call'](this),this[_0x4b62c2(0x766)](),this[_0x4b62c2(0x534)]();},Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x271)]=function(){const _0x470f1d=_0x2e6bc0;return VisuMZ[_0x470f1d(0x468)][_0x470f1d(0x6ef)]['MenuLayout'][_0x470f1d(0x887)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x766)]=function(){const _0x1cd7f5=_0x2e6bc0;this['_pressed']||this['_hovered']?this[_0x1cd7f5(0x687)]=0xff:(this[_0x1cd7f5(0x687)]+=this[_0x1cd7f5(0x510)]?this[_0x1cd7f5(0x271)]():-0x1*this['fadeSpeed'](),this[_0x1cd7f5(0x687)]=Math[_0x1cd7f5(0x69a)](0xc0,this[_0x1cd7f5(0x687)]));},Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7e3)]=function(_0x3bb29c){this['_clickHandler']=_0x3bb29c;},Sprite_TitlePictureButton[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x13c)]=function(){const _0x39b413=_0x2e6bc0;this[_0x39b413(0x553)]&&this['_clickHandler']();};function Sprite_ExtendedTile(){const _0x4c2521=_0x2e6bc0;this[_0x4c2521(0x571)](...arguments);}Sprite_ExtendedTile['prototype']=Object[_0x2e6bc0(0x893)](Sprite[_0x2e6bc0(0x5e2)]),Sprite_ExtendedTile['prototype'][_0x2e6bc0(0x2c3)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0x451e6a,_0x2e7189,_0x3bb5d2,_0x42c195){const _0x33bd41=_0x2e6bc0;this[_0x33bd41(0x159)]=Game_CharacterBase[_0x33bd41(0x7c7)]||-0x6,this[_0x33bd41(0x5b8)]=_0x451e6a,this['_mapY']=_0x2e7189,this[_0x33bd41(0x656)]=_0x3bb5d2,this[_0x33bd41(0x608)]=_0x42c195,Sprite[_0x33bd41(0x5e2)][_0x33bd41(0x571)][_0x33bd41(0x895)](this),this['createSubSprite'](),this[_0x33bd41(0x3d5)](),this[_0x33bd41(0x2fa)](),this['update']();},Sprite_ExtendedTile[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x634)]=function(){const _0x3d9be4=_0x2e6bc0;this[_0x3d9be4(0x6f7)]=new Sprite(),this['_tileSprite'][_0x3d9be4(0x704)]['x']=0.5,this[_0x3d9be4(0x6f7)][_0x3d9be4(0x704)]['y']=0x1,this[_0x3d9be4(0x6f7)]['y']=-this[_0x3d9be4(0x159)]+0x1,this[_0x3d9be4(0x6e8)](this['_tileSprite']);},Sprite_ExtendedTile['prototype'][_0x2e6bc0(0x3d5)]=function(){const _0x37de79=_0x2e6bc0,_0x6c306d=$gameMap[_0x37de79(0x6be)](),_0x52fdb4=0x5+Math[_0x37de79(0x3ff)](this[_0x37de79(0x656)]/0x100);this['_tileSprite'][_0x37de79(0x253)]=ImageManager[_0x37de79(0x56b)](_0x6c306d[_0x37de79(0x3eb)][_0x52fdb4]);},Sprite_ExtendedTile['prototype'][_0x2e6bc0(0x2fa)]=function(){const _0x4b55b0=_0x2e6bc0,_0x2e98e1=this[_0x4b55b0(0x656)],_0x2e206a=$gameMap[_0x4b55b0(0x363)](),_0x3fc12f=$gameMap[_0x4b55b0(0x5f7)](),_0x36c704=(Math['floor'](_0x2e98e1/0x80)%0x2*0x8+_0x2e98e1%0x8)*_0x2e206a,_0x1b1bf5=Math[_0x4b55b0(0x3ff)](_0x2e98e1%0x100/0x8)%0x10*_0x3fc12f,_0x562436=this[_0x4b55b0(0x608)]*_0x3fc12f;this[_0x4b55b0(0x6f7)]['setFrame'](_0x36c704,_0x1b1bf5-_0x562436,_0x2e206a,_0x3fc12f+_0x562436);},Sprite_ExtendedTile[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)]=function(){const _0x1deffd=_0x2e6bc0;Sprite[_0x1deffd(0x5e2)][_0x1deffd(0x645)][_0x1deffd(0x895)](this),this[_0x1deffd(0x301)]();},Sprite_ExtendedTile['prototype'][_0x2e6bc0(0x301)]=function(){const _0x43df40=_0x2e6bc0,_0xf85d84=$gameMap[_0x43df40(0x363)](),_0x509a2e=$gameMap[_0x43df40(0x5f7)](),_0x36c2f0=this[_0x43df40(0x5b8)],_0x10dd46=this[_0x43df40(0x422)];this['x']=Math[_0x43df40(0x3ff)](($gameMap[_0x43df40(0x2d8)](_0x36c2f0)+0.5)*_0xf85d84),this['y']=Math[_0x43df40(0x3ff)](($gameMap['adjustY'](_0x10dd46)+0x1)*_0x509a2e)+this[_0x43df40(0x159)]-0x1;},VisuMZ['CoreEngine'][_0x2e6bc0(0x306)]=Spriteset_Base[_0x2e6bc0(0x5e2)]['initialize'],Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(){const _0x3049f8=_0x2e6bc0;VisuMZ[_0x3049f8(0x468)][_0x3049f8(0x306)][_0x3049f8(0x895)](this),this['initMembersCoreEngine']();},Spriteset_Base['prototype'][_0x2e6bc0(0x756)]=function(){const _0x441fcd=_0x2e6bc0;this[_0x441fcd(0x27e)]=[],this[_0x441fcd(0x3fb)]=[],this[_0x441fcd(0x21a)]=this['scale']['x'],this[_0x441fcd(0x5b7)]=this[_0x441fcd(0x53f)]['y'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x19a)]=Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1a5)],Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1a5)]=function(_0x57706a){const _0x30c402=_0x2e6bc0;this[_0x30c402(0x505)](),this[_0x30c402(0x454)](),VisuMZ[_0x30c402(0x468)]['Spriteset_Base_destroy'][_0x30c402(0x895)](this,_0x57706a);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1a1)]=Spriteset_Base['prototype']['update'],Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)]=function(){const _0x57c65e=_0x2e6bc0;VisuMZ[_0x57c65e(0x468)][_0x57c65e(0x1a1)]['call'](this),this[_0x57c65e(0x429)](),this['updatePictureAntiZoom'](),this[_0x57c65e(0x328)](),this[_0x57c65e(0x10c)]();},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x429)]=function(){},Spriteset_Base[_0x2e6bc0(0x5e2)]['updatePictureAntiZoom']=function(){const _0x67cb4f=_0x2e6bc0;if(!VisuMZ[_0x67cb4f(0x468)][_0x67cb4f(0x6ef)][_0x67cb4f(0x818)][_0x67cb4f(0x1c7)])return;if(this[_0x67cb4f(0x21a)]===this['scale']['x']&&this[_0x67cb4f(0x5b7)]===this[_0x67cb4f(0x53f)]['y'])return;this[_0x67cb4f(0x793)](),this['_cacheScaleX']=this[_0x67cb4f(0x53f)]['x'],this[_0x67cb4f(0x5b7)]=this[_0x67cb4f(0x53f)]['y'];},Spriteset_Base['prototype'][_0x2e6bc0(0x793)]=function(){const _0x3899c3=_0x2e6bc0;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x3899c3(0x1d1)])return;else{if(SceneManager[_0x3899c3(0x76f)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this[_0x3899c3(0x53f)]['x']!==0x0&&(this[_0x3899c3(0x431)][_0x3899c3(0x53f)]['x']=0x1/this[_0x3899c3(0x53f)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3899c3(0x53f)]['x'])),this[_0x3899c3(0x53f)]['y']!==0x0&&(this[_0x3899c3(0x431)][_0x3899c3(0x53f)]['y']=0x1/this[_0x3899c3(0x53f)]['y'],this[_0x3899c3(0x431)]['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x2e6bc0(0x468)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x301)],Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x301)]=function(){const _0x1e7fe6=_0x2e6bc0;VisuMZ[_0x1e7fe6(0x468)][_0x1e7fe6(0x889)][_0x1e7fe6(0x895)](this),this[_0x1e7fe6(0x65c)]();},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x65c)]=function(){const _0x3c86a3=_0x2e6bc0;if(!$gameScreen)return;if($gameScreen[_0x3c86a3(0x600)]<=0x0)return;this['x']-=Math[_0x3c86a3(0x897)]($gameScreen[_0x3c86a3(0x8ad)]());const _0xfa76ff=$gameScreen[_0x3c86a3(0x31b)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x3c86a3(0x50c):this['updatePositionCoreEngineShakeOriginal']();break;case _0x3c86a3(0x870):this[_0x3c86a3(0x419)]();break;case _0x3c86a3(0x33e):this[_0x3c86a3(0x80b)]();break;default:this[_0x3c86a3(0x3a7)]();break;}},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6d1)]=function(){const _0x223a45=_0x2e6bc0,_0x3543f4=VisuMZ[_0x223a45(0x468)][_0x223a45(0x6ef)][_0x223a45(0x392)];if(_0x3543f4&&_0x3543f4[_0x223a45(0x2a7)])return _0x3543f4[_0x223a45(0x2a7)][_0x223a45(0x895)](this);this['x']+=Math[_0x223a45(0x897)]($gameScreen[_0x223a45(0x8ad)]());},Spriteset_Base[_0x2e6bc0(0x5e2)]['updatePositionCoreEngineShakeRand']=function(){const _0x19c09a=_0x2e6bc0,_0x4bf4c1=VisuMZ[_0x19c09a(0x468)]['Settings'][_0x19c09a(0x392)];if(_0x4bf4c1&&_0x4bf4c1[_0x19c09a(0x152)])return _0x4bf4c1['randomJS'][_0x19c09a(0x895)](this);const _0x1c2eb8=$gameScreen[_0x19c09a(0x770)]*0.75,_0x44f1cc=$gameScreen[_0x19c09a(0x13f)]*0.6,_0x59455f=$gameScreen['_shakeDuration'];this['x']+=Math[_0x19c09a(0x897)](Math['randomInt'](_0x1c2eb8)-Math[_0x19c09a(0x3b7)](_0x44f1cc))*(Math['min'](_0x59455f,0x1e)*0.5),this['y']+=Math['round'](Math['randomInt'](_0x1c2eb8)-Math[_0x19c09a(0x3b7)](_0x44f1cc))*(Math['min'](_0x59455f,0x1e)*0.5);},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x419)]=function(){const _0x77b8a9=_0x2e6bc0,_0x27b768=VisuMZ[_0x77b8a9(0x468)][_0x77b8a9(0x6ef)][_0x77b8a9(0x392)];if(_0x27b768&&_0x27b768[_0x77b8a9(0x7dc)])return _0x27b768[_0x77b8a9(0x7dc)][_0x77b8a9(0x895)](this);const _0x3c6bcf=$gameScreen[_0x77b8a9(0x770)]*0.75,_0x82b4e0=$gameScreen['_shakeSpeed']*0.6,_0x4a504a=$gameScreen['_shakeDuration'];this['x']+=Math[_0x77b8a9(0x897)](Math[_0x77b8a9(0x3b7)](_0x3c6bcf)-Math[_0x77b8a9(0x3b7)](_0x82b4e0))*(Math['min'](_0x4a504a,0x1e)*0.5);},Spriteset_Base[_0x2e6bc0(0x5e2)]['updatePositionCoreEngineShakeVert']=function(){const _0x3a1b41=_0x2e6bc0,_0x3cbb31=VisuMZ[_0x3a1b41(0x468)][_0x3a1b41(0x6ef)][_0x3a1b41(0x392)];if(_0x3cbb31&&_0x3cbb31[_0x3a1b41(0x646)])return _0x3cbb31[_0x3a1b41(0x646)][_0x3a1b41(0x895)](this);const _0xde2e0c=$gameScreen[_0x3a1b41(0x770)]*0.75,_0x22e671=$gameScreen[_0x3a1b41(0x13f)]*0.6,_0x4ed3e8=$gameScreen[_0x3a1b41(0x600)];this['y']+=Math[_0x3a1b41(0x897)](Math[_0x3a1b41(0x3b7)](_0xde2e0c)-Math[_0x3a1b41(0x3b7)](_0x22e671))*(Math[_0x3a1b41(0x69a)](_0x4ed3e8,0x1e)*0.5);},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x328)]=function(){const _0x561a45=_0x2e6bc0;for(const _0x40eb25 of this[_0x561a45(0x27e)]){!_0x40eb25['isPlaying']()&&this[_0x561a45(0x368)](_0x40eb25);}this[_0x561a45(0x32f)]();},Spriteset_Base[_0x2e6bc0(0x5e2)]['processFauxAnimationRequests']=function(){const _0x24f179=_0x2e6bc0;for(;;){const _0xae0e90=$gameTemp[_0x24f179(0x348)]();if(_0xae0e90)this[_0x24f179(0x7bd)](_0xae0e90);else break;}},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7bd)]=function(_0xc23207){const _0x37f0c0=_0x2e6bc0,_0x32e9c8=$dataAnimations[_0xc23207[_0x37f0c0(0x1d6)]],_0x430555=_0xc23207[_0x37f0c0(0x62e)],_0x515302=_0xc23207[_0x37f0c0(0x4c9)],_0x3b3518=_0xc23207[_0x37f0c0(0x7f6)];let _0x46ab1e=this[_0x37f0c0(0x3a3)]();const _0x44820c=this['animationNextDelay']();if(this[_0x37f0c0(0x30f)](_0x32e9c8))for(const _0xcc279 of _0x430555){this[_0x37f0c0(0x70f)]([_0xcc279],_0x32e9c8,_0x515302,_0x46ab1e,_0x3b3518),_0x46ab1e+=_0x44820c;}else this[_0x37f0c0(0x70f)](_0x430555,_0x32e9c8,_0x515302,_0x46ab1e,_0x3b3518);},Spriteset_Base['prototype'][_0x2e6bc0(0x560)]=function(_0x5385cf,_0x41f3bc,_0x41b76f,_0x4afb96){const _0x4ba4ea=_0x2e6bc0,_0x3cb5fe=this[_0x4ba4ea(0x23e)](_0x41f3bc),_0x3f5fe8=new(_0x3cb5fe?Sprite_AnimationMV:Sprite_Animation)(),_0x492ce4=this['makeTargetSprites'](_0x5385cf),_0x585b9a=this[_0x4ba4ea(0x3a3)](),_0x191287=_0x4afb96>_0x585b9a?this['lastAnimationSprite']():null;this[_0x4ba4ea(0x125)](_0x5385cf[0x0])&&(_0x41b76f=!_0x41b76f),_0x3f5fe8[_0x4ba4ea(0x7a2)]=_0x5385cf,_0x3f5fe8[_0x4ba4ea(0x274)](_0x492ce4,_0x41f3bc,_0x41b76f,_0x4afb96,_0x191287),this[_0x4ba4ea(0x53e)](_0x3f5fe8),this['_animationSprites'][_0x4ba4ea(0x16c)](_0x3f5fe8);},Spriteset_Base[_0x2e6bc0(0x5e2)]['createFauxAnimationSprite']=function(_0x1aaa89,_0x1c4b30,_0x4abf0e,_0x1f46bd,_0x41c748){const _0x583ed8=_0x2e6bc0,_0x85d908=this[_0x583ed8(0x23e)](_0x1c4b30),_0x2d4d4f=new(_0x85d908?Sprite_AnimationMV:Sprite_Animation)(),_0x1d0941=this[_0x583ed8(0x67c)](_0x1aaa89);this[_0x583ed8(0x125)](_0x1aaa89[0x0])&&(_0x4abf0e=!_0x4abf0e);_0x2d4d4f[_0x583ed8(0x7a2)]=_0x1aaa89,_0x2d4d4f['setup'](_0x1d0941,_0x1c4b30,_0x4abf0e,_0x1f46bd),_0x2d4d4f[_0x583ed8(0x156)](_0x41c748),this[_0x583ed8(0x53e)](_0x2d4d4f);if(this['_animationSprites'])this['_animationSprites']['remove'](_0x2d4d4f);this['_fauxAnimationSprites'][_0x583ed8(0x16c)](_0x2d4d4f);},Spriteset_Base[_0x2e6bc0(0x5e2)]['addAnimationSpriteToContainer']=function(_0x374fe1){const _0x1df2cc=_0x2e6bc0;this['_effectsContainer'][_0x1df2cc(0x6e8)](_0x374fe1);},Spriteset_Base[_0x2e6bc0(0x5e2)]['removeAnimation']=function(_0x119a90){const _0x445d26=_0x2e6bc0;this['_animationSprites']['remove'](_0x119a90),this[_0x445d26(0x3a9)](_0x119a90);for(const _0x1d6e82 of _0x119a90['targetObjects']){_0x1d6e82['endAnimation']&&_0x1d6e82[_0x445d26(0x6b5)]();}_0x119a90[_0x445d26(0x1a5)]();},Spriteset_Base['prototype'][_0x2e6bc0(0x368)]=function(_0x5e1be9){const _0x5505a1=_0x2e6bc0;this[_0x5505a1(0x27e)]['remove'](_0x5e1be9),this[_0x5505a1(0x3a9)](_0x5e1be9);for(const _0x5d7dac of _0x5e1be9['targetObjects']){_0x5d7dac[_0x5505a1(0x6b5)]&&_0x5d7dac[_0x5505a1(0x6b5)]();}_0x5e1be9[_0x5505a1(0x1a5)]();},Spriteset_Base['prototype'][_0x2e6bc0(0x3a9)]=function(_0x47c97e){const _0x4a82ab=_0x2e6bc0;this['_effectsContainer'][_0x4a82ab(0x418)](_0x47c97e);},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x505)]=function(){const _0x2fc709=_0x2e6bc0;for(const _0x367c54 of this[_0x2fc709(0x27e)]){this[_0x2fc709(0x368)](_0x367c54);}},Spriteset_Base[_0x2e6bc0(0x5e2)]['isFauxAnimationPlaying']=function(){const _0x15b68a=_0x2e6bc0;return this[_0x15b68a(0x27e)][_0x15b68a(0x29e)]>0x0;},Spriteset_Base[_0x2e6bc0(0x5e2)]['updatePointAnimations']=function(){const _0x558271=_0x2e6bc0;for(const _0x55fa02 of this[_0x558271(0x3fb)]){!_0x55fa02['isPlaying']()&&this[_0x558271(0x515)](_0x55fa02);}this[_0x558271(0x3b5)]();},Spriteset_Base['prototype'][_0x2e6bc0(0x3b5)]=function(){const _0x5eb9fa=_0x2e6bc0;for(;;){const _0x533619=$gameTemp[_0x5eb9fa(0x2b3)]();if(_0x533619)this[_0x5eb9fa(0x759)](_0x533619);else break;}},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x759)]=function(_0x55a983){const _0x45ab72=_0x2e6bc0,_0x2025ac=$dataAnimations[_0x55a983[_0x45ab72(0x1d6)]],_0x68e923=this[_0x45ab72(0x7d4)](_0x55a983),_0x2bdf5c=_0x55a983[_0x45ab72(0x4c9)],_0x381881=_0x55a983[_0x45ab72(0x7f6)];let _0x513ca1=this[_0x45ab72(0x3a3)]();const _0x2bf39b=this[_0x45ab72(0x2a4)]();if(this[_0x45ab72(0x30f)](_0x2025ac))for(const _0x220bc3 of _0x68e923){this[_0x45ab72(0xea)]([_0x220bc3],_0x2025ac,_0x2bdf5c,_0x513ca1,_0x381881),_0x513ca1+=_0x2bf39b;}else this['createPointAnimationSprite'](_0x68e923,_0x2025ac,_0x2bdf5c,_0x513ca1,_0x381881);},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7d4)]=function(_0x212a57){const _0x2fda65=_0x2e6bc0,_0x2a7779=new Sprite_Clickable(),_0x5a46e3=this[_0x2fda65(0x85e)]();_0x2a7779['x']=_0x212a57['x']-_0x5a46e3['x'],_0x2a7779['y']=_0x212a57['y']-_0x5a46e3['y'],_0x2a7779['z']=0x64;const _0x4ba323=this[_0x2fda65(0x85e)]();return _0x4ba323[_0x2fda65(0x6e8)](_0x2a7779),[_0x2a7779];},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x85e)]=function(){return this;},Spriteset_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x85e)]=function(){const _0x305e50=_0x2e6bc0;return this[_0x305e50(0x771)]||this;},Spriteset_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x85e)]=function(){const _0x483da4=_0x2e6bc0;return this[_0x483da4(0x53d)]||this;},Spriteset_Base[_0x2e6bc0(0x5e2)]['createPointAnimationSprite']=function(_0xa56160,_0x394d20,_0x438fa1,_0x4716d1,_0xa2ed38){const _0x554440=_0x2e6bc0,_0x1a2952=this[_0x554440(0x23e)](_0x394d20),_0x502409=new(_0x1a2952?Sprite_AnimationMV:Sprite_Animation)();_0x502409[_0x554440(0x7a2)]=_0xa56160,_0x502409[_0x554440(0x274)](_0xa56160,_0x394d20,_0x438fa1,_0x4716d1),_0x502409[_0x554440(0x156)](_0xa2ed38),this[_0x554440(0x53e)](_0x502409),this[_0x554440(0x3fb)][_0x554440(0x16c)](_0x502409);},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x515)]=function(_0x4429c3){const _0x19bdb8=_0x2e6bc0;this['_pointAnimationSprites']['remove'](_0x4429c3),this[_0x19bdb8(0x41d)][_0x19bdb8(0x418)](_0x4429c3);for(const _0x1ad390 of _0x4429c3['targetObjects']){_0x1ad390[_0x19bdb8(0x6b5)]&&_0x1ad390[_0x19bdb8(0x6b5)]();const _0x294e88=this[_0x19bdb8(0x85e)]();if(_0x294e88)_0x294e88[_0x19bdb8(0x418)](_0x1ad390);}_0x4429c3[_0x19bdb8(0x1a5)]();},Spriteset_Base['prototype'][_0x2e6bc0(0x454)]=function(){for(const _0x2b99cc of this['_pointAnimationSprites']){this['removePointAnimation'](_0x2b99cc);}},Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x428)]=function(){const _0x593f6a=_0x2e6bc0;return this['_pointAnimationSprites'][_0x593f6a(0x29e)]>0x0;},VisuMZ['CoreEngine'][_0x2e6bc0(0x6ec)]=Spriteset_Base['prototype'][_0x2e6bc0(0x874)],Spriteset_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x874)]=function(){const _0x7a6036=_0x2e6bc0;return VisuMZ[_0x7a6036(0x468)][_0x7a6036(0x6ec)]['call'](this)||this[_0x7a6036(0x428)]();},Spriteset_Map[_0x2e6bc0(0x1d1)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x818)][_0x2e6bc0(0x151)]||![],VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x16b)]=Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)],Scene_Map[_0x2e6bc0(0x5e2)]['createSpriteset']=function(){const _0x5f7c6=_0x2e6bc0;VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach'][_0x5f7c6(0x895)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x2a34ad=this[_0x5f7c6(0x722)];if(!_0x2a34ad)return;this[_0x5f7c6(0x431)]=_0x2a34ad['_pictureContainer'];if(!this[_0x5f7c6(0x431)])return;this[_0x5f7c6(0x6e8)](this[_0x5f7c6(0x431)]);},VisuMZ[_0x2e6bc0(0x468)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x2e6bc0(0x5e2)]['createTilemap'],Spriteset_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3c8)]=function(){const _0x49c0c3=_0x2e6bc0;VisuMZ['CoreEngine']['Spriteset_Map_createTilemap'][_0x49c0c3(0x895)](this),this[_0x49c0c3(0xec)]();},Spriteset_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0xec)]=function(){const _0xacfd51=_0x2e6bc0,_0x3d7925=$gameMap[_0xacfd51(0x6be)]();if(!_0x3d7925)return;const _0x3f26b7=$gameMap[_0xacfd51(0x2de)]();if(Object[_0xacfd51(0x316)](_0x3f26b7)[_0xacfd51(0x29e)]<=0x0)return;const _0x1032c7=$gameMap[_0xacfd51(0x452)]();this[_0xacfd51(0x366)]=this[_0xacfd51(0x366)]||[];for(let _0x55f605=0x0;_0x55f605<$gameMap['height']();_0x55f605++){for(let _0x91b9b9=0x0;_0x91b9b9<$gameMap[_0xacfd51(0x746)]();_0x91b9b9++){for(const _0x27d6b6 of $gameMap['layeredTiles'](_0x91b9b9,_0x55f605)){const _0x3b2e08=_0x1032c7[_0x27d6b6]>>0xc,_0x45ea0a=_0x3f26b7[_0x3b2e08]||0x0;if(_0x45ea0a<=0x0)continue;this[_0xacfd51(0x25c)](_0x91b9b9,_0x55f605,_0x27d6b6,_0x45ea0a);}}}},Spriteset_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1c4)]=function(){const _0x4e2f9f=_0x2e6bc0;this[_0x4e2f9f(0x366)]=this[_0x4e2f9f(0x366)]||[];for(const _0x2229b0 of this[_0x4e2f9f(0x366)]){this[_0x4e2f9f(0x771)][_0x4e2f9f(0x418)](_0x2229b0);}this[_0x4e2f9f(0x366)]=[];},Spriteset_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x25c)]=function(_0x29b0a2,_0x475baa,_0x295a13,_0x5a7f7d){const _0x3da866=_0x2e6bc0,_0x3c5e4f=new Sprite_ExtendedTile(_0x29b0a2,_0x475baa,_0x295a13,_0x5a7f7d),_0x47b5c5=$gameMap[_0x3da866(0x452)]();_0x47b5c5[_0x295a13]&0x10?_0x3c5e4f['z']=0x4:_0x3c5e4f['z']=0x3,this[_0x3da866(0x771)]['addChild'](_0x3c5e4f),this[_0x3da866(0x366)][_0x3da866(0x16c)](_0x3c5e4f);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ff)]=Tilemap[_0x2e6bc0(0x5e2)]['_addSpotTile'],Tilemap[_0x2e6bc0(0x5e2)]['_addSpotTile']=function(_0x316473,_0x5867de,_0x5965ed){const _0x4cd3a1=_0x2e6bc0;if($gameMap[_0x4cd3a1(0x703)](_0x316473))return;VisuMZ['CoreEngine']['Tilemap_addSpotTile'][_0x4cd3a1(0x895)](this,_0x316473,_0x5867de,_0x5965ed);},Spriteset_Battle[_0x2e6bc0(0x1d1)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x818)][_0x2e6bc0(0x7cf)]||![],VisuMZ[_0x2e6bc0(0x468)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)],Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)]=function(){const _0x503535=_0x2e6bc0;VisuMZ[_0x503535(0x468)][_0x503535(0x596)]['call'](this);if(!Spriteset_Battle[_0x503535(0x1d1)])return;const _0x22eb58=this[_0x503535(0x722)];if(!_0x22eb58)return;this['_pictureContainer']=_0x22eb58[_0x503535(0x431)];if(!this['_pictureContainer'])return;this[_0x503535(0x6e8)](this[_0x503535(0x431)]);},Spriteset_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1bc)]=function(){const _0x44c807=_0x2e6bc0;this[_0x44c807(0x7b1)]=new PIXI['filters'][(_0x44c807(0x774))](clamp=!![]),this[_0x44c807(0x8bc)]=new Sprite(),this[_0x44c807(0x8bc)][_0x44c807(0x253)]=SceneManager[_0x44c807(0x38e)](),this[_0x44c807(0x8bc)][_0x44c807(0x285)]=[this[_0x44c807(0x7b1)]],this[_0x44c807(0x1f3)][_0x44c807(0x6e8)](this[_0x44c807(0x8bc)]);},VisuMZ['CoreEngine'][_0x2e6bc0(0x64a)]=Spriteset_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x53c)],Spriteset_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x53c)]=function(){const _0x35f4dc=_0x2e6bc0;this[_0x35f4dc(0x68a)]()&&this[_0x35f4dc(0x81d)](),VisuMZ[_0x35f4dc(0x468)]['Spriteset_Battle_createEnemies'][_0x35f4dc(0x895)](this);},Spriteset_Battle['prototype']['coreEngineRepositionEnemies']=function(){const _0x2c5fb6=_0x2e6bc0,_0x143702=VisuMZ['CoreEngine'][_0x2c5fb6(0x6ef)][_0x2c5fb6(0x2bb)];if(!_0x143702)return![];if(Utils['RPGMAKER_VERSION']>='1.3.0'&&!_0x143702[_0x2c5fb6(0x33d)])return![];if(Utils['RPGMAKER_VERSION']>=_0x2c5fb6(0x51e)&&!_0x143702['RepositionEnemies130'])return![];return _0x143702[_0x2c5fb6(0x140)];},Spriteset_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x81d)]=function(){const _0x4b7f23=_0x2e6bc0;for(member of $gameTroop[_0x4b7f23(0x7be)]()){member[_0x4b7f23(0xff)]();}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1e0)]=Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0x23083d){const _0x58f5a5=_0x2e6bc0;_0x23083d['x']=Math[_0x58f5a5(0x897)](_0x23083d['x']),_0x23083d['y']=Math[_0x58f5a5(0x897)](_0x23083d['y']),_0x23083d[_0x58f5a5(0x746)]=Math[_0x58f5a5(0x897)](_0x23083d[_0x58f5a5(0x746)]),_0x23083d[_0x58f5a5(0x689)]=Math[_0x58f5a5(0x897)](_0x23083d[_0x58f5a5(0x689)]),this[_0x58f5a5(0x36f)](),VisuMZ[_0x58f5a5(0x468)][_0x58f5a5(0x1e0)][_0x58f5a5(0x895)](this,_0x23083d),this[_0x58f5a5(0x1ae)]();},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x36f)]=function(){const _0x51daac=_0x2e6bc0;this[_0x51daac(0x2a5)]=VisuMZ[_0x51daac(0x468)][_0x51daac(0x6ef)]['QoL'][_0x51daac(0x833)],this['_digitGroupingEx']=VisuMZ[_0x51daac(0x468)]['Settings']['QoL'][_0x51daac(0x43f)];},Window_Base['prototype']['lineHeight']=function(){const _0x1fd50c=_0x2e6bc0;return VisuMZ[_0x1fd50c(0x468)][_0x1fd50c(0x6ef)]['Window'][_0x1fd50c(0x51f)];},Window_Base['prototype'][_0x2e6bc0(0x637)]=function(){const _0x10e880=_0x2e6bc0;return VisuMZ[_0x10e880(0x468)][_0x10e880(0x6ef)][_0x10e880(0x76e)][_0x10e880(0x23d)];},Window_Base[_0x2e6bc0(0x5e2)]['updateBackOpacity']=function(){const _0xa40379=_0x2e6bc0;$gameSystem[_0xa40379(0x506)]?this[_0xa40379(0x66f)]=$gameSystem[_0xa40379(0x506)]():this['backOpacity']=VisuMZ[_0xa40379(0x468)][_0xa40379(0x6ef)][_0xa40379(0x76e)][_0xa40379(0x79a)];},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5d1)]=function(){const _0x451d66=_0x2e6bc0;return VisuMZ['CoreEngine'][_0x451d66(0x6ef)][_0x451d66(0x76e)][_0x451d66(0x165)];},Window_Base['prototype'][_0x2e6bc0(0x66e)]=function(){const _0x5d5518=_0x2e6bc0;return VisuMZ['CoreEngine']['Settings'][_0x5d5518(0x76e)]['OpenSpeed'];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x244)]=Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)],Window_Base[_0x2e6bc0(0x5e2)]['update']=function(){const _0x4e0b1c=_0x2e6bc0;VisuMZ[_0x4e0b1c(0x468)][_0x4e0b1c(0x244)][_0x4e0b1c(0x895)](this),this[_0x4e0b1c(0x384)]();},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x293)]=function(){const _0x10b317=_0x2e6bc0;this[_0x10b317(0x521)]&&(this[_0x10b317(0x73b)]+=this[_0x10b317(0x66e)](),this[_0x10b317(0x482)]()&&(this['_opening']=![]));},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x673)]=function(){const _0x2ee6e=_0x2e6bc0;this[_0x2ee6e(0x13b)]&&(this['openness']-=this[_0x2ee6e(0x66e)](),this[_0x2ee6e(0x236)]()&&(this[_0x2ee6e(0x13b)]=![]));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x321)]=Window_Base['prototype']['drawText'],Window_Base['prototype'][_0x2e6bc0(0x41f)]=function(_0x4dfea5,_0x4e33c2,_0x373777,_0x3a8418,_0x5ba37d){const _0x12b867=_0x2e6bc0;if(this[_0x12b867(0x5c9)]())_0x4dfea5=VisuMZ['GroupDigits'](_0x4dfea5);VisuMZ[_0x12b867(0x468)]['Window_Base_drawText'][_0x12b867(0x895)](this,_0x4dfea5,_0x4e33c2,_0x373777,_0x3a8418,_0x5ba37d);},Window_Base['prototype']['useDigitGrouping']=function(){const _0x223104=_0x2e6bc0;return this[_0x223104(0x2a5)];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x451)]=Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1ce)],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1ce)]=function(_0x35d37e,_0x43d639,_0x2f4374,_0x199a0e){const _0x5e2fa5=_0x2e6bc0;var _0x27ea94=VisuMZ[_0x5e2fa5(0x468)]['Window_Base_createTextState'][_0x5e2fa5(0x895)](this,_0x35d37e,_0x43d639,_0x2f4374,_0x199a0e);if(this[_0x5e2fa5(0x834)]())_0x27ea94['text']=String(VisuMZ['GroupDigits'](_0x27ea94[_0x5e2fa5(0x5f9)]))||'';return _0x27ea94;},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x834)]=function(){const _0x187ad9=_0x2e6bc0;return this[_0x187ad9(0x6cc)];},Window_Base[_0x2e6bc0(0x5e2)]['enableDigitGrouping']=function(_0x32ce0d){const _0x2a0365=_0x2e6bc0;this[_0x2a0365(0x2a5)]=_0x32ce0d;},Window_Base[_0x2e6bc0(0x5e2)]['enableDigitGroupingEx']=function(_0x67d6c){const _0xac284=_0x2e6bc0;this[_0xac284(0x6cc)]=_0x67d6c;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6c3)]=Window_Base[_0x2e6bc0(0x5e2)]['drawIcon'],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4d7)]=function(_0x179857,_0xeb6942,_0x3210ae){const _0x2daa45=_0x2e6bc0;_0xeb6942=Math[_0x2daa45(0x897)](_0xeb6942),_0x3210ae=Math[_0x2daa45(0x897)](_0x3210ae),VisuMZ[_0x2daa45(0x468)][_0x2daa45(0x6c3)][_0x2daa45(0x895)](this,_0x179857,_0xeb6942,_0x3210ae);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x512)],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x512)]=function(_0x55af3b,_0x1eb1f8,_0x45f22f,_0x554514,_0x2efc66,_0x31dd1a){const _0xb99f11=_0x2e6bc0;_0x2efc66=_0x2efc66||ImageManager['faceWidth'],_0x31dd1a=_0x31dd1a||ImageManager[_0xb99f11(0x8c0)],_0x45f22f=Math[_0xb99f11(0x897)](_0x45f22f),_0x554514=Math[_0xb99f11(0x897)](_0x554514),_0x2efc66=Math[_0xb99f11(0x897)](_0x2efc66),_0x31dd1a=Math[_0xb99f11(0x897)](_0x31dd1a),VisuMZ[_0xb99f11(0x468)][_0xb99f11(0x580)][_0xb99f11(0x895)](this,_0x55af3b,_0x1eb1f8,_0x45f22f,_0x554514,_0x2efc66,_0x31dd1a);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x5ed)]=Window_Base[_0x2e6bc0(0x5e2)]['drawCharacter'],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7ec)]=function(_0x15bc1a,_0x48e102,_0x298bbb,_0x7b8072){const _0x4b13d8=_0x2e6bc0;_0x298bbb=Math['round'](_0x298bbb),_0x7b8072=Math[_0x4b13d8(0x897)](_0x7b8072),VisuMZ[_0x4b13d8(0x468)]['Window_Base_drawCharacter'][_0x4b13d8(0x895)](this,_0x15bc1a,_0x48e102,_0x298bbb,_0x7b8072);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x852)]=Window_Selectable[_0x2e6bc0(0x5e2)]['itemRect'],Window_Selectable[_0x2e6bc0(0x5e2)]['itemRect']=function(_0x8a2ea2){const _0x47730c=_0x2e6bc0;let _0x4100ac=VisuMZ[_0x47730c(0x468)][_0x47730c(0x852)][_0x47730c(0x895)](this,_0x8a2ea2);return _0x4100ac['x']=Math[_0x47730c(0x897)](_0x4100ac['x']),_0x4100ac['y']=Math[_0x47730c(0x897)](_0x4100ac['y']),_0x4100ac[_0x47730c(0x746)]=Math[_0x47730c(0x897)](_0x4100ac[_0x47730c(0x746)]),_0x4100ac['height']=Math['round'](_0x4100ac[_0x47730c(0x689)]),_0x4100ac;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x7d2)]=Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2bf)],Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2bf)]=function(_0x338eb0,_0x1870ab,_0x1f9519){const _0x109c07=_0x2e6bc0;_0x1870ab=Math[_0x109c07(0x897)](_0x1870ab),_0x1f9519=Math[_0x109c07(0x897)](_0x1f9519),VisuMZ[_0x109c07(0x468)][_0x109c07(0x7d2)][_0x109c07(0x895)](this,_0x338eb0,_0x1870ab,_0x1f9519);},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1ae)]=function(){const _0x38b9dc=_0x2e6bc0;this[_0x38b9dc(0x215)]={'duration':0x0,'wholeDuration':0x0,'type':_0x38b9dc(0x6f2),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x38b9dc(0x53f)]['y'],'targetOpacity':this[_0x38b9dc(0x687)],'targetBackOpacity':this[_0x38b9dc(0x66f)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x384)]=function(){const _0x10b158=_0x2e6bc0;if(!this[_0x10b158(0x215)])return;if(this['_coreEasing'][_0x10b158(0x69d)]<=0x0)return;this['x']=this[_0x10b158(0x5c3)](this['x'],this[_0x10b158(0x215)][_0x10b158(0x74d)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x10b158(0x215)][_0x10b158(0x4d6)]),this[_0x10b158(0x53f)]['x']=this[_0x10b158(0x5c3)](this[_0x10b158(0x53f)]['x'],this[_0x10b158(0x215)][_0x10b158(0x678)]),this[_0x10b158(0x53f)]['y']=this['applyCoreEasing'](this[_0x10b158(0x53f)]['y'],this[_0x10b158(0x215)][_0x10b158(0x1f5)]),this['opacity']=this[_0x10b158(0x5c3)](this[_0x10b158(0x687)],this[_0x10b158(0x215)]['targetOpacity']),this[_0x10b158(0x66f)]=this[_0x10b158(0x5c3)](this[_0x10b158(0x66f)],this['_coreEasing'][_0x10b158(0x24a)]),this[_0x10b158(0x58d)]=this[_0x10b158(0x5c3)](this['contentsOpacity'],this[_0x10b158(0x215)][_0x10b158(0x4ba)]),this[_0x10b158(0x215)][_0x10b158(0x69d)]--;},Window_Base['prototype'][_0x2e6bc0(0x5c3)]=function(_0xd74f51,_0x2d2a4d){const _0x1f6422=_0x2e6bc0;if(!this['_coreEasing'])return _0x2d2a4d;const _0x3bb3d6=this[_0x1f6422(0x215)][_0x1f6422(0x69d)],_0x5250ba=this[_0x1f6422(0x215)][_0x1f6422(0x6a7)],_0xa91d9d=this[_0x1f6422(0x726)]((_0x5250ba-_0x3bb3d6)/_0x5250ba),_0xeadaed=this[_0x1f6422(0x726)]((_0x5250ba-_0x3bb3d6+0x1)/_0x5250ba),_0xeb52c3=(_0xd74f51-_0x2d2a4d*_0xa91d9d)/(0x1-_0xa91d9d);return _0xeb52c3+(_0x2d2a4d-_0xeb52c3)*_0xeadaed;},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x726)]=function(_0x165ad4){const _0x893250=_0x2e6bc0;if(!this['_coreEasing'])return _0x165ad4;return VisuMZ['ApplyEasing'](_0x165ad4,this[_0x893250(0x215)][_0x893250(0x764)]||_0x893250(0x6f2));},Window_Base['prototype'][_0x2e6bc0(0x4eb)]=function(_0x416248,_0x2d97bf){const _0x57a1ce=_0x2e6bc0;if(!this[_0x57a1ce(0x215)])return;this['x']=this[_0x57a1ce(0x215)][_0x57a1ce(0x74d)],this['y']=this['_coreEasing'][_0x57a1ce(0x4d6)],this['scale']['x']=this[_0x57a1ce(0x215)]['targetScaleX'],this[_0x57a1ce(0x53f)]['y']=this['_coreEasing'][_0x57a1ce(0x1f5)],this[_0x57a1ce(0x687)]=this[_0x57a1ce(0x215)][_0x57a1ce(0x21e)],this['backOpacity']=this[_0x57a1ce(0x215)]['targetBackOpacity'],this[_0x57a1ce(0x58d)]=this[_0x57a1ce(0x215)][_0x57a1ce(0x4ba)],this['setupCoreEasing'](_0x416248,_0x2d97bf,this['x'],this['y'],this[_0x57a1ce(0x53f)]['x'],this['scale']['y'],this[_0x57a1ce(0x687)],this[_0x57a1ce(0x66f)],this[_0x57a1ce(0x58d)]);},Window_Base[_0x2e6bc0(0x5e2)]['setupCoreEasing']=function(_0x44ad05,_0x25aea7,_0x4ce7cc,_0x488faf,_0x1e6d8f,_0x5ef60d,_0x574581,_0x625754,_0x523947){const _0x1a19b2=_0x2e6bc0;this[_0x1a19b2(0x215)]={'duration':_0x44ad05,'wholeDuration':_0x44ad05,'type':_0x25aea7,'targetX':_0x4ce7cc,'targetY':_0x488faf,'targetScaleX':_0x1e6d8f,'targetScaleY':_0x5ef60d,'targetOpacity':_0x574581,'targetBackOpacity':_0x625754,'targetContentsOpacity':_0x523947};},Window_Base[_0x2e6bc0(0x5e2)]['drawCurrencyValue']=function(_0x4cf498,_0x545cd0,_0x95b60b,_0x330690,_0x284f3e){const _0x7ffaf4=_0x2e6bc0;this[_0x7ffaf4(0x5f3)](),this['contents'][_0x7ffaf4(0x135)]=VisuMZ[_0x7ffaf4(0x468)][_0x7ffaf4(0x6ef)][_0x7ffaf4(0x211)][_0x7ffaf4(0x48e)];const _0x57197f=VisuMZ[_0x7ffaf4(0x468)][_0x7ffaf4(0x6ef)][_0x7ffaf4(0x211)][_0x7ffaf4(0x2fe)];if(_0x57197f>0x0&&_0x545cd0===TextManager[_0x7ffaf4(0x401)]){const _0x374832=_0x330690+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x7ffaf4(0x4d7)](_0x57197f,_0x95b60b+(_0x284f3e-ImageManager[_0x7ffaf4(0x503)]),_0x374832),_0x284f3e-=ImageManager[_0x7ffaf4(0x503)]+0x4;}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x7ffaf4(0x41f)](_0x545cd0,_0x95b60b,_0x330690,_0x284f3e,'right'),_0x284f3e-=this['textWidth'](_0x545cd0)+0x6;this[_0x7ffaf4(0x42f)]();const _0x4dc3d5=this[_0x7ffaf4(0x66c)](this['_digitGrouping']?VisuMZ[_0x7ffaf4(0x35b)](_0x4cf498):_0x4cf498);_0x4dc3d5>_0x284f3e?this[_0x7ffaf4(0x41f)](VisuMZ[_0x7ffaf4(0x468)]['Settings']['Gold'][_0x7ffaf4(0x185)],_0x95b60b,_0x330690,_0x284f3e,_0x7ffaf4(0x31d)):this[_0x7ffaf4(0x41f)](_0x4cf498,_0x95b60b,_0x330690,_0x284f3e,_0x7ffaf4(0x31d)),this[_0x7ffaf4(0x5f3)]();},Window_Base[_0x2e6bc0(0x5e2)]['drawIconBySize']=function(_0x31a690,_0x271da7,_0x4a2a27,_0x3a0ca9,_0x3d95a3){const _0x50d4e8=_0x2e6bc0,_0x4a1c2b=ImageManager['loadSystem'](_0x50d4e8(0x6d0)),_0x52ee2f=ImageManager['iconWidth'],_0x400ee8=ImageManager['iconHeight'],_0x2a9575=_0x31a690%0x10*_0x52ee2f,_0x589e21=Math[_0x50d4e8(0x3ff)](_0x31a690/0x10)*_0x400ee8,_0x4cb495=_0x3a0ca9,_0x199c10=_0x3a0ca9;this[_0x50d4e8(0x267)][_0x50d4e8(0x583)][_0x50d4e8(0x39c)]=_0x3d95a3,this[_0x50d4e8(0x267)]['blt'](_0x4a1c2b,_0x2a9575,_0x589e21,_0x52ee2f,_0x400ee8,_0x271da7,_0x4a2a27,_0x4cb495,_0x199c10),this[_0x50d4e8(0x267)]['_context'][_0x50d4e8(0x39c)]=!![];},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x24c)]=function(_0x4c6cce,_0x343463,_0x346fee,_0x24340b,_0x2210ec,_0xd9e3f){const _0x3f7c5c=_0x2e6bc0,_0xb16ea4=Math[_0x3f7c5c(0x3ff)]((_0x346fee-0x2)*_0x24340b),_0x27b506=Sprite_Gauge[_0x3f7c5c(0x5e2)][_0x3f7c5c(0x2f6)][_0x3f7c5c(0x895)](this),_0x430944=_0x343463+this[_0x3f7c5c(0x1ec)]()-_0x27b506-0x2;this[_0x3f7c5c(0x267)][_0x3f7c5c(0x762)](_0x4c6cce,_0x430944,_0x346fee,_0x27b506,ColorManager[_0x3f7c5c(0x5bd)]()),this[_0x3f7c5c(0x267)][_0x3f7c5c(0x44d)](_0x4c6cce+0x1,_0x430944+0x1,_0xb16ea4,_0x27b506-0x2,_0x2210ec,_0xd9e3f);},Window_Scrollable[_0x2e6bc0(0x51c)]={'enabled':VisuMZ['CoreEngine'][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x7b2)]??!![],'thickness':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x1e4)]??0x2,'offset':VisuMZ['CoreEngine'][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x1b7)]??0x2,'bodyColor':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)]['Window'][_0x2e6bc0(0x22d)]??0x0,'offColor':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x3ab)]??0x7,'offOpacity':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x2d4)]??0x80},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x334)]=function(){const _0x1b411b=_0x2e6bc0;return Window_Scrollable[_0x1b411b(0x51c)][_0x1b411b(0x21b)]&&Window_Scrollable['SCROLLBAR'][_0x1b411b(0x3af)]>0x0;},VisuMZ['CoreEngine'][_0x2e6bc0(0x2c2)]=Window_Base[_0x2e6bc0(0x5e2)]['createContents'],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x8bd)]=function(){const _0x473179=_0x2e6bc0;VisuMZ['CoreEngine'][_0x473179(0x2c2)]['call'](this),this[_0x473179(0x4e8)](),this[_0x473179(0x139)](!![]),this['setupScrollBarBitmap'](![]);},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4e8)]=function(){const _0x4d39a2=_0x2e6bc0;if(!this[_0x4d39a2(0x334)]())return;if(this[_0x4d39a2(0x5d5)]||this['_scrollBarVert'])return;this[_0x4d39a2(0x219)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x4d39a2(0x27b)]=new Sprite(),this['addChild'](this[_0x4d39a2(0x5d5)]),this[_0x4d39a2(0x6e8)](this['_scrollBarVert']);},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x139)]=function(_0x5f410a){const _0x258128=_0x2e6bc0,_0x4bae1c=_0x5f410a?this[_0x258128(0x5d5)]:this[_0x258128(0x27b)];if(!_0x4bae1c)return;const _0x353968=Window_Scrollable['SCROLLBAR'],_0x4f1c5b=_0x353968[_0x258128(0x3af)],_0x4a836c=_0x5f410a?this[_0x258128(0x78c)]-_0x4f1c5b*0x2:_0x4f1c5b,_0x5c5e5f=_0x5f410a?_0x4f1c5b:this[_0x258128(0x463)]-_0x4f1c5b*0x2;_0x4bae1c[_0x258128(0x253)]=new Bitmap(_0x4a836c,_0x5c5e5f),_0x4bae1c['setFrame'](0x0,0x0,_0x4a836c,_0x5c5e5f),this['updateScrollBarPosition'](_0x5f410a);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x876)]=Window_Base['prototype']['destroyContents'],Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x70c)]=function(){const _0x4c2b51=_0x2e6bc0;VisuMZ[_0x4c2b51(0x468)][_0x4c2b51(0x876)][_0x4c2b51(0x895)](this),this[_0x4c2b51(0x6d4)]();},Window_Base['prototype'][_0x2e6bc0(0x6d4)]=function(){const _0x46d994=_0x2e6bc0,_0x5ed1b9=[this[_0x46d994(0x5d5)],this[_0x46d994(0x27b)]];for(const _0x1fab65 of _0x5ed1b9){if(_0x1fab65&&_0x1fab65['bitmap'])_0x1fab65['bitmap'][_0x46d994(0x1a5)]();}},VisuMZ[_0x2e6bc0(0x468)]['Window_Scrollable_update']=Window_Scrollable['prototype'][_0x2e6bc0(0x645)],Window_Scrollable['prototype'][_0x2e6bc0(0x645)]=function(){const _0x4a6fd0=_0x2e6bc0;VisuMZ[_0x4a6fd0(0x468)][_0x4a6fd0(0x87c)][_0x4a6fd0(0x895)](this),this['updateScrollBars']();},Window_Scrollable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7f3)]=function(){const _0x3d70e8=_0x2e6bc0;this['updateScrollBarVisibility'](),this[_0x3d70e8(0x59d)](!![]),this[_0x3d70e8(0x59d)](![]),this[_0x3d70e8(0x4fb)](!![]),this[_0x3d70e8(0x4fb)](![]);},Window_Scrollable['prototype'][_0x2e6bc0(0x3a5)]=function(){const _0x4229ce=_0x2e6bc0,_0x10fbaa=[this['_scrollBarHorz'],this[_0x4229ce(0x27b)]];for(const _0x24998f of _0x10fbaa){_0x24998f&&(_0x24998f[_0x4229ce(0x510)]=this[_0x4229ce(0x334)]()&&this[_0x4229ce(0x482)]());}},Window_Scrollable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x59d)]=function(_0x281e78){const _0x5c16f0=_0x2e6bc0;if(!this['_lastScrollBarValues'])return;const _0x337715=this[_0x5c16f0(0x36e)](_0x281e78),_0x22c82a=this['maxScrollbar'](_0x281e78),_0x313451=_0x281e78?_0x5c16f0(0x651):'vert',_0x3cce1c=_0x281e78?_0x5c16f0(0x48f):_0x5c16f0(0x545);(this['_lastScrollBarValues'][_0x313451]!==_0x337715||this[_0x5c16f0(0x219)][_0x3cce1c]!==_0x22c82a)&&(this[_0x5c16f0(0x219)][_0x313451]=_0x337715,this['_lastScrollBarValues'][_0x3cce1c]=_0x22c82a,this['refreshScrollBarBitmap'](_0x281e78,_0x337715,_0x22c82a));},Window_Scrollable[_0x2e6bc0(0x5e2)]['scrollbar']=function(_0x5f3318){const _0x3605e8=_0x2e6bc0;if(this[_0x3605e8(0x489)]!==undefined)return _0x5f3318?this[_0x3605e8(0x1b6)]():this[_0x3605e8(0x27d)]['y'];return _0x5f3318?this['scrollX']():this[_0x3605e8(0x737)]();},Window_Scrollable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x35d)]=function(_0x7699b8){const _0x41ad28=_0x2e6bc0;if(this[_0x41ad28(0x489)]!==undefined)return _0x7699b8?this[_0x41ad28(0x58a)]():Math[_0x41ad28(0x56f)](0x0,this[_0x41ad28(0x489)]-this[_0x41ad28(0x463)]);return _0x7699b8?this[_0x41ad28(0x58a)]():this[_0x41ad28(0x377)]();},Window_Scrollable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7ad)]=function(){const _0x50dfad=_0x2e6bc0;if(this[_0x50dfad(0x489)]!==undefined)return Math[_0x50dfad(0x56f)](0x0,this['_allTextHeight']);return this['overallHeight']();},Window_Scrollable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x416)]=function(_0x448732,_0x1d0178,_0x3b5520){const _0x4244fc=_0x2e6bc0,_0x2e1cbc=_0x448732?this[_0x4244fc(0x5d5)]:this[_0x4244fc(0x27b)];if(!_0x2e1cbc)return;if(!_0x2e1cbc[_0x4244fc(0x253)])return;const _0x852cde=_0x2e1cbc['bitmap'];_0x852cde['clear']();if(_0x3b5520<=0x0)return;const _0x3667eb=_0x448732?this['innerWidth']/this[_0x4244fc(0x42b)]():this[_0x4244fc(0x463)]/this['scrollbarHeight'](),_0x5cb438=_0x448732?Math['round'](_0x1d0178*_0x3667eb):0x0,_0x3b4da7=_0x448732?0x0:Math[_0x4244fc(0x897)](_0x1d0178*_0x3667eb),_0x3945fe=_0x448732?Math[_0x4244fc(0x897)](_0x852cde[_0x4244fc(0x746)]*_0x3667eb):_0x852cde[_0x4244fc(0x746)],_0x2e2b6a=_0x448732?_0x852cde['height']:Math['round'](_0x852cde['height']*_0x3667eb),_0x1df7f7=Window_Scrollable[_0x4244fc(0x51c)],_0x10b66a=ColorManager[_0x4244fc(0x131)](_0x1df7f7[_0x4244fc(0x732)]),_0x24a0d6=ColorManager[_0x4244fc(0x131)](_0x1df7f7[_0x4244fc(0x773)]),_0x4ff92a=_0x1df7f7[_0x4244fc(0x263)];_0x852cde[_0x4244fc(0x462)]=_0x4ff92a,_0x852cde['fillAll'](_0x10b66a),_0x852cde['paintOpacity']=0xff,_0x852cde[_0x4244fc(0x762)](_0x5cb438,_0x3b4da7,_0x3945fe,_0x2e2b6a,_0x24a0d6);},Window_Base['prototype']['updateScrollBarPosition']=function(_0x423913){const _0x5835d4=_0x2e6bc0,_0x3be156=_0x423913?this[_0x5835d4(0x5d5)]:this[_0x5835d4(0x27b)];if(!_0x3be156)return;const _0x40b8e7=Window_Scrollable[_0x5835d4(0x51c)],_0x26fc99=_0x40b8e7['thickness'],_0x3e85a2=_0x40b8e7[_0x5835d4(0x736)];if(!_0x3be156[_0x5835d4(0x2f9)])return;_0x3be156['x']=this[_0x5835d4(0x460)]+(_0x423913?_0x26fc99:this[_0x5835d4(0x78c)]+_0x3e85a2),_0x3be156['y']=this[_0x5835d4(0x460)]+(_0x423913?this[_0x5835d4(0x463)]+_0x3e85a2:_0x26fc99);},Window_Selectable['prototype'][_0x2e6bc0(0x24f)]=function(_0x535f44){const _0x4ea94=_0x2e6bc0;let _0x4d02db=this['index']();const _0x51ff0b=this[_0x4ea94(0x67e)](),_0x56ceba=this['maxCols']();if(this[_0x4ea94(0x2ca)]()&&(_0x4d02db<_0x51ff0b||_0x535f44&&_0x56ceba===0x1)){_0x4d02db+=_0x56ceba;if(_0x4d02db>=_0x51ff0b)_0x4d02db=_0x51ff0b-0x1;this[_0x4ea94(0x8ae)](_0x4d02db);}else!this[_0x4ea94(0x2ca)]()&&((_0x4d02db<_0x51ff0b-_0x56ceba||_0x535f44&&_0x56ceba===0x1)&&this['smoothSelect']((_0x4d02db+_0x56ceba)%_0x51ff0b));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6e3)]=Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x24f)],Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x24f)]=function(_0x1fc221){const _0x27dc84=_0x2e6bc0;this[_0x27dc84(0x2ca)]()&&_0x1fc221&&this[_0x27dc84(0x4ef)]()===0x1&&this[_0x27dc84(0x87d)]()===this[_0x27dc84(0x67e)]()-0x1?this[_0x27dc84(0x8ae)](0x0):VisuMZ[_0x27dc84(0x468)][_0x27dc84(0x6e3)][_0x27dc84(0x895)](this,_0x1fc221);},Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x13d)]=function(_0x105990){const _0x196c2e=_0x2e6bc0;let _0x7f0c47=Math[_0x196c2e(0x56f)](0x0,this[_0x196c2e(0x87d)]());const _0x46f409=this[_0x196c2e(0x67e)](),_0x3697c5=this['maxCols']();if(this[_0x196c2e(0x2ca)]()&&_0x7f0c47>0x0||_0x105990&&_0x3697c5===0x1){_0x7f0c47-=_0x3697c5;if(_0x7f0c47<=0x0)_0x7f0c47=0x0;this[_0x196c2e(0x8ae)](_0x7f0c47);}else!this[_0x196c2e(0x2ca)]()&&((_0x7f0c47>=_0x3697c5||_0x105990&&_0x3697c5===0x1)&&this[_0x196c2e(0x8ae)]((_0x7f0c47-_0x3697c5+_0x46f409)%_0x46f409));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x60d)]=Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x13d)],Window_Selectable['prototype'][_0x2e6bc0(0x13d)]=function(_0x984cc1){const _0x305b56=_0x2e6bc0;this[_0x305b56(0x2ca)]()&&_0x984cc1&&this[_0x305b56(0x4ef)]()===0x1&&this[_0x305b56(0x87d)]()===0x0?this['smoothSelect'](this[_0x305b56(0x67e)]()-0x1):VisuMZ[_0x305b56(0x468)][_0x305b56(0x60d)][_0x305b56(0x895)](this,_0x984cc1);},Window_Selectable[_0x2e6bc0(0x5e2)]['isUseModernControls']=function(){const _0x25c5f7=_0x2e6bc0;return VisuMZ[_0x25c5f7(0x468)]['Settings'][_0x25c5f7(0x818)][_0x25c5f7(0x4e2)];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2ef)]=Window_Selectable['prototype'][_0x2e6bc0(0x249)],Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x249)]=function(){const _0x31dde5=_0x2e6bc0;this[_0x31dde5(0x2ca)]()?(this[_0x31dde5(0x7c5)](),this[_0x31dde5(0x7a4)]()):VisuMZ[_0x31dde5(0x468)][_0x31dde5(0x2ef)][_0x31dde5(0x895)](this);},Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6df)]=function(){return!![];},Window_Selectable['prototype'][_0x2e6bc0(0x7c5)]=function(){const _0x196977=_0x2e6bc0;if(this[_0x196977(0x8c1)]()){const _0x310e8b=this[_0x196977(0x87d)]();Input[_0x196977(0x163)]('down')&&(Input[_0x196977(0x753)](_0x196977(0x2f3))&&this[_0x196977(0x6df)]()?this['cursorPagedown']():this['cursorDown'](Input['isTriggered']('down'))),Input[_0x196977(0x163)]('up')&&(Input[_0x196977(0x753)]('shift')&&this['allowShiftScrolling']()?this['cursorPageup']():this[_0x196977(0x13d)](Input['isTriggered']('up'))),Input['isRepeated'](_0x196977(0x31d))&&this['cursorRight'](Input[_0x196977(0x443)](_0x196977(0x31d))),Input['isRepeated'](_0x196977(0x8b4))&&this[_0x196977(0x1db)](Input['isTriggered']('left')),!this['isHandled'](_0x196977(0x53a))&&Input[_0x196977(0x163)](_0x196977(0x53a))&&this[_0x196977(0x49d)](),!this[_0x196977(0x19f)](_0x196977(0x8a5))&&Input['isRepeated'](_0x196977(0x8a5))&&this['cursorPageup'](),this['index']()!==_0x310e8b&&this[_0x196977(0x405)]();}},Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7a4)]=function(){const _0x33ec14=_0x2e6bc0;if(this[_0x33ec14(0x8c1)]()){const _0x13bbef=this[_0x33ec14(0x87d)]();Input[_0x33ec14(0x443)](_0x33ec14(0x207))&&this[_0x33ec14(0x8ae)](Math[_0x33ec14(0x69a)](this[_0x33ec14(0x87d)](),0x0)),Input[_0x33ec14(0x443)](_0x33ec14(0x1c6))&&this[_0x33ec14(0x8ae)](Math[_0x33ec14(0x56f)](this[_0x33ec14(0x87d)](),this[_0x33ec14(0x67e)]()-0x1)),this['index']()!==_0x13bbef&&this[_0x33ec14(0x405)]();}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x3c2)]=Window_Selectable[_0x2e6bc0(0x5e2)]['processTouch'],Window_Selectable[_0x2e6bc0(0x5e2)]['processTouch']=function(){const _0x3fcede=_0x2e6bc0;this[_0x3fcede(0x2ca)]()?this[_0x3fcede(0x83e)]():VisuMZ[_0x3fcede(0x468)][_0x3fcede(0x3c2)][_0x3fcede(0x895)](this);},Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x83e)]=function(){const _0x100e95=_0x2e6bc0;VisuMZ[_0x100e95(0x468)][_0x100e95(0x3c2)][_0x100e95(0x895)](this);},Window_Selectable[_0x2e6bc0(0x5e2)]['colSpacing']=function(){const _0x4ab502=_0x2e6bc0;return VisuMZ[_0x4ab502(0x468)][_0x4ab502(0x6ef)][_0x4ab502(0x76e)][_0x4ab502(0x1ba)];},Window_Selectable[_0x2e6bc0(0x5e2)]['rowSpacing']=function(){const _0x48b695=_0x2e6bc0;return VisuMZ[_0x48b695(0x468)]['Settings'][_0x48b695(0x76e)][_0x48b695(0x3d2)];},Window_Selectable[_0x2e6bc0(0x5e2)]['itemHeight']=function(){const _0x1d6800=_0x2e6bc0;return Window_Scrollable[_0x1d6800(0x5e2)][_0x1d6800(0x33c)][_0x1d6800(0x895)](this)+VisuMZ[_0x1d6800(0x468)][_0x1d6800(0x6ef)][_0x1d6800(0x76e)][_0x1d6800(0x2ed)];;},VisuMZ[_0x2e6bc0(0x468)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1a2)],Window_Selectable[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1a2)]=function(_0x132c5e){const _0x28ef14=_0x2e6bc0,_0x210900=VisuMZ[_0x28ef14(0x468)][_0x28ef14(0x6ef)][_0x28ef14(0x76e)];if(_0x210900[_0x28ef14(0x694)]===![])return;_0x210900['DrawItemBackgroundJS']?_0x210900[_0x28ef14(0x78f)][_0x28ef14(0x895)](this,_0x132c5e):VisuMZ[_0x28ef14(0x468)][_0x28ef14(0x226)][_0x28ef14(0x895)](this,_0x132c5e);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x899)]=Window_Gold['prototype'][_0x2e6bc0(0x3bd)],Window_Gold[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)]=function(){const _0x20d1d9=_0x2e6bc0;this['isItemStyle']()?this['drawGoldItemStyle']():VisuMZ[_0x20d1d9(0x468)][_0x20d1d9(0x899)][_0x20d1d9(0x895)](this);},Window_Gold['prototype'][_0x2e6bc0(0x3d1)]=function(){const _0x3b1777=_0x2e6bc0;if(TextManager[_0x3b1777(0x401)]!==this['currencyUnit']())return![];return VisuMZ[_0x3b1777(0x468)][_0x3b1777(0x6ef)]['Gold'][_0x3b1777(0x38b)];},Window_Gold[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x15b)]=function(){const _0x1410fa=_0x2e6bc0;this[_0x1410fa(0x5f3)](),this[_0x1410fa(0x267)][_0x1410fa(0x1f1)](),this['contents']['fontSize']=VisuMZ['CoreEngine']['Settings'][_0x1410fa(0x211)][_0x1410fa(0x48e)];const _0xde7325=VisuMZ[_0x1410fa(0x468)][_0x1410fa(0x6ef)][_0x1410fa(0x211)][_0x1410fa(0x2fe)],_0x4ce3fd=this[_0x1410fa(0x82c)](0x0);if(_0xde7325>0x0){const _0x25edb3=ImageManager[_0x1410fa(0x17b)]||0x20,_0x92f867=_0x25edb3-ImageManager[_0x1410fa(0x503)],_0x5acd01=_0x4ce3fd['y']+(this[_0x1410fa(0x1ec)]()-ImageManager[_0x1410fa(0x594)])/0x2;this[_0x1410fa(0x4d7)](_0xde7325,_0x4ce3fd['x']+Math[_0x1410fa(0x539)](_0x92f867/0x2),_0x5acd01);const _0xbe5625=_0x25edb3+0x4;_0x4ce3fd['x']+=_0xbe5625,_0x4ce3fd[_0x1410fa(0x746)]-=_0xbe5625;}this[_0x1410fa(0x735)](ColorManager[_0x1410fa(0x23f)]()),this[_0x1410fa(0x41f)](this[_0x1410fa(0x401)](),_0x4ce3fd['x'],_0x4ce3fd['y'],_0x4ce3fd[_0x1410fa(0x746)],'left');const _0x32821b=this[_0x1410fa(0x66c)](this[_0x1410fa(0x401)]())+0x6;;_0x4ce3fd['x']+=_0x32821b,_0x4ce3fd['width']-=_0x32821b,this[_0x1410fa(0x42f)]();const _0x48358d=this[_0x1410fa(0x523)](),_0xaa6298=this[_0x1410fa(0x66c)](this[_0x1410fa(0x2a5)]?VisuMZ['GroupDigits'](this[_0x1410fa(0x523)]()):this[_0x1410fa(0x523)]());_0xaa6298>_0x4ce3fd[_0x1410fa(0x746)]?this['drawText'](VisuMZ[_0x1410fa(0x468)][_0x1410fa(0x6ef)][_0x1410fa(0x211)][_0x1410fa(0x185)],_0x4ce3fd['x'],_0x4ce3fd['y'],_0x4ce3fd[_0x1410fa(0x746)],_0x1410fa(0x31d)):this[_0x1410fa(0x41f)](this[_0x1410fa(0x523)](),_0x4ce3fd['x'],_0x4ce3fd['y'],_0x4ce3fd[_0x1410fa(0x746)],_0x1410fa(0x31d)),this[_0x1410fa(0x5f3)]();},Window_StatusBase[_0x2e6bc0(0x5e2)]['drawParamText']=function(_0x555fdd,_0x46d5b0,_0x3a843e,_0x492e1e,_0x276f7e){const _0x53ee1c=_0x2e6bc0;_0x492e1e=String(_0x492e1e||'')[_0x53ee1c(0x63e)]();if(VisuMZ[_0x53ee1c(0x468)][_0x53ee1c(0x6ef)]['Param'][_0x53ee1c(0x6b2)]){const _0x262157=VisuMZ[_0x53ee1c(0x2da)](_0x492e1e);if(_0x276f7e)this[_0x53ee1c(0x6ca)](_0x262157,_0x555fdd,_0x46d5b0,this['gaugeLineHeight']()),_0x3a843e-=this[_0x53ee1c(0x671)]()+0x2,_0x555fdd+=this['gaugeLineHeight']()+0x2;else{const _0x3d5a88=ImageManager[_0x53ee1c(0x17b)]||0x20,_0x6cff6e=ImageManager['standardIconHeight']||0x20,_0xf0036a=_0x3d5a88-ImageManager[_0x53ee1c(0x503)],_0x2acfa1=_0x6cff6e-ImageManager['iconHeight'];let _0x33b1b0=0x2,_0x22d2f8=0x2;this[_0x53ee1c(0x1ec)]()!==0x24&&(_0x22d2f8=Math['floor']((this[_0x53ee1c(0x1ec)]()-_0x6cff6e)/0x2));const _0x10f2c9=_0x555fdd+Math[_0x53ee1c(0x3ff)](_0xf0036a/0x2)+_0x33b1b0,_0x54073c=_0x46d5b0+Math['floor'](_0x2acfa1/0x2)+_0x22d2f8;this['drawIcon'](_0x262157,_0x10f2c9,_0x54073c),_0x3a843e-=_0x3d5a88+0x4,_0x555fdd+=_0x3d5a88+0x4;}}const _0x50ce61=TextManager[_0x53ee1c(0x85c)](_0x492e1e);this[_0x53ee1c(0x5f3)](),this[_0x53ee1c(0x735)](ColorManager[_0x53ee1c(0x23f)]()),_0x276f7e?(this['contents'][_0x53ee1c(0x135)]=this[_0x53ee1c(0x441)](),this[_0x53ee1c(0x267)][_0x53ee1c(0x41f)](_0x50ce61,_0x555fdd,_0x46d5b0,_0x3a843e,this[_0x53ee1c(0x671)](),_0x53ee1c(0x8b4))):this[_0x53ee1c(0x41f)](_0x50ce61,_0x555fdd,_0x46d5b0,_0x3a843e),this[_0x53ee1c(0x5f3)]();},Window_StatusBase[_0x2e6bc0(0x5e2)]['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x2e6bc0(0x5e2)]['drawActorClass']=function(_0x474fa0,_0x5c9119,_0x45abb0,_0x1dd25f){const _0x3060fb=_0x2e6bc0;_0x1dd25f=_0x1dd25f||0xa8,this[_0x3060fb(0x42f)]();if(VisuMZ[_0x3060fb(0x468)][_0x3060fb(0x6ef)]['UI'][_0x3060fb(0x449)])this['drawTextEx'](_0x474fa0[_0x3060fb(0x7cd)]()[_0x3060fb(0x3d0)],_0x5c9119,_0x45abb0,_0x1dd25f);else{const _0x185cf0=_0x474fa0[_0x3060fb(0x7cd)]()['name'][_0x3060fb(0x20a)](/\\I\[(\d+)\]/gi,'');this[_0x3060fb(0x41f)](_0x185cf0,_0x5c9119,_0x45abb0,_0x1dd25f);}},Window_StatusBase['prototype'][_0x2e6bc0(0x12d)]=function(_0x5bca30,_0x2bab2a,_0x1f4382,_0xc7877e){const _0x3fbca7=_0x2e6bc0;_0xc7877e=_0xc7877e||0x10e,this[_0x3fbca7(0x42f)]();if(VisuMZ[_0x3fbca7(0x468)][_0x3fbca7(0x6ef)]['UI'][_0x3fbca7(0x106)])this[_0x3fbca7(0x42a)](_0x5bca30[_0x3fbca7(0x6fc)](),_0x2bab2a,_0x1f4382,_0xc7877e);else{const _0x55997a=_0x5bca30[_0x3fbca7(0x6fc)]()[_0x3fbca7(0x20a)](/\\I\[(\d+)\]/gi,'');this[_0x3fbca7(0x41f)](_0x5bca30[_0x3fbca7(0x6fc)](),_0x2bab2a,_0x1f4382,_0xc7877e);}},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x204)]=Window_StatusBase['prototype'][_0x2e6bc0(0x488)],Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x488)]=function(_0x236896,_0x4283de,_0x368e14){const _0xe26626=_0x2e6bc0;if(VisuMZ['CoreEngine'][_0xe26626(0x6ef)][_0xe26626(0x2fc)][_0xe26626(0x4a3)]===![])return;if(this[_0xe26626(0x5b9)]())this[_0xe26626(0x69b)](_0x236896,_0x4283de,_0x368e14);VisuMZ[_0xe26626(0x468)][_0xe26626(0x204)][_0xe26626(0x895)](this,_0x236896,_0x4283de,_0x368e14);},Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5b9)]=function(){const _0x32f0ed=_0x2e6bc0;return VisuMZ[_0x32f0ed(0x468)][_0x32f0ed(0x6ef)]['UI'][_0x32f0ed(0x3bc)];},Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x69b)]=function(_0x377622,_0x6462a0,_0x3387b9){const _0x427396=_0x2e6bc0;if(!_0x377622)return;if(!_0x377622[_0x427396(0x4fd)]())return;const _0xedfb7d=0x80,_0xeb0f4b=_0x377622[_0x427396(0x1a0)]();let _0x286028=ColorManager['expGaugeColor1'](),_0x171fe8=ColorManager['expGaugeColor2']();_0xeb0f4b>=0x1&&(_0x286028=ColorManager[_0x427396(0x542)](),_0x171fe8=ColorManager[_0x427396(0x875)]()),this[_0x427396(0x24c)](_0x6462a0,_0x3387b9,_0xedfb7d,_0xeb0f4b,_0x286028,_0x171fe8);},Window_EquipStatus['prototype'][_0x2e6bc0(0x602)]=function(){const _0x31d559=_0x2e6bc0;let _0x1b529c=0x0;for(const _0x585671 of VisuMZ['CoreEngine']['Settings'][_0x31d559(0x2fc)]['DisplayedParams']){const _0x3161d5=this[_0x31d559(0x637)](),_0x59e237=this[_0x31d559(0x794)](_0x1b529c);this[_0x31d559(0x6c2)](_0x3161d5,_0x59e237,_0x585671),_0x1b529c++;}},Window_EquipStatus[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1dd)]=function(_0x4a8fb5,_0x200948,_0x3b07d2){const _0x404f72=_0x2e6bc0,_0x20ad3e=this[_0x404f72(0x7ab)]()-this['itemPadding']()*0x2;this['drawParamText'](_0x4a8fb5,_0x200948,_0x20ad3e,_0x3b07d2,![]);},Window_EquipStatus[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3b0)]=function(_0x3efa51,_0x24f200,_0x2777ca){const _0x4a4f41=_0x2e6bc0,_0x1c4f91=this[_0x4a4f41(0x234)]();this[_0x4a4f41(0x42f)](),this[_0x4a4f41(0x41f)](this[_0x4a4f41(0x32c)]['paramValueByName'](_0x2777ca,!![]),_0x3efa51,_0x24f200,_0x1c4f91,_0x4a4f41(0x31d));},Window_EquipStatus[_0x2e6bc0(0x5e2)]['drawRightArrow']=function(_0x47d854,_0x2421ed){const _0x148e32=_0x2e6bc0,_0x139b11=this['rightArrowWidth']();this[_0x148e32(0x735)](ColorManager[_0x148e32(0x23f)]());const _0x54c59b=VisuMZ[_0x148e32(0x468)][_0x148e32(0x6ef)]['UI']['ParamArrow'];this['drawText'](_0x54c59b,_0x47d854,_0x2421ed,_0x139b11,'center');},Window_EquipStatus[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x64f)]=function(_0x12fc06,_0x1b840f,_0x2766a7){const _0x3a70c4=_0x2e6bc0,_0x5a2cc8=this['paramWidth'](),_0x149f4d=this[_0x3a70c4(0x660)][_0x3a70c4(0x403)](_0x2766a7),_0x421c9c=_0x149f4d-this[_0x3a70c4(0x32c)][_0x3a70c4(0x403)](_0x2766a7);this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x421c9c)),this[_0x3a70c4(0x41f)](this[_0x3a70c4(0x660)][_0x3a70c4(0x403)](_0x2766a7,!![]),_0x12fc06,_0x1b840f,_0x5a2cc8,_0x3a70c4(0x31d));},VisuMZ[_0x2e6bc0(0x468)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x39e)],Window_EquipItem['prototype'][_0x2e6bc0(0x39e)]=function(_0x3e0511){const _0xa95706=_0x2e6bc0;return _0x3e0511&&this[_0xa95706(0x32c)]?this[_0xa95706(0x32c)][_0xa95706(0x2d7)](_0x3e0511):VisuMZ['CoreEngine'][_0xa95706(0x669)][_0xa95706(0x895)](this,_0x3e0511);},Window_StatusParams[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x67e)]=function(){const _0x5c20be=_0x2e6bc0;return VisuMZ[_0x5c20be(0x468)]['Settings']['Param'][_0x5c20be(0x641)][_0x5c20be(0x29e)];},Window_StatusParams[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6c2)]=function(_0x4c30db){const _0x535819=_0x2e6bc0,_0x2adc2=this['itemLineRect'](_0x4c30db),_0x41e517=VisuMZ[_0x535819(0x468)][_0x535819(0x6ef)][_0x535819(0x2fc)][_0x535819(0x641)][_0x4c30db],_0x37eb26=TextManager[_0x535819(0x85c)](_0x41e517),_0x187f18=this['_actor'][_0x535819(0x403)](_0x41e517,!![]);this[_0x535819(0x303)](_0x2adc2['x'],_0x2adc2['y'],0xa0,_0x41e517,![]),this[_0x535819(0x42f)](),this[_0x535819(0x41f)](_0x187f18,_0x2adc2['x']+0xa0,_0x2adc2['y'],0x3c,_0x535819(0x31d));};if(VisuMZ[_0x2e6bc0(0x468)]['Settings'][_0x2e6bc0(0x5c6)][_0x2e6bc0(0x458)]){VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x5c6)][_0x2e6bc0(0x593)]&&(Window_NameInput[_0x2e6bc0(0x12f)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0xf6)]=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0xdc800d){const _0x42904f=_0x2e6bc0;this[_0x42904f(0x5ca)]=this[_0x42904f(0x29a)](),VisuMZ[_0x42904f(0x468)]['Window_NameInput_initialize']['call'](this,_0xdc800d),this[_0x42904f(0x5ca)]===_0x42904f(0x4f7)?this['select'](0x0):(Input[_0x42904f(0x1f1)](),this[_0x42904f(0x533)]());},Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x29a)]=function(){const _0x3bf915=_0x2e6bc0;if(Input[_0x3bf915(0x565)]())return'default';return VisuMZ[_0x3bf915(0x468)][_0x3bf915(0x6ef)][_0x3bf915(0x5c6)][_0x3bf915(0x399)]||_0x3bf915(0x7c2);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x1fb)]=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5d0)],Window_NameInput[_0x2e6bc0(0x5e2)]['processHandling']=function(){const _0x371d27=_0x2e6bc0;if(!this[_0x371d27(0x482)]())return;if(!this['active'])return;if(this[_0x371d27(0x5ca)]===_0x371d27(0x7c2)&&Input[_0x371d27(0x2d9)]())this['switchModes'](_0x371d27(0x4f7));else{if(Input[_0x371d27(0x5b5)](_0x371d27(0x33f)))Input[_0x371d27(0x1f1)](),this[_0x371d27(0x2ae)]();else{if(Input['isTriggered'](_0x371d27(0x453)))Input['clear'](),this[_0x371d27(0x5ca)]===_0x371d27(0x7c2)?this[_0x371d27(0x338)](_0x371d27(0x4f7)):this[_0x371d27(0x338)](_0x371d27(0x7c2));else{if(this[_0x371d27(0x5ca)]==='keyboard')this['processKeyboardHandling']();else Input[_0x371d27(0x5b5)]('escape')?(Input[_0x371d27(0x1f1)](),this[_0x371d27(0x338)](_0x371d27(0x7c2))):VisuMZ[_0x371d27(0x468)][_0x371d27(0x1fb)][_0x371d27(0x895)](this);}}}},VisuMZ[_0x2e6bc0(0x468)]['Window_NameInput_processTouch']=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x534)],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x534)]=function(){const _0x50c3c1=_0x2e6bc0;if(!this[_0x50c3c1(0x68e)]())return;if(this['_mode']===_0x50c3c1(0x7c2)){if(TouchInput[_0x50c3c1(0x443)]()&&this[_0x50c3c1(0x14b)]())this[_0x50c3c1(0x338)](_0x50c3c1(0x4f7));else TouchInput['isCancelled']()&&this[_0x50c3c1(0x338)](_0x50c3c1(0x4f7));}else VisuMZ[_0x50c3c1(0x468)][_0x50c3c1(0x6ae)][_0x50c3c1(0x895)](this);},Window_NameInput['prototype']['processKeyboardHandling']=function(){const _0x4ee362=_0x2e6bc0;if(Input[_0x4ee362(0x5b5)](_0x4ee362(0x5a0)))Input[_0x4ee362(0x1f1)](),this['onNameOk']();else{if(Input[_0x4ee362(0x541)]!==undefined){let _0x185397=Input[_0x4ee362(0x541)],_0x455ddc=_0x185397[_0x4ee362(0x29e)];for(let _0x48cb49=0x0;_0x48cb49<_0x455ddc;++_0x48cb49){this['_editWindow'][_0x4ee362(0x7f9)](_0x185397[_0x48cb49])?SoundManager[_0x4ee362(0x55f)]():SoundManager[_0x4ee362(0x665)]();}Input['clear']();}}},Window_NameInput[_0x2e6bc0(0x5e2)]['switchModes']=function(_0x59b66a){const _0x1168fb=_0x2e6bc0;let _0x1a59e1=this[_0x1168fb(0x5ca)];this[_0x1168fb(0x5ca)]=_0x59b66a,_0x1a59e1!==this['_mode']&&(this[_0x1168fb(0x3bd)](),SoundManager[_0x1168fb(0x55f)](),this['_mode']==='default'?this[_0x1168fb(0x1b5)](0x0):this[_0x1168fb(0x1b5)](-0x1));},VisuMZ[_0x2e6bc0(0x468)]['Window_NameInput_cursorDown']=Window_NameInput[_0x2e6bc0(0x5e2)]['cursorDown'],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x24f)]=function(_0x51aaa0){const _0x47ae12=_0x2e6bc0;if(this['_mode']==='keyboard'&&!Input[_0x47ae12(0x117)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x47ae12(0x468)][_0x47ae12(0x664)][_0x47ae12(0x895)](this,_0x51aaa0),this[_0x47ae12(0x338)]('default');},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x388)]=Window_NameInput[_0x2e6bc0(0x5e2)]['cursorUp'],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x13d)]=function(_0x57a8bd){const _0x3ef477=_0x2e6bc0;if(this[_0x3ef477(0x5ca)]===_0x3ef477(0x7c2)&&!Input[_0x3ef477(0x117)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3ef477(0x468)][_0x3ef477(0x388)][_0x3ef477(0x895)](this,_0x57a8bd),this[_0x3ef477(0x338)](_0x3ef477(0x4f7));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x839)]=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7f0)]=function(_0x3c4aba){const _0x1b27c5=_0x2e6bc0;if(this['_mode']===_0x1b27c5(0x7c2)&&!Input[_0x1b27c5(0x117)]())return;if(Input[_0x1b27c5(0x6d8)]())return;VisuMZ[_0x1b27c5(0x468)][_0x1b27c5(0x839)][_0x1b27c5(0x895)](this,_0x3c4aba),this[_0x1b27c5(0x338)](_0x1b27c5(0x4f7));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x566)]=Window_NameInput['prototype']['cursorLeft'],Window_NameInput[_0x2e6bc0(0x5e2)]['cursorLeft']=function(_0x3990ff){const _0x2dab3d=_0x2e6bc0;if(this[_0x2dab3d(0x5ca)]===_0x2dab3d(0x7c2)&&!Input[_0x2dab3d(0x117)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2dab3d(0x468)]['Window_NameInput_cursorLeft'][_0x2dab3d(0x895)](this,_0x3990ff),this['switchModes']('default');},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x543)]=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x49d)],Window_NameInput['prototype'][_0x2e6bc0(0x49d)]=function(){const _0x5d9c8f=_0x2e6bc0;if(this[_0x5d9c8f(0x5ca)]===_0x5d9c8f(0x7c2))return;if(Input[_0x5d9c8f(0x6d8)]())return;VisuMZ[_0x5d9c8f(0x468)][_0x5d9c8f(0x543)][_0x5d9c8f(0x895)](this),this[_0x5d9c8f(0x338)]('default');},VisuMZ[_0x2e6bc0(0x468)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x631)],Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x631)]=function(){const _0x333258=_0x2e6bc0;if(this[_0x333258(0x5ca)]===_0x333258(0x7c2))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x333258(0x468)]['Window_NameInput_cursorPageup'][_0x333258(0x895)](this),this[_0x333258(0x338)](_0x333258(0x4f7));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x170)]=Window_NameInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)],Window_NameInput['prototype'][_0x2e6bc0(0x3bd)]=function(){const _0x32c30a=_0x2e6bc0;if(this[_0x32c30a(0x5ca)]===_0x32c30a(0x7c2)){this[_0x32c30a(0x267)][_0x32c30a(0x1f1)](),this[_0x32c30a(0x63f)][_0x32c30a(0x1f1)](),this[_0x32c30a(0x42f)]();let _0x1227b7=VisuMZ['CoreEngine'][_0x32c30a(0x6ef)]['KeyboardInput'][_0x32c30a(0x3e0)][_0x32c30a(0x440)]('\x0a'),_0x479dda=_0x1227b7[_0x32c30a(0x29e)],_0x2bb52b=(this[_0x32c30a(0x463)]-_0x479dda*this['lineHeight']())/0x2;for(let _0x1e5bc4=0x0;_0x1e5bc4<_0x479dda;++_0x1e5bc4){let _0x39710e=_0x1227b7[_0x1e5bc4],_0x58f6ad=this[_0x32c30a(0x5ff)](_0x39710e)['width'],_0x157831=Math['floor']((this[_0x32c30a(0x267)]['width']-_0x58f6ad)/0x2);this[_0x32c30a(0x42a)](_0x39710e,_0x157831,_0x2bb52b),_0x2bb52b+=this[_0x32c30a(0x1ec)]();}}else VisuMZ[_0x32c30a(0x468)][_0x32c30a(0x170)]['call'](this);};};VisuMZ['CoreEngine'][_0x2e6bc0(0x6ba)]=Window_ShopSell[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x39e)],Window_ShopSell[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x39e)]=function(_0x5418fb){const _0x4087b9=_0x2e6bc0;return VisuMZ[_0x4087b9(0x468)]['Settings'][_0x4087b9(0x818)][_0x4087b9(0x178)]&&DataManager[_0x4087b9(0x4f3)](_0x5418fb)?![]:VisuMZ[_0x4087b9(0x468)][_0x4087b9(0x6ba)][_0x4087b9(0x895)](this,_0x5418fb);},Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2ca)]=function(){return![];};VisuMZ[_0x2e6bc0(0x468)]['Settings']['KeyboardInput'][_0x2e6bc0(0x6c0)]&&(VisuMZ['CoreEngine']['Window_NumberInput_start']=Window_NumberInput['prototype'][_0x2e6bc0(0x427)],Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x427)]=function(){const _0x535547=_0x2e6bc0;VisuMZ[_0x535547(0x468)][_0x535547(0x7d7)][_0x535547(0x895)](this),this['select'](this['_maxDigits']-0x1),Input['clear']();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x59f)]=Window_NumberInput['prototype'][_0x2e6bc0(0x507)],Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x507)]=function(){const _0x126dd4=_0x2e6bc0;if(!this[_0x126dd4(0x68e)]())return;if(Input[_0x126dd4(0x6d8)]())this[_0x126dd4(0x861)]();else{if(Input['isSpecialCode'](_0x126dd4(0x33f)))this[_0x126dd4(0x516)]();else{if(Input[_0x126dd4(0x44e)]===0x2e)this['processKeyboardDelete']();else{if(Input[_0x126dd4(0x44e)]===0x24)this['processKeyboardHome']();else Input['_inputSpecialKeyCode']===0x23?this[_0x126dd4(0x26d)]():VisuMZ[_0x126dd4(0x468)][_0x126dd4(0x59f)]['call'](this);}}}},Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x249)]=function(){const _0x1d73f9=_0x2e6bc0;if(!this[_0x1d73f9(0x8c1)]())return;Input['isNumpadPressed']()?this[_0x1d73f9(0x861)]():Window_Selectable[_0x1d73f9(0x5e2)][_0x1d73f9(0x249)][_0x1d73f9(0x895)](this);},Window_NumberInput['prototype'][_0x2e6bc0(0x7a4)]=function(){},Window_NumberInput['prototype'][_0x2e6bc0(0x861)]=function(){const _0xeccff1=_0x2e6bc0;if(String(this[_0xeccff1(0x677)])[_0xeccff1(0x29e)]>=this[_0xeccff1(0x681)])return;const _0xa42fec=Number(String(this['_number'])+Input[_0xeccff1(0x541)]);if(isNaN(_0xa42fec))return;this['_number']=_0xa42fec;const _0x2a4eb0='9'[_0xeccff1(0x1ca)](this[_0xeccff1(0x681)]);this['_number']=this['_number'][_0xeccff1(0x2eb)](0x0,_0x2a4eb0),Input[_0xeccff1(0x1f1)](),this['refresh'](),SoundManager['playCursor'](),this[_0xeccff1(0x1b5)](this[_0xeccff1(0x681)]-0x1);},Window_NumberInput['prototype'][_0x2e6bc0(0x516)]=function(){const _0x27a8b3=_0x2e6bc0;this['_number']=Number(String(this[_0x27a8b3(0x677)])[_0x27a8b3(0x3c1)](0x0,-0x1)),this[_0x27a8b3(0x677)]=Math[_0x27a8b3(0x56f)](0x0,this['_number']),Input[_0x27a8b3(0x1f1)](),this[_0x27a8b3(0x3bd)](),SoundManager[_0x27a8b3(0x6f1)](),this[_0x27a8b3(0x1b5)](this['_maxDigits']-0x1);},Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6fb)]=function(){const _0x5ea42f=_0x2e6bc0;this['_number']=Number(String(this[_0x5ea42f(0x677)])[_0x5ea42f(0xfb)](0x1)),this[_0x5ea42f(0x677)]=Math[_0x5ea42f(0x56f)](0x0,this[_0x5ea42f(0x677)]),Input[_0x5ea42f(0x1f1)](),this[_0x5ea42f(0x3bd)](),SoundManager[_0x5ea42f(0x6f1)](),this['select'](this[_0x5ea42f(0x681)]-0x1);},Window_NumberInput[_0x2e6bc0(0x5e2)]['processKeyboardHome']=function(){const _0x2b22fe=_0x2e6bc0;if(this[_0x2b22fe(0x87d)]()===0x0)return;Input[_0x2b22fe(0x1f1)](),this[_0x2b22fe(0x3bd)](),SoundManager[_0x2b22fe(0x6f1)](),this[_0x2b22fe(0x1b5)](0x0);},Window_NumberInput[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x26d)]=function(){const _0x79c1f4=_0x2e6bc0;if(this['index']()===this['_maxDigits']-0x1)return;Input[_0x79c1f4(0x1f1)](),this['refresh'](),SoundManager['playCursor'](),this[_0x79c1f4(0x1b5)](this[_0x79c1f4(0x681)]-0x1);});;VisuMZ['CoreEngine'][_0x2e6bc0(0x821)]=Window_MapName[_0x2e6bc0(0x5e2)]['refresh'],Window_MapName[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)]=function(){const _0x221d6d=_0x2e6bc0;VisuMZ[_0x221d6d(0x468)]['Settings'][_0x221d6d(0x818)][_0x221d6d(0x4d4)]?this[_0x221d6d(0x524)]():VisuMZ[_0x221d6d(0x468)]['Window_MapName_refresh'][_0x221d6d(0x895)](this);},Window_MapName[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x524)]=function(){const _0x85c75b=_0x2e6bc0;this['contents'][_0x85c75b(0x1f1)]();if($gameMap[_0x85c75b(0x387)]()){const _0x354dd8=this[_0x85c75b(0x78c)];this['drawBackground'](0x0,0x0,_0x354dd8,this[_0x85c75b(0x1ec)]());const _0x47b2bd=this[_0x85c75b(0x5ff)]($gameMap[_0x85c75b(0x387)]())[_0x85c75b(0x746)];this[_0x85c75b(0x42a)]($gameMap[_0x85c75b(0x387)](),Math[_0x85c75b(0x3ff)]((_0x354dd8-_0x47b2bd)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ['CoreEngine'][_0x2e6bc0(0x6ef)]['TitleCommandList'],Window_TitleCommand[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x65f)]=function(){const _0x1c9cb0=_0x2e6bc0;this[_0x1c9cb0(0x5c5)]();},Window_TitleCommand[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5c5)]=function(){const _0xaba41d=_0x2e6bc0;for(const _0xd38c6f of Window_TitleCommand['_commandList']){if(_0xd38c6f[_0xaba41d(0x1ef)][_0xaba41d(0x895)](this)){const _0x40751e=_0xd38c6f[_0xaba41d(0x76c)];let _0x4d314b=_0xd38c6f[_0xaba41d(0x154)];if(['',_0xaba41d(0x77b)][_0xaba41d(0x7fe)](_0x4d314b))_0x4d314b=_0xd38c6f[_0xaba41d(0x1d8)][_0xaba41d(0x895)](this);const _0x33a13a=_0xd38c6f['EnableJS'][_0xaba41d(0x895)](this),_0x16be1e=_0xd38c6f['ExtJS']['call'](this);this['addCommand'](_0x4d314b,_0x40751e,_0x33a13a,_0x16be1e),this[_0xaba41d(0x658)](_0x40751e,_0xd38c6f[_0xaba41d(0x612)][_0xaba41d(0x6e7)](this,_0x16be1e));}}},VisuMZ['CoreEngine']['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x490)],Window_TitleCommand[_0x2e6bc0(0x5e2)]['selectLast']=function(){const _0x102fd4=_0x2e6bc0;VisuMZ['CoreEngine']['Window_TitleCommand_selectLast'][_0x102fd4(0x895)](this);if(!Window_TitleCommand[_0x102fd4(0x6a9)])return;const _0x10a046=this['findSymbol'](Window_TitleCommand[_0x102fd4(0x6a9)]),_0x1c2a68=Math[_0x102fd4(0x3ff)](this[_0x102fd4(0x6ed)]()/0x2)-0x1;this[_0x102fd4(0x8ae)](_0x10a046),this[_0x102fd4(0x7ba)]>0x1&&(this['_scrollDuration']=0x1,this[_0x102fd4(0x7b5)]()),this[_0x102fd4(0x6fa)](_0x10a046-_0x1c2a68);},Window_GameEnd[_0x2e6bc0(0x4e0)]=VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)]['MenuLayout'][_0x2e6bc0(0x4bb)][_0x2e6bc0(0x1bf)],Window_GameEnd[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x65f)]=function(){const _0x1fb15e=_0x2e6bc0;this[_0x1fb15e(0x5c5)]();},Window_GameEnd[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x5c5)]=function(){const _0x3eb17b=_0x2e6bc0;for(const _0x310f96 of Window_GameEnd[_0x3eb17b(0x4e0)]){if(_0x310f96[_0x3eb17b(0x1ef)]['call'](this)){const _0x4e51a4=_0x310f96[_0x3eb17b(0x76c)];let _0x4cba60=_0x310f96[_0x3eb17b(0x154)];if(['','Untitled']['includes'](_0x4cba60))_0x4cba60=_0x310f96[_0x3eb17b(0x1d8)][_0x3eb17b(0x895)](this);const _0x26a29c=_0x310f96[_0x3eb17b(0x4fc)][_0x3eb17b(0x895)](this),_0xdebfff=_0x310f96[_0x3eb17b(0x3f5)][_0x3eb17b(0x895)](this);this[_0x3eb17b(0x72a)](_0x4cba60,_0x4e51a4,_0x26a29c,_0xdebfff),this[_0x3eb17b(0x658)](_0x4e51a4,_0x310f96['CallHandlerJS'][_0x3eb17b(0x6e7)](this,_0xdebfff));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x2e6bc0(0x5e2)]=Object[_0x2e6bc0(0x893)](Window_Base[_0x2e6bc0(0x5e2)]),Window_ButtonAssist[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c3)]=Window_ButtonAssist,Window_ButtonAssist[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(_0x1f8143){const _0xb225a1=_0x2e6bc0;this['_data']={},Window_Base[_0xb225a1(0x5e2)][_0xb225a1(0x571)][_0xb225a1(0x895)](this,_0x1f8143),this[_0xb225a1(0x52a)](VisuMZ[_0xb225a1(0x468)][_0xb225a1(0x6ef)]['ButtonAssist'][_0xb225a1(0x744)]||0x0),this[_0xb225a1(0x3bd)]();},Window_ButtonAssist[_0x2e6bc0(0x5e2)]['lineHeight']=function(){const _0x5711c0=_0x2e6bc0;return this['innerHeight']||Window_Base[_0x5711c0(0x5e2)][_0x5711c0(0x1ec)][_0x5711c0(0x895)](this);},Window_ButtonAssist[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2d5)]=function(){const _0x5d7af0=_0x2e6bc0;this[_0x5d7af0(0x267)][_0x5d7af0(0x135)]<=0x60&&(this[_0x5d7af0(0x267)][_0x5d7af0(0x135)]+=0x6);},Window_ButtonAssist['prototype'][_0x2e6bc0(0xe4)]=function(){const _0x322441=_0x2e6bc0;this[_0x322441(0x267)]['fontSize']>=0x18&&(this[_0x322441(0x267)][_0x322441(0x135)]-=0x6);},Window_ButtonAssist[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x645)]=function(){const _0x27927f=_0x2e6bc0;Window_Base[_0x27927f(0x5e2)]['update'][_0x27927f(0x895)](this),this[_0x27927f(0x84c)]();},Window_ButtonAssist[_0x2e6bc0(0x5e2)]['updatePadding']=function(){const _0x31d555=_0x2e6bc0;this[_0x31d555(0x460)]=SceneManager[_0x31d555(0x49a)][_0x31d555(0x28f)]()!==_0x31d555(0x3d9)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x2e6bc0(0x84c)]=function(){const _0x27adcc=_0x2e6bc0,_0x4afdeb=SceneManager[_0x27adcc(0x49a)];for(let _0x10998c=0x1;_0x10998c<=0x5;_0x10998c++){if(this[_0x27adcc(0x43b)][_0x27adcc(0x41b)[_0x27adcc(0x607)](_0x10998c)]!==_0x4afdeb[_0x27adcc(0x4e7)[_0x27adcc(0x607)](_0x10998c)]())return this[_0x27adcc(0x3bd)]();if(this[_0x27adcc(0x43b)][_0x27adcc(0x620)[_0x27adcc(0x607)](_0x10998c)]!==_0x4afdeb[_0x27adcc(0x4b3)[_0x27adcc(0x607)](_0x10998c)]())return this[_0x27adcc(0x3bd)]();}},Window_ButtonAssist[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)]=function(){const _0x5fb3e3=_0x2e6bc0;this[_0x5fb3e3(0x267)][_0x5fb3e3(0x1f1)]();for(let _0x1be43b=0x1;_0x1be43b<=0x5;_0x1be43b++){this[_0x5fb3e3(0x804)](_0x1be43b);}},Window_ButtonAssist[_0x2e6bc0(0x5e2)]['drawSegment']=function(_0x332ecd){const _0x207931=_0x2e6bc0,_0x2c5913=this[_0x207931(0x78c)]/0x5,_0x3b8fb3=SceneManager[_0x207931(0x49a)],_0x57a130=_0x3b8fb3['buttonAssistKey%1'[_0x207931(0x607)](_0x332ecd)](),_0x39192a=_0x3b8fb3[_0x207931(0x4b3)[_0x207931(0x607)](_0x332ecd)]();this['_data'][_0x207931(0x41b)[_0x207931(0x607)](_0x332ecd)]=_0x57a130,this['_data'][_0x207931(0x620)['format'](_0x332ecd)]=_0x39192a;if(_0x57a130==='')return;if(_0x39192a==='')return;const _0x3fe9a0=_0x3b8fb3[_0x207931(0x29d)[_0x207931(0x607)](_0x332ecd)](),_0x5e5c45=this['itemPadding'](),_0x30de05=_0x2c5913*(_0x332ecd-0x1)+_0x5e5c45+_0x3fe9a0,_0xa2a332=VisuMZ[_0x207931(0x468)]['Settings'][_0x207931(0x51a)][_0x207931(0x142)];this['drawTextEx'](_0xa2a332[_0x207931(0x607)](_0x57a130,_0x39192a),_0x30de05,0x0,_0x2c5913-_0x5e5c45*0x2);},VisuMZ['CoreEngine'][_0x2e6bc0(0xeb)]=Game_Interpreter[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x39a)],Game_Interpreter['prototype'][_0x2e6bc0(0x39a)]=function(){const _0x5c4b77=_0x2e6bc0;if($gameTemp[_0x5c4b77(0x83f)]!==undefined)return VisuMZ['CoreEngine'][_0x5c4b77(0x4b1)]();return VisuMZ['CoreEngine'][_0x5c4b77(0xeb)][_0x5c4b77(0x895)](this);},VisuMZ['CoreEngine'][_0x2e6bc0(0x4b1)]=function(){const _0x364b18=_0x2e6bc0,_0x37760d=$gameTemp[_0x364b18(0x83f)]||0x0;(_0x37760d<0x0||_0x37760d>0x64||TouchInput[_0x364b18(0x7b3)]()||Input[_0x364b18(0x443)](_0x364b18(0x709)))&&($gameTemp[_0x364b18(0x83f)]=undefined,Input[_0x364b18(0x1f1)](),TouchInput['clear']());const _0x5e81ee=$gameScreen[_0x364b18(0x2a9)](_0x37760d);return _0x5e81ee&&(_0x5e81ee['_x']=TouchInput['_x'],_0x5e81ee['_y']=TouchInput['_y']),VisuMZ[_0x364b18(0x468)]['updatePictureCoordinates'](),$gameTemp[_0x364b18(0x83f)]!==undefined;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x22e)]=function(){const _0x5274f9=_0x2e6bc0,_0x510e42=SceneManager[_0x5274f9(0x49a)];if(!_0x510e42)return;!_0x510e42[_0x5274f9(0x407)]&&(SoundManager[_0x5274f9(0x223)](),_0x510e42['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x510e42[_0x5274f9(0x6e8)](_0x510e42[_0x5274f9(0x407)])),$gameTemp[_0x5274f9(0x83f)]===undefined&&(SoundManager['playCancel'](),_0x510e42['removeChild'](_0x510e42[_0x5274f9(0x407)]),_0x510e42[_0x5274f9(0x407)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x2e6bc0(0x5e2)]=Object['create'](Window_Base[_0x2e6bc0(0x5e2)]),Window_PictureCoordinates[_0x2e6bc0(0x5e2)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x2e6bc0(0x5e2)]['initialize']=function(){const _0xb6b517=_0x2e6bc0;this[_0xb6b517(0x5b6)]=_0xb6b517(0x20f),this['_lastX']=_0xb6b517(0x20f),this[_0xb6b517(0x595)]=_0xb6b517(0x20f);const _0x206695=this['windowRect']();Window_Base[_0xb6b517(0x5e2)][_0xb6b517(0x571)][_0xb6b517(0x895)](this,_0x206695),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype'][_0x2e6bc0(0x2c8)]=function(){const _0x4af8b0=_0x2e6bc0;let _0x3b3ef2=0x0,_0x53296a=Graphics[_0x4af8b0(0x689)]-this[_0x4af8b0(0x1ec)](),_0x31bf7e=Graphics[_0x4af8b0(0x746)],_0x3b5893=this[_0x4af8b0(0x1ec)]();return new Rectangle(_0x3b3ef2,_0x53296a,_0x31bf7e,_0x3b5893);},Window_PictureCoordinates[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x354)]=function(){const _0x29ae9d=_0x2e6bc0;this[_0x29ae9d(0x460)]=0x0;},Window_PictureCoordinates['prototype'][_0x2e6bc0(0x645)]=function(){const _0x2da62a=_0x2e6bc0;Window_Base[_0x2da62a(0x5e2)][_0x2da62a(0x645)][_0x2da62a(0x895)](this),this[_0x2da62a(0x116)]();},Window_PictureCoordinates[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x116)]=function(){const _0x162faa=_0x2e6bc0;if(!this[_0x162faa(0x2dc)]())return;this[_0x162faa(0x3bd)]();},Window_PictureCoordinates['prototype'][_0x2e6bc0(0x2dc)]=function(){const _0x26d7dd=_0x2e6bc0,_0x43fbb3=$gameTemp[_0x26d7dd(0x83f)],_0x275749=$gameScreen[_0x26d7dd(0x2a9)](_0x43fbb3);return _0x275749?this[_0x26d7dd(0x5b6)]!==_0x275749['_origin']||this[_0x26d7dd(0x45a)]!==_0x275749['_x']||this[_0x26d7dd(0x595)]!==_0x275749['_y']:![];},Window_PictureCoordinates['prototype']['refresh']=function(){const _0x1b6747=_0x2e6bc0;this[_0x1b6747(0x267)]['clear']();const _0x193bf0=$gameTemp[_0x1b6747(0x83f)],_0x454233=$gameScreen[_0x1b6747(0x2a9)](_0x193bf0);if(!_0x454233)return;this['_lastOrigin']=_0x454233['_origin'],this[_0x1b6747(0x45a)]=_0x454233['_x'],this['_lastY']=_0x454233['_y'];const _0x5347f2=ColorManager[_0x1b6747(0x8b0)]();this[_0x1b6747(0x267)][_0x1b6747(0x762)](0x0,0x0,this[_0x1b6747(0x78c)],this[_0x1b6747(0x463)],_0x5347f2);const _0x2117ed='\x20Origin:\x20%1'[_0x1b6747(0x607)](_0x454233[_0x1b6747(0x8b3)]===0x0?_0x1b6747(0x2f5):_0x1b6747(0x3de)),_0x5da274=_0x1b6747(0x1b2)[_0x1b6747(0x607)](_0x454233['_x']),_0x362d07=_0x1b6747(0x49b)[_0x1b6747(0x607)](_0x454233['_y']),_0x35e817=_0x1b6747(0x362)[_0x1b6747(0x607)](TextManager[_0x1b6747(0x76a)](_0x1b6747(0x709)));let _0x56fe12=Math[_0x1b6747(0x3ff)](this[_0x1b6747(0x78c)]/0x4);this['drawText'](_0x2117ed,_0x56fe12*0x0,0x0,_0x56fe12),this[_0x1b6747(0x41f)](_0x5da274,_0x56fe12*0x1,0x0,_0x56fe12,_0x1b6747(0x77c)),this['drawText'](_0x362d07,_0x56fe12*0x2,0x0,_0x56fe12,'center');const _0x4d7a15=this[_0x1b6747(0x5ff)](_0x35e817)['width'],_0x192097=this[_0x1b6747(0x78c)]-_0x4d7a15;this[_0x1b6747(0x42a)](_0x35e817,_0x192097,0x0,_0x4d7a15);};function Window_TextPopup(){const _0x487eaa=_0x2e6bc0;this[_0x487eaa(0x571)](...arguments);}Window_TextPopup[_0x2e6bc0(0x5e2)]=Object['create'](Window_Base['prototype']),Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2c3)]=Window_TextPopup,Window_TextPopup[_0x2e6bc0(0x805)]={'framesPerChar':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)]['Window'][_0x2e6bc0(0x3c6)]??1.5,'framesMin':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x668)]??0x5a,'framesMax':VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x6ef)][_0x2e6bc0(0x76e)][_0x2e6bc0(0x1e8)]??0x12c},Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x571)]=function(){const _0x125f0a=_0x2e6bc0,_0x35cf09=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype'][_0x125f0a(0x571)]['call'](this,_0x35cf09),this[_0x125f0a(0x73b)]=0x0,this[_0x125f0a(0x4ce)]='',this[_0x125f0a(0x188)]=[],this[_0x125f0a(0x2b7)]=0x0;},Window_TextPopup['prototype'][_0x2e6bc0(0x577)]=function(){return!![];},Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x781)]=function(_0xa18340){const _0x2cc079=_0x2e6bc0;if(this[_0x2cc079(0x188)][this['_textQueue'][_0x2cc079(0x29e)]-0x1]===_0xa18340)return;this['_textQueue'][_0x2cc079(0x16c)](_0xa18340),SceneManager[_0x2cc079(0x49a)][_0x2cc079(0x6e8)](this);},Window_TextPopup['prototype']['update']=function(){const _0x3a56a3=_0x2e6bc0;Window_Base[_0x3a56a3(0x5e2)][_0x3a56a3(0x645)][_0x3a56a3(0x895)](this),this[_0x3a56a3(0x6c9)](),this[_0x3a56a3(0x860)]();},Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x6c9)]=function(){const _0x23df81=_0x2e6bc0;if(this[_0x23df81(0x4ce)]!=='')return;if(this[_0x23df81(0x188)]['length']<=0x0)return;if(!this[_0x23df81(0x236)]())return;this[_0x23df81(0x4ce)]=this['_textQueue'][_0x23df81(0x2f3)]();const _0x2c0994=Window_TextPopup[_0x23df81(0x805)],_0x314372=Math[_0x23df81(0x539)](this['_text'][_0x23df81(0x29e)]*_0x2c0994[_0x23df81(0x575)]);this['_timeDuration']=_0x314372[_0x23df81(0x2eb)](_0x2c0994[_0x23df81(0x5fc)],_0x2c0994[_0x23df81(0xf4)]);const _0x20a699=this[_0x23df81(0x5ff)](this[_0x23df81(0x4ce)]);let _0x3b9677=_0x20a699[_0x23df81(0x746)]+this[_0x23df81(0x637)]()*0x2;_0x3b9677+=$gameSystem['windowPadding']()*0x2;let _0x3056dd=Math['max'](_0x20a699['height'],this[_0x23df81(0x1ec)]());_0x3056dd+=$gameSystem[_0x23df81(0x1f2)]()*0x2;const _0x30d864=Math[_0x23df81(0x897)]((Graphics[_0x23df81(0x746)]-_0x3b9677)/0x2),_0x4abcbf=Math[_0x23df81(0x897)]((Graphics['height']-_0x3056dd)/0x2),_0x3eb5df=new Rectangle(_0x30d864,_0x4abcbf,_0x3b9677,_0x3056dd);this[_0x23df81(0x633)](_0x3eb5df['x'],_0x3eb5df['y'],_0x3eb5df[_0x23df81(0x746)],_0x3eb5df['height']),this[_0x23df81(0x8bd)](),this[_0x23df81(0x3bd)](),this[_0x23df81(0x6a0)](),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bd)]=function(){const _0x25de95=_0x2e6bc0,_0x1c352b=this[_0x25de95(0x2f0)]();this[_0x25de95(0x267)][_0x25de95(0x1f1)](),this[_0x25de95(0x42a)](this['_text'],_0x1c352b['x'],_0x1c352b['y'],_0x1c352b[_0x25de95(0x746)]);},Window_TextPopup[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x860)]=function(){const _0x203412=_0x2e6bc0;if(this[_0x203412(0x375)]()||this[_0x203412(0x47f)]())return;if(this[_0x203412(0x2b7)]<=0x0)return;this[_0x203412(0x2b7)]--,this[_0x203412(0x2b7)]<=0x0&&(this[_0x203412(0x50d)](),this[_0x203412(0x4ce)]='');},VisuMZ[_0x2e6bc0(0x88a)]=function(_0x2b57a7){const _0x26f60b=_0x2e6bc0;if(Utils[_0x26f60b(0x88d)](_0x26f60b(0x43e))){var _0x25a960=require(_0x26f60b(0x6b3))[_0x26f60b(0x76e)][_0x26f60b(0x63c)]();SceneManager[_0x26f60b(0x485)]();if(_0x2b57a7)setTimeout(_0x25a960[_0x26f60b(0x80a)]['bind'](_0x25a960),0x190);}},VisuMZ[_0x2e6bc0(0x71e)]=function(_0x42d6f8,_0xa00655){const _0x5caf2f=_0x2e6bc0;_0xa00655=_0xa00655[_0x5caf2f(0x63e)]();var _0x110c61=1.70158,_0x49b9ce=0.7;switch(_0xa00655){case _0x5caf2f(0x6f2):return _0x42d6f8;case _0x5caf2f(0x7d8):return-0x1*Math[_0x5caf2f(0x532)](_0x42d6f8*(Math['PI']/0x2))+0x1;case _0x5caf2f(0x613):return Math[_0x5caf2f(0x5d2)](_0x42d6f8*(Math['PI']/0x2));case _0x5caf2f(0x32e):return-0.5*(Math[_0x5caf2f(0x532)](Math['PI']*_0x42d6f8)-0x1);case'INQUAD':return _0x42d6f8*_0x42d6f8;case _0x5caf2f(0x789):return _0x42d6f8*(0x2-_0x42d6f8);case _0x5caf2f(0x4f4):return _0x42d6f8<0.5?0x2*_0x42d6f8*_0x42d6f8:-0x1+(0x4-0x2*_0x42d6f8)*_0x42d6f8;case'INCUBIC':return _0x42d6f8*_0x42d6f8*_0x42d6f8;case _0x5caf2f(0x342):var _0x2f4013=_0x42d6f8-0x1;return _0x2f4013*_0x2f4013*_0x2f4013+0x1;case _0x5caf2f(0x28a):return _0x42d6f8<0.5?0x4*_0x42d6f8*_0x42d6f8*_0x42d6f8:(_0x42d6f8-0x1)*(0x2*_0x42d6f8-0x2)*(0x2*_0x42d6f8-0x2)+0x1;case _0x5caf2f(0x122):return _0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8;case _0x5caf2f(0x5d3):var _0x2f4013=_0x42d6f8-0x1;return 0x1-_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013;case _0x5caf2f(0x847):var _0x2f4013=_0x42d6f8-0x1;return _0x42d6f8<0.5?0x8*_0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8:0x1-0x8*_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013;case'INQUINT':return _0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8;case _0x5caf2f(0x1f0):var _0x2f4013=_0x42d6f8-0x1;return 0x1+_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013;case _0x5caf2f(0x70b):var _0x2f4013=_0x42d6f8-0x1;return _0x42d6f8<0.5?0x10*_0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8*_0x42d6f8:0x1+0x10*_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013*_0x2f4013;case'INEXPO':if(_0x42d6f8===0x0)return 0x0;return Math[_0x5caf2f(0x4f5)](0x2,0xa*(_0x42d6f8-0x1));case _0x5caf2f(0x61c):if(_0x42d6f8===0x1)return 0x1;return-Math[_0x5caf2f(0x4f5)](0x2,-0xa*_0x42d6f8)+0x1;case _0x5caf2f(0x570):if(_0x42d6f8===0x0||_0x42d6f8===0x1)return _0x42d6f8;var _0x1d9c7c=_0x42d6f8*0x2,_0x290c97=_0x1d9c7c-0x1;if(_0x1d9c7c<0x1)return 0.5*Math[_0x5caf2f(0x4f5)](0x2,0xa*_0x290c97);return 0.5*(-Math[_0x5caf2f(0x4f5)](0x2,-0xa*_0x290c97)+0x2);case _0x5caf2f(0x27c):var _0x1d9c7c=_0x42d6f8/0x1;return-0x1*(Math[_0x5caf2f(0x433)](0x1-_0x1d9c7c*_0x42d6f8)-0x1);case _0x5caf2f(0x1d2):var _0x2f4013=_0x42d6f8-0x1;return Math[_0x5caf2f(0x433)](0x1-_0x2f4013*_0x2f4013);case _0x5caf2f(0x6f0):var _0x1d9c7c=_0x42d6f8*0x2,_0x290c97=_0x1d9c7c-0x2;if(_0x1d9c7c<0x1)return-0.5*(Math[_0x5caf2f(0x433)](0x1-_0x1d9c7c*_0x1d9c7c)-0x1);return 0.5*(Math['sqrt'](0x1-_0x290c97*_0x290c97)+0x1);case _0x5caf2f(0x708):return _0x42d6f8*_0x42d6f8*((_0x110c61+0x1)*_0x42d6f8-_0x110c61);case _0x5caf2f(0x26f):var _0x1d9c7c=_0x42d6f8/0x1-0x1;return _0x1d9c7c*_0x1d9c7c*((_0x110c61+0x1)*_0x1d9c7c+_0x110c61)+0x1;break;case _0x5caf2f(0x115):var _0x1d9c7c=_0x42d6f8*0x2,_0x58978b=_0x1d9c7c-0x2,_0x47a74e=_0x110c61*1.525;if(_0x1d9c7c<0x1)return 0.5*_0x1d9c7c*_0x1d9c7c*((_0x47a74e+0x1)*_0x1d9c7c-_0x47a74e);return 0.5*(_0x58978b*_0x58978b*((_0x47a74e+0x1)*_0x58978b+_0x47a74e)+0x2);case _0x5caf2f(0x837):if(_0x42d6f8===0x0||_0x42d6f8===0x1)return _0x42d6f8;var _0x1d9c7c=_0x42d6f8/0x1,_0x290c97=_0x1d9c7c-0x1,_0x2b873b=0x1-_0x49b9ce,_0x47a74e=_0x2b873b/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x290c97)*Math[_0x5caf2f(0x5d2)]((_0x290c97-_0x47a74e)*(0x2*Math['PI'])/_0x2b873b));case _0x5caf2f(0x282):var _0x2b873b=0x1-_0x49b9ce,_0x1d9c7c=_0x42d6f8*0x2;if(_0x42d6f8===0x0||_0x42d6f8===0x1)return _0x42d6f8;var _0x47a74e=_0x2b873b/(0x2*Math['PI'])*Math[_0x5caf2f(0x240)](0x1);return Math[_0x5caf2f(0x4f5)](0x2,-0xa*_0x1d9c7c)*Math[_0x5caf2f(0x5d2)]((_0x1d9c7c-_0x47a74e)*(0x2*Math['PI'])/_0x2b873b)+0x1;case _0x5caf2f(0x544):var _0x2b873b=0x1-_0x49b9ce;if(_0x42d6f8===0x0||_0x42d6f8===0x1)return _0x42d6f8;var _0x1d9c7c=_0x42d6f8*0x2,_0x290c97=_0x1d9c7c-0x1,_0x47a74e=_0x2b873b/(0x2*Math['PI'])*Math[_0x5caf2f(0x240)](0x1);if(_0x1d9c7c<0x1)return-0.5*(Math[_0x5caf2f(0x4f5)](0x2,0xa*_0x290c97)*Math[_0x5caf2f(0x5d2)]((_0x290c97-_0x47a74e)*(0x2*Math['PI'])/_0x2b873b));return Math[_0x5caf2f(0x4f5)](0x2,-0xa*_0x290c97)*Math[_0x5caf2f(0x5d2)]((_0x290c97-_0x47a74e)*(0x2*Math['PI'])/_0x2b873b)*0.5+0x1;case _0x5caf2f(0x257):var _0x1d9c7c=_0x42d6f8/0x1;if(_0x1d9c7c<0x1/2.75)return 7.5625*_0x1d9c7c*_0x1d9c7c;else{if(_0x1d9c7c<0x2/2.75){var _0x58978b=_0x1d9c7c-1.5/2.75;return 7.5625*_0x58978b*_0x58978b+0.75;}else{if(_0x1d9c7c<2.5/2.75){var _0x58978b=_0x1d9c7c-2.25/2.75;return 7.5625*_0x58978b*_0x58978b+0.9375;}else{var _0x58978b=_0x1d9c7c-2.625/2.75;return 7.5625*_0x58978b*_0x58978b+0.984375;}}}case _0x5caf2f(0x34e):var _0x5d5039=0x1-VisuMZ[_0x5caf2f(0x71e)](0x1-_0x42d6f8,_0x5caf2f(0x320));return _0x5d5039;case _0x5caf2f(0x830):if(_0x42d6f8<0.5)var _0x5d5039=VisuMZ['ApplyEasing'](_0x42d6f8*0x2,_0x5caf2f(0x72b))*0.5;else var _0x5d5039=VisuMZ[_0x5caf2f(0x71e)](_0x42d6f8*0x2-0x1,'outbounce')*0.5+0.5;return _0x5d5039;default:return _0x42d6f8;}},VisuMZ['GetParamIcon']=function(_0x5aac7d){const _0x482fa1=_0x2e6bc0;_0x5aac7d=String(_0x5aac7d)[_0x482fa1(0x63e)]();const _0xe30afb=VisuMZ[_0x482fa1(0x468)][_0x482fa1(0x6ef)]['Param'];if(_0x5aac7d===_0x482fa1(0x4a4))return _0xe30afb['IconParam0'];if(_0x5aac7d==='MAXMP')return _0xe30afb['IconParam1'];if(_0x5aac7d===_0x482fa1(0x5e3))return _0xe30afb['IconParam2'];if(_0x5aac7d===_0x482fa1(0x227))return _0xe30afb[_0x482fa1(0x177)];if(_0x5aac7d==='MAT')return _0xe30afb[_0x482fa1(0x47c)];if(_0x5aac7d===_0x482fa1(0x34d))return _0xe30afb[_0x482fa1(0x325)];if(_0x5aac7d===_0x482fa1(0x670))return _0xe30afb['IconParam6'];if(_0x5aac7d==='LUK')return _0xe30afb[_0x482fa1(0x77d)];if(_0x5aac7d===_0x482fa1(0x2e4))return _0xe30afb[_0x482fa1(0x659)];if(_0x5aac7d===_0x482fa1(0x231))return _0xe30afb[_0x482fa1(0x144)];if(_0x5aac7d===_0x482fa1(0x2ba))return _0xe30afb[_0x482fa1(0x233)];if(_0x5aac7d===_0x482fa1(0x280))return _0xe30afb[_0x482fa1(0x3cb)];if(_0x5aac7d===_0x482fa1(0x7e4))return _0xe30afb['IconXParam4'];if(_0x5aac7d==='MRF')return _0xe30afb['IconXParam5'];if(_0x5aac7d==='CNT')return _0xe30afb[_0x482fa1(0x4be)];if(_0x5aac7d===_0x482fa1(0x197))return _0xe30afb[_0x482fa1(0x73a)];if(_0x5aac7d===_0x482fa1(0x217))return _0xe30afb[_0x482fa1(0x242)];if(_0x5aac7d==='TRG')return _0xe30afb[_0x482fa1(0x4c4)];if(_0x5aac7d===_0x482fa1(0x8a4))return _0xe30afb[_0x482fa1(0x459)];if(_0x5aac7d==='GRD')return _0xe30afb[_0x482fa1(0x10b)];if(_0x5aac7d===_0x482fa1(0x319))return _0xe30afb[_0x482fa1(0x75c)];if(_0x5aac7d===_0x482fa1(0x8c2))return _0xe30afb['IconSParam3'];if(_0x5aac7d===_0x482fa1(0x79b))return _0xe30afb['IconSParam4'];if(_0x5aac7d===_0x482fa1(0x3ef))return _0xe30afb['IconSParam5'];if(_0x5aac7d==='PDR')return _0xe30afb['IconSParam6'];if(_0x5aac7d===_0x482fa1(0x5db))return _0xe30afb[_0x482fa1(0x851)];if(_0x5aac7d==='FDR')return _0xe30afb[_0x482fa1(0x695)];if(_0x5aac7d===_0x482fa1(0x312))return _0xe30afb['IconSParam9'];if(VisuMZ['CoreEngine'][_0x482fa1(0x75f)][_0x5aac7d])return VisuMZ[_0x482fa1(0x468)][_0x482fa1(0x75f)][_0x5aac7d]||0x0;return 0x0;},VisuMZ[_0x2e6bc0(0x706)]=function(_0x59854b,_0x463636,_0x1ebf30){const _0x2eb193=_0x2e6bc0;if(_0x1ebf30===undefined&&_0x59854b%0x1===0x0)return _0x59854b;if(_0x1ebf30!==undefined&&[_0x2eb193(0x4a4),_0x2eb193(0x1e9),_0x2eb193(0x5e3),_0x2eb193(0x227),'MAT','MDF',_0x2eb193(0x670),_0x2eb193(0x853)][_0x2eb193(0x7fe)](String(_0x1ebf30)[_0x2eb193(0x63e)]()[_0x2eb193(0x679)]()))return _0x59854b;_0x463636=_0x463636||0x0;if(VisuMZ[_0x2eb193(0x468)][_0x2eb193(0x479)][_0x1ebf30])return VisuMZ['CoreEngine'][_0x2eb193(0xf3)][_0x1ebf30]==='integer'?_0x59854b:String((_0x59854b*0x64)[_0x2eb193(0x801)](_0x463636))+'%';return String((_0x59854b*0x64)['toFixed'](_0x463636))+'%';},VisuMZ[_0x2e6bc0(0x35b)]=function(_0x2c1625){const _0x531e08=_0x2e6bc0;_0x2c1625=String(_0x2c1625);if(!_0x2c1625)return _0x2c1625;if(typeof _0x2c1625!==_0x531e08(0x8b9))return _0x2c1625;const _0x2a27e0=VisuMZ[_0x531e08(0x468)][_0x531e08(0x6ef)]['QoL'][_0x531e08(0x807)]||'en-US',_0x3ae46a={'maximumFractionDigits':0x6};_0x2c1625=_0x2c1625[_0x531e08(0x20a)](/\[(.*?)\]/g,(_0x3dbc75,_0x1fd660)=>{const _0x5e3f33=_0x531e08;return VisuMZ[_0x5e3f33(0x26c)](_0x1fd660,'[',']');}),_0x2c1625=_0x2c1625[_0x531e08(0x20a)](/<(.*?)>/g,(_0x5e745e,_0x44d955)=>{const _0x4fb328=_0x531e08;return VisuMZ[_0x4fb328(0x26c)](_0x44d955,'<','>');}),_0x2c1625=_0x2c1625[_0x531e08(0x20a)](/\{\{(.*?)\}\}/g,(_0x3cdeb7,_0x2712cc)=>{const _0x5a2771=_0x531e08;return VisuMZ[_0x5a2771(0x26c)](_0x2712cc,'','');}),_0x2c1625=_0x2c1625[_0x531e08(0x20a)](/(\d+\.?\d*)/g,(_0x5697ad,_0x3c5962)=>{const _0x273ae3=_0x531e08;let _0x63179=_0x3c5962;if(_0x63179[0x0]==='0')return _0x63179;if(_0x63179[_0x63179[_0x273ae3(0x29e)]-0x1]==='.')return Number(_0x63179)[_0x273ae3(0x654)](_0x2a27e0,_0x3ae46a)+'.';else return _0x63179[_0x63179[_0x273ae3(0x29e)]-0x1]===','?Number(_0x63179)['toLocaleString'](_0x2a27e0,_0x3ae46a)+',':Number(_0x63179)[_0x273ae3(0x654)](_0x2a27e0,_0x3ae46a);});let _0x462cb4=0x3;while(_0x462cb4--){_0x2c1625=VisuMZ['RevertPreserveNumbers'](_0x2c1625);}return _0x2c1625;},VisuMZ[_0x2e6bc0(0x26c)]=function(_0x33401b,_0x53bdc7,_0xc25758){const _0x4fef35=_0x2e6bc0;return _0x33401b=_0x33401b[_0x4fef35(0x20a)](/(\d)/gi,(_0xeb7dd9,_0x5bc141)=>_0x4fef35(0x7f7)[_0x4fef35(0x607)](Number(_0x5bc141))),_0x4fef35(0x436)[_0x4fef35(0x607)](_0x33401b,_0x53bdc7,_0xc25758);},VisuMZ[_0x2e6bc0(0x3f1)]=function(_0x41b82b){const _0x43c479=_0x2e6bc0;return _0x41b82b=_0x41b82b[_0x43c479(0x20a)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x56186c,_0x573197)=>Number(parseInt(_0x573197))),_0x41b82b;},VisuMZ[_0x2e6bc0(0x50a)]=function(_0x1f90f7){const _0x5d6162=_0x2e6bc0;SoundManager[_0x5d6162(0x55f)]();if(!Utils[_0x5d6162(0x3e4)]()){const _0x1d8821=window[_0x5d6162(0x6a0)](_0x1f90f7,'_blank');}else{const _0x170956=process[_0x5d6162(0x14c)]==_0x5d6162(0x813)?_0x5d6162(0x6a0):process[_0x5d6162(0x14c)]==_0x5d6162(0x435)?_0x5d6162(0x427):_0x5d6162(0x4d1);require(_0x5d6162(0x598))[_0x5d6162(0x80c)](_0x170956+'\x20'+_0x1f90f7);}},VisuMZ[_0x2e6bc0(0x7b0)]=function(_0x35cc13,_0x3f7026){const _0x146c2f=_0x2e6bc0;if(!_0x35cc13)return'';const _0x3d6493=_0x35cc13[_0x146c2f(0x624)]||_0x35cc13['id'];let _0x28057c='';return _0x35cc13[_0x146c2f(0x3fa)]!==undefined&&_0x35cc13[_0x146c2f(0x6fc)]!==undefined&&(_0x28057c='Actor-%1-%2'[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x35cc13[_0x146c2f(0x329)]!==undefined&&_0x35cc13[_0x146c2f(0x3a8)]!==undefined&&(_0x28057c=_0x146c2f(0x647)['format'](_0x3d6493,_0x3f7026)),_0x35cc13['stypeId']!==undefined&&_0x35cc13['requiredWtypeId1']!==undefined&&(_0x28057c=_0x146c2f(0x35c)[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x35cc13[_0x146c2f(0x7b9)]!==undefined&&_0x35cc13['consumable']!==undefined&&(_0x28057c=_0x146c2f(0x1b4)['format'](_0x3d6493,_0x3f7026)),_0x35cc13[_0x146c2f(0x57d)]!==undefined&&_0x35cc13['etypeId']===0x1&&(_0x28057c=_0x146c2f(0x46a)[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x35cc13[_0x146c2f(0x3c0)]!==undefined&&_0x35cc13[_0x146c2f(0x7bb)]>0x1&&(_0x28057c=_0x146c2f(0x47a)[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x35cc13['dropItems']!==undefined&&_0x35cc13[_0x146c2f(0x676)]!==undefined&&(_0x28057c=_0x146c2f(0x707)[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x35cc13[_0x146c2f(0x134)]!==undefined&&_0x35cc13[_0x146c2f(0x879)]!==undefined&&(_0x28057c='State-%1-%2'[_0x146c2f(0x607)](_0x3d6493,_0x3f7026)),_0x28057c;},Window_Base[_0x2e6bc0(0x5e2)]['processDrawIcon']=function(_0x42a122,_0x4d74fa){const _0x348128=_0x2e6bc0,_0x2bdf7d=ImageManager[_0x348128(0x17b)]||0x20,_0x148825=ImageManager[_0x348128(0x370)]||0x20;if(_0x4d74fa[_0x348128(0x47e)]){const _0x501a4a=_0x2bdf7d-ImageManager[_0x348128(0x503)],_0x61eaaf=_0x148825-ImageManager[_0x348128(0x594)];let _0x46205b=0x2,_0xf10469=0x2;this[_0x348128(0x1ec)]()!==0x24&&(_0xf10469=Math[_0x348128(0x3ff)]((this['lineHeight']()-_0x148825)/0x2));const _0x306b18=_0x4d74fa['x']+Math[_0x348128(0x3ff)](_0x501a4a/0x2)+_0x46205b,_0x2efd3b=_0x4d74fa['y']+Math['floor'](_0x61eaaf/0x2)+_0xf10469;this['drawIcon'](_0x42a122,_0x306b18,_0x2efd3b);}_0x4d74fa['x']+=_0x2bdf7d+0x4;},Window_StatusBase[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x3bb)]=function(_0x42ec41,_0x176052,_0x429a00,_0x311e7a){const _0x246669=_0x2e6bc0;_0x311e7a=_0x311e7a||0x90;const _0x4ca7f6=ImageManager['standardIconWidth']||0x20,_0x2759a4=ImageManager[_0x246669(0x370)]||0x20,_0x1d0f98=_0x4ca7f6-ImageManager['iconWidth'],_0x416abe=_0x2759a4-ImageManager['iconHeight'],_0x330aa8=_0x4ca7f6,_0x49545c=_0x42ec41['allIcons']()[_0x246669(0x3c1)](0x0,Math['floor'](_0x311e7a/_0x330aa8));let _0x3371b1=_0x176052+Math[_0x246669(0x539)](_0x1d0f98/0x2),_0x83bb8a=_0x429a00+Math['ceil'](_0x416abe/0x2);for(const _0xf4df32 of _0x49545c){this['drawIcon'](_0xf4df32,_0x3371b1,_0x83bb8a),_0x3371b1+=_0x330aa8;}},Game_Picture[_0x2e6bc0(0x5e2)]['anchor']=function(){const _0x3119f1=_0x2e6bc0;return this[_0x3119f1(0x2a2)];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x4de)]=Game_Picture['prototype'][_0x2e6bc0(0x2db)],Game_Picture[_0x2e6bc0(0x5e2)]['initBasic']=function(){const _0x12682f=_0x2e6bc0;VisuMZ[_0x12682f(0x468)][_0x12682f(0x4de)][_0x12682f(0x895)](this),this[_0x12682f(0x2a2)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x87b)]=Game_Picture['prototype']['updateMove'],Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x19d)]=function(){const _0x1c61d6=_0x2e6bc0;this[_0x1c61d6(0x42e)]();const _0x9779e4=this[_0x1c61d6(0x104)];VisuMZ['CoreEngine'][_0x1c61d6(0x87b)][_0x1c61d6(0x895)](this),_0x9779e4>0x0&&this[_0x1c61d6(0x104)]<=0x0&&(this['_x']=this[_0x1c61d6(0x404)],this['_y']=this['_targetY'],this['_scaleX']=this[_0x1c61d6(0x7bf)],this[_0x1c61d6(0x729)]=this['_targetScaleY'],this['_opacity']=this[_0x1c61d6(0x700)],this[_0x1c61d6(0x2a2)]&&(this[_0x1c61d6(0x2a2)]['x']=this[_0x1c61d6(0x127)]['x'],this[_0x1c61d6(0x2a2)]['y']=this[_0x1c61d6(0x127)]['y']));},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x50f)]=Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x44a)],Game_Picture['prototype'][_0x2e6bc0(0x44a)]=function(_0x66dc64,_0x3d1d42,_0x28f6e4,_0x25ef9a,_0x2a6517,_0x26bac1,_0x75cf2a,_0x3b45a0){const _0x39f6e6=_0x2e6bc0;VisuMZ[_0x39f6e6(0x468)][_0x39f6e6(0x50f)][_0x39f6e6(0x895)](this,_0x66dc64,_0x3d1d42,_0x28f6e4,_0x25ef9a,_0x2a6517,_0x26bac1,_0x75cf2a,_0x3b45a0),this[_0x39f6e6(0x7e8)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3d1d42]||{'x':0x0,'y':0x0});},VisuMZ[_0x2e6bc0(0x468)]['Game_Picture_move']=Game_Picture[_0x2e6bc0(0x5e2)]['move'],Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x633)]=function(_0x24ddc5,_0x4fbef6,_0x191627,_0x3b2e49,_0x3751fc,_0x49d37b,_0x1df805,_0x51e60f,_0x1e5e3d){const _0x4020de=_0x2e6bc0;VisuMZ[_0x4020de(0x468)][_0x4020de(0x582)][_0x4020de(0x895)](this,_0x24ddc5,_0x4fbef6,_0x191627,_0x3b2e49,_0x3751fc,_0x49d37b,_0x1df805,_0x51e60f,_0x1e5e3d),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x24ddc5]||{'x':0x0,'y':0x0});},Game_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x42e)]=function(){const _0x55c30c=_0x2e6bc0;this[_0x55c30c(0x104)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x55c30c(0x2a2)]['x'],this[_0x55c30c(0x127)]['x']),this[_0x55c30c(0x2a2)]['y']=this['applyEasing'](this[_0x55c30c(0x2a2)]['y'],this[_0x55c30c(0x127)]['y']));},Game_Picture[_0x2e6bc0(0x5e2)]['setAnchor']=function(_0x3debc2){const _0x5936af=_0x2e6bc0;this['_anchor']=_0x3debc2,this[_0x5936af(0x127)]=JsonEx[_0x5936af(0x5a7)](this[_0x5936af(0x2a2)]);},Game_Picture[_0x2e6bc0(0x5e2)]['setTargetAnchor']=function(_0x58c028){const _0x450b79=_0x2e6bc0;this[_0x450b79(0x127)]=_0x58c028;},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x196)]=Sprite_Picture[_0x2e6bc0(0x5e2)]['updateOrigin'],Sprite_Picture[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x760)]=function(){const _0x13c2af=_0x2e6bc0,_0x54a6bd=this[_0x13c2af(0x2a9)]();!_0x54a6bd['anchor']()?VisuMZ[_0x13c2af(0x468)][_0x13c2af(0x196)][_0x13c2af(0x895)](this):(this[_0x13c2af(0x704)]['x']=_0x54a6bd[_0x13c2af(0x704)]()['x'],this[_0x13c2af(0x704)]['y']=_0x54a6bd[_0x13c2af(0x704)]()['y']);},Game_Action[_0x2e6bc0(0x5e2)]['setEnemyAction']=function(_0x10cd2a){const _0x3b30f1=_0x2e6bc0;if(_0x10cd2a){const _0x399405=_0x10cd2a['skillId'];if(_0x399405===0x1&&this[_0x3b30f1(0x585)]()[_0x3b30f1(0x782)]()!==0x1)this[_0x3b30f1(0x725)]();else _0x399405===0x2&&this['subject']()[_0x3b30f1(0x66d)]()!==0x2?this[_0x3b30f1(0x8b5)]():this[_0x3b30f1(0x179)](_0x399405);}else this[_0x3b30f1(0x1f1)]();},Game_Actor[_0x2e6bc0(0x5e2)]['usableSkills']=function(){const _0x52b5b7=_0x2e6bc0;return this[_0x52b5b7(0x4ad)]()[_0x52b5b7(0x5c0)](_0x31651e=>this['canUse'](_0x31651e)&&this[_0x52b5b7(0x78a)]()['includes'](_0x31651e[_0x52b5b7(0x832)]));},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x1c0)]=function(){const _0x5b1838=_0x2e6bc0;this['_dimmerSprite']=new Sprite(),this['_dimmerSprite'][_0x5b1838(0x253)]=new Bitmap(0x0,0x0),this[_0x5b1838(0x71c)]['x']=0x0,this[_0x5b1838(0x448)](this[_0x5b1838(0x71c)]);},Window_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x55b)]=function(){const _0x5ca375=_0x2e6bc0;if(this[_0x5ca375(0x71c)]){const _0x419445=this[_0x5ca375(0x71c)][_0x5ca375(0x253)],_0x56e3c3=this[_0x5ca375(0x746)],_0x4b82df=this[_0x5ca375(0x689)],_0x550976=this[_0x5ca375(0x460)],_0x4dbb7b=ColorManager[_0x5ca375(0x7cb)](),_0x57a5ea=ColorManager[_0x5ca375(0x38a)]();_0x419445[_0x5ca375(0x340)](_0x56e3c3,_0x4b82df),_0x419445['gradientFillRect'](0x0,0x0,_0x56e3c3,_0x550976,_0x57a5ea,_0x4dbb7b,!![]),_0x419445['fillRect'](0x0,_0x550976,_0x56e3c3,_0x4b82df-_0x550976*0x2,_0x4dbb7b),_0x419445[_0x5ca375(0x44d)](0x0,_0x4b82df-_0x550976,_0x56e3c3,_0x550976,_0x4dbb7b,_0x57a5ea,!![]),this[_0x5ca375(0x71c)][_0x5ca375(0x3ad)](0x0,0x0,_0x56e3c3,_0x4b82df);}},Game_Actor[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4b9)]=function(){const _0x9c7f58=_0x2e6bc0;for(let _0x5d7b53=0x0;_0x5d7b53<this[_0x9c7f58(0x442)]();_0x5d7b53++){const _0x5bd485=this[_0x9c7f58(0x228)]();let _0x2253fd=Number[_0x9c7f58(0x1b0)];this['setAction'](_0x5d7b53,_0x5bd485[0x0]);for(const _0x183088 of _0x5bd485){const _0x3f93ae=_0x183088[_0x9c7f58(0x68c)]();_0x3f93ae>_0x2253fd&&(_0x2253fd=_0x3f93ae,this[_0x9c7f58(0x318)](_0x5d7b53,_0x183088));}}this['setActionState']('waiting');},Window_BattleItem['prototype'][_0x2e6bc0(0x39e)]=function(_0x1eee0d){const _0x16ad4f=_0x2e6bc0;return BattleManager[_0x16ad4f(0x780)]()?BattleManager[_0x16ad4f(0x780)]()['canUse'](_0x1eee0d):Window_ItemList[_0x16ad4f(0x5e2)][_0x16ad4f(0x39e)][_0x16ad4f(0x895)](this,_0x1eee0d);},VisuMZ[_0x2e6bc0(0x468)]['Scene_Map_createSpritesetFix']=Scene_Map['prototype'][_0x2e6bc0(0x628)],Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)]=function(){const _0x5bbba9=_0x2e6bc0;VisuMZ['CoreEngine'][_0x5bbba9(0x5f6)][_0x5bbba9(0x895)](this);const _0x2c72e6=this[_0x5bbba9(0x722)][_0x5bbba9(0x1d3)];if(_0x2c72e6)this[_0x5bbba9(0x6e8)](_0x2c72e6);},VisuMZ[_0x2e6bc0(0x468)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)],Scene_Battle[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x628)]=function(){const _0x40f7ad=_0x2e6bc0;VisuMZ[_0x40f7ad(0x468)][_0x40f7ad(0x551)][_0x40f7ad(0x895)](this);const _0x5ef9b3=this['_spriteset']['_timerSprite'];if(_0x5ef9b3)this['addChild'](_0x5ef9b3);},Sprite_Actor[_0x2e6bc0(0x5e2)]['update']=function(){const _0x5cab68=_0x2e6bc0;Sprite_Battler['prototype'][_0x5cab68(0x645)]['call'](this),this['updateShadow']();if(this[_0x5cab68(0x32c)])this['updateMotion']();else this['_battlerName']!==''&&(this[_0x5cab68(0x3c4)]='');},Window[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x54d)]=function(){const _0x6009d=_0x2e6bc0,_0x322969=this[_0x6009d(0x740)],_0xa498da=this[_0x6009d(0x7a0)],_0x47462a=0x18,_0x51b361=_0x47462a/0x2,_0x4597a1=0x60+_0x47462a,_0x47f4c6=0x0+_0x47462a;this['_downArrowSprite']['bitmap']=this[_0x6009d(0x509)],this[_0x6009d(0x840)][_0x6009d(0x704)]['x']=0.5,this[_0x6009d(0x840)]['anchor']['y']=0.5,this[_0x6009d(0x840)][_0x6009d(0x3ad)](_0x4597a1+_0x51b361,_0x47f4c6+_0x51b361+_0x47462a,_0x47462a,_0x51b361),this[_0x6009d(0x840)][_0x6009d(0x633)](Math[_0x6009d(0x897)](_0x322969/0x2),Math[_0x6009d(0x897)](_0xa498da-_0x51b361)),this[_0x6009d(0x644)][_0x6009d(0x253)]=this[_0x6009d(0x509)],this[_0x6009d(0x644)][_0x6009d(0x704)]['x']=0.5,this[_0x6009d(0x644)][_0x6009d(0x704)]['y']=0.5,this[_0x6009d(0x644)][_0x6009d(0x3ad)](_0x4597a1+_0x51b361,_0x47f4c6,_0x47462a,_0x51b361),this['_upArrowSprite'][_0x6009d(0x633)](Math['round'](_0x322969/0x2),Math[_0x6009d(0x897)](_0x51b361));},Window[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x18e)]=function(){const _0x5fd38d=_0x2e6bc0,_0x3fcf2d=0x90,_0x162b33=0x60,_0x290731=0x18;this[_0x5fd38d(0x824)][_0x5fd38d(0x253)]=this['_windowskin'],this['_pauseSignSprite'][_0x5fd38d(0x704)]['x']=0.5,this[_0x5fd38d(0x824)][_0x5fd38d(0x704)]['y']=0x1,this[_0x5fd38d(0x824)][_0x5fd38d(0x633)](Math[_0x5fd38d(0x897)](this[_0x5fd38d(0x740)]/0x2),this[_0x5fd38d(0x7a0)]),this[_0x5fd38d(0x824)][_0x5fd38d(0x3ad)](_0x3fcf2d,_0x162b33,_0x290731,_0x290731),this[_0x5fd38d(0x824)][_0x5fd38d(0x6c4)]=0xff;},Window[_0x2e6bc0(0x5e2)]['_updateFilterArea']=function(){const _0x44d5d4=_0x2e6bc0,_0x8b33f4=this[_0x44d5d4(0x4e3)][_0x44d5d4(0x201)][_0x44d5d4(0x859)](new Point(0x0,0x0)),_0x3890d9=this[_0x44d5d4(0x4e3)]['filterArea'];_0x3890d9['x']=_0x8b33f4['x']+this['origin']['x'],_0x3890d9['y']=_0x8b33f4['y']+this['origin']['y'],_0x3890d9[_0x44d5d4(0x746)]=Math[_0x44d5d4(0x539)](this[_0x44d5d4(0x78c)]*this['scale']['x']),_0x3890d9[_0x44d5d4(0x689)]=Math[_0x44d5d4(0x539)](this['innerHeight']*this[_0x44d5d4(0x53f)]['y']);},VisuMZ['CoreEngine'][_0x2e6bc0(0x12e)]=Window['prototype']['_refreshBack'],Window['prototype'][_0x2e6bc0(0x364)]=function(){const _0x415aa8=_0x2e6bc0,_0x1265d4=VisuMZ[_0x415aa8(0x468)][_0x415aa8(0x6ef)][_0x415aa8(0x76e)][_0x415aa8(0x7a5)]??!![];if(!_0x1265d4)return VisuMZ[_0x415aa8(0x468)][_0x415aa8(0x12e)]['call'](this);const _0x46785b=this[_0x415aa8(0x4f2)],_0x20324e=Math[_0x415aa8(0x56f)](0x0,this[_0x415aa8(0x740)]-_0x46785b*0x2),_0x39700d=Math[_0x415aa8(0x56f)](0x0,this[_0x415aa8(0x7a0)]-_0x46785b*0x2),_0x346631=this['_backSprite'],_0x5d35e4=_0x346631[_0x415aa8(0x872)][0x0];_0x346631[_0x415aa8(0x253)]=this[_0x415aa8(0x509)],_0x346631[_0x415aa8(0x3ad)](0x0,0x0,0x60,0x60),_0x346631[_0x415aa8(0x633)](_0x46785b,_0x46785b),_0x346631[_0x415aa8(0x53f)]['x']=_0x20324e/0x60,_0x346631['scale']['y']=_0x39700d/0x60,_0x5d35e4[_0x415aa8(0x253)]=this[_0x415aa8(0x509)],_0x5d35e4[_0x415aa8(0x3ad)](0x0,0x60,0x60,0x60),_0x5d35e4[_0x415aa8(0x633)](0x0,0x0,_0x20324e,_0x39700d),_0x5d35e4['scale']['x']=0x1/_0x346631[_0x415aa8(0x53f)]['x'],_0x5d35e4[_0x415aa8(0x53f)]['y']=0x1/_0x346631['scale']['y'],_0x346631[_0x415aa8(0x353)](this[_0x415aa8(0x89d)]);},Game_Temp[_0x2e6bc0(0x5e2)]['sceneTerminationClearEffects']=function(){const _0x5a2357=_0x2e6bc0;this[_0x5a2357(0x3e7)]=[],this[_0x5a2357(0x2a1)]=[],this['_pointAnimationQueue']=[],this[_0x5a2357(0x504)]=[];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x3e3)]=Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x56c)],Scene_Base[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x56c)]=function(){const _0xd69c24=_0x2e6bc0;if($gameTemp)$gameTemp[_0xd69c24(0x4da)]();VisuMZ[_0xd69c24(0x468)]['Scene_Base_terminateAnimationClearBugFix'][_0xd69c24(0x895)](this);},Bitmap['prototype']['measureTextWidthNoRounding']=function(_0x3c682a){const _0x555bc6=_0x2e6bc0,_0x24dc7c=this[_0x555bc6(0x80f)];_0x24dc7c[_0x555bc6(0x653)](),_0x24dc7c['font']=this[_0x555bc6(0x1f7)]();const _0x46b069=_0x24dc7c[_0x555bc6(0x606)](_0x3c682a)[_0x555bc6(0x746)];return _0x24dc7c[_0x555bc6(0x525)](),_0x46b069;},Window_Message['prototype'][_0x2e6bc0(0x66c)]=function(_0x362eb4){const _0x34b6fc=_0x2e6bc0;return this[_0x34b6fc(0x232)]()?this['contents'][_0x34b6fc(0x478)](_0x362eb4):Window_Base['prototype']['textWidth']['call'](this,_0x362eb4);},Window_Message[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x232)]=function(){const _0x3712d3=_0x2e6bc0;return VisuMZ[_0x3712d3(0x468)]['Settings'][_0x3712d3(0x818)][_0x3712d3(0x330)]??!![];},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x222)]=Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x2fb)],Game_Action['prototype'][_0x2e6bc0(0x2fb)]=function(){const _0xcc2f25=_0x2e6bc0;return this[_0xcc2f25(0x118)]()?VisuMZ[_0xcc2f25(0x468)][_0xcc2f25(0x222)]['call'](this):0x0;},VisuMZ['CoreEngine'][_0x2e6bc0(0x549)]=Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x725)],Game_Action[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x725)]=function(){const _0x490946=_0x2e6bc0;if(this['subject']()&&this['subject']()['canAttack']())VisuMZ[_0x490946(0x468)][_0x490946(0x549)]['call'](this);else BattleManager[_0x490946(0x5dc)]?VisuMZ[_0x490946(0x468)][_0x490946(0x549)][_0x490946(0x895)](this):this[_0x490946(0x1f1)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x648)]=BattleManager[_0x2e6bc0(0x339)],BattleManager[_0x2e6bc0(0x339)]=function(_0x73b84,_0x3fa2ae){const _0x3a89d2=_0x2e6bc0;this[_0x3a89d2(0x5dc)]=!![],VisuMZ['CoreEngine'][_0x3a89d2(0x648)]['call'](this,_0x73b84,_0x3fa2ae),this[_0x3a89d2(0x5dc)]=undefined;},Sprite_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x167)]=function(){return 0x24;},Sprite_Name[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x787)]=function(){const _0x2c6ce1=_0x2e6bc0,_0x53cd81=this[_0x2c6ce1(0x3d0)](),_0x316b7e=this['bitmapWidth'](),_0x2bf7f8=this[_0x2c6ce1(0x167)]();this[_0x2c6ce1(0x1df)](),this[_0x2c6ce1(0x253)][_0x2c6ce1(0x1f1)](),this[_0x2c6ce1(0x253)]['drawTextTopAligned'](_0x53cd81,0x4,0x0,_0x316b7e-0xa,_0x2bf7f8,'left');},Bitmap[_0x2e6bc0(0x5e2)]['drawTextTopAligned']=function(_0x35a917,_0x3a0cc2,_0x1d09e3,_0x3f14aa,_0x5ada91,_0x5dbf1b){const _0x49adee=_0x2e6bc0,_0x18c8e8=this['context'],_0x2acef9=_0x18c8e8[_0x49adee(0x84e)];_0x3f14aa=_0x3f14aa||0xffffffff;let _0x1ed16a=_0x3a0cc2,_0x30dc8a=Math[_0x49adee(0x897)](_0x1d09e3+0x18/0x2+this[_0x49adee(0x135)]*0.35);_0x5dbf1b===_0x49adee(0x77c)&&(_0x1ed16a+=_0x3f14aa/0x2),_0x5dbf1b===_0x49adee(0x31d)&&(_0x1ed16a+=_0x3f14aa),_0x18c8e8[_0x49adee(0x653)](),_0x18c8e8[_0x49adee(0x4c7)]=this[_0x49adee(0x1f7)](),_0x18c8e8[_0x49adee(0x6e9)]=_0x5dbf1b,_0x18c8e8[_0x49adee(0x557)]=_0x49adee(0x450),_0x18c8e8[_0x49adee(0x84e)]=0x1,this[_0x49adee(0x844)](_0x35a917,_0x1ed16a,_0x30dc8a,_0x3f14aa),_0x18c8e8[_0x49adee(0x84e)]=_0x2acef9,this[_0x49adee(0x3e2)](_0x35a917,_0x1ed16a,_0x30dc8a,_0x3f14aa),_0x18c8e8[_0x49adee(0x525)](),this[_0x49adee(0x5fb)][_0x49adee(0x645)]();},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x148)]=BattleManager[_0x2e6bc0(0x14a)],BattleManager[_0x2e6bc0(0x14a)]=function(_0x1a67cf){const _0x29891f=_0x2e6bc0;if(this[_0x29891f(0x848)]&&this[_0x29891f(0x848)][_0x29891f(0x4fd)]()===_0x1a67cf['isActor']())return![];return VisuMZ[_0x29891f(0x468)]['BattleManager_checkSubstitute'][_0x29891f(0x895)](this,_0x1a67cf);},BattleManager[_0x2e6bc0(0x367)]=function(){const _0x16bd88=_0x2e6bc0;if(this[_0x16bd88(0x848)])this['_logWindow']['endAction'](this['_subject']);this[_0x16bd88(0xf1)]=_0x16bd88(0x11a),this[_0x16bd88(0x848)]&&this[_0x16bd88(0x848)][_0x16bd88(0x442)]()===0x0&&(this[_0x16bd88(0x711)](this[_0x16bd88(0x848)]),this[_0x16bd88(0x848)]=null);},Bitmap['prototype']['_startLoading']=function(){const _0x1e0b27=_0x2e6bc0;this[_0x1e0b27(0x87a)]=new Image(),this[_0x1e0b27(0x87a)][_0x1e0b27(0x88e)]=this[_0x1e0b27(0x836)][_0x1e0b27(0x6e7)](this),this[_0x1e0b27(0x87a)]['onerror']=this[_0x1e0b27(0x423)][_0x1e0b27(0x6e7)](this),this[_0x1e0b27(0x621)](),this[_0x1e0b27(0x4af)]=_0x1e0b27(0x11f),Utils[_0x1e0b27(0x619)]()?this['_startDecrypting']():(this[_0x1e0b27(0x87a)]['src']=this[_0x1e0b27(0x1f8)],![]&&this[_0x1e0b27(0x87a)][_0x1e0b27(0x746)]>0x0&&(this['_image'][_0x1e0b27(0x88e)]=null,this[_0x1e0b27(0x836)]()));},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x4a0)]=function(){const _0x51f041=_0x2e6bc0;Scene_MenuBase['prototype']['onActorChange']['call'](this),this[_0x51f041(0x59b)](),this[_0x51f041(0x491)][_0x51f041(0x845)](),this[_0x51f041(0x491)][_0x51f041(0x533)](),this[_0x51f041(0x66b)][_0x51f041(0x35f)]();},Scene_Skill[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x761)]=function(){const _0x24a443=_0x2e6bc0;return this['_skillTypeWindow']&&this[_0x24a443(0x66b)]['active'];},Game_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x826)]=function(_0x342485,_0x2b53ee,_0x4d737d){const _0x4cdf54=_0x2e6bc0,_0x49ada9=this[_0x4cdf54(0x452)](),_0x2da639=this[_0x4cdf54(0x734)](_0x342485,_0x2b53ee);for(const _0x30b4a9 of _0x2da639){const _0x3b6c9e=_0x49ada9[_0x30b4a9];if(_0x3b6c9e===undefined||_0x3b6c9e===null){if($gameTemp[_0x4cdf54(0x2d3)]()&&!DataManager[_0x4cdf54(0x5eb)]()){let _0x2c8852=_0x4cdf54(0x56d)+'\x0a';_0x2c8852+=_0x4cdf54(0x371)+'\x0a',_0x2c8852+=_0x4cdf54(0x713);if(this[_0x4cdf54(0x2be)]())alert(_0x2c8852),SceneManager[_0x4cdf54(0x272)]();else{if(!this[_0x4cdf54(0x4df)])console['log'](_0x2c8852);this['_displayedPassageError']=!![];}}}if((_0x3b6c9e&0x10)!==0x0)continue;if((_0x3b6c9e&_0x4d737d)===0x0)return!![];if((_0x3b6c9e&_0x4d737d)===_0x4d737d)return![];}return![];},Game_Map['prototype'][_0x2e6bc0(0x2be)]=function(){const _0x1b1383=_0x2e6bc0;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x1b1383(0x6b4)])return!![];return![];},Sprite_Animation[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7eb)]=function(_0xa8a474){const _0x1eba06=_0x2e6bc0;!this[_0x1eba06(0x790)]&&(this[_0x1eba06(0x790)]=_0xa8a474['gl']['getParameter'](_0xa8a474['gl']['VIEWPORT']));},VisuMZ[_0x2e6bc0(0x468)]['Scene_Map_shouldAutosave']=Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7f5)],Scene_Map[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7f5)]=function(){const _0x532d85=_0x2e6bc0,_0x52c585=SceneManager['_previousClass'][_0x532d85(0x3d0)];if([_0x532d85(0x898),_0x532d85(0x856),'Scene_TitleTransition',_0x532d85(0x772)]['includes'](_0x52c585))return![];return VisuMZ[_0x532d85(0x468)][_0x532d85(0x3b2)][_0x532d85(0x895)](this);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x865)]=Window_SkillList[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7fe)],Window_SkillList[_0x2e6bc0(0x5e2)][_0x2e6bc0(0x7fe)]=function(_0x2e4307){const _0x58c2a6=_0x2e6bc0;if(this[_0x58c2a6(0x78e)]<=0x0)return![];return VisuMZ[_0x58c2a6(0x468)][_0x58c2a6(0x865)][_0x58c2a6(0x895)](this,_0x2e4307);},VisuMZ[_0x2e6bc0(0x468)][_0x2e6bc0(0x2b5)]=Game_Battler['prototype'][_0x2e6bc0(0x6c8)],Game_Battler['prototype'][_0x2e6bc0(0x6c8)]=function(_0xbd0784){const _0x24437c=_0x2e6bc0;VisuMZ[_0x24437c(0x468)][_0x24437c(0x2b5)][_0x24437c(0x895)](this,_0xbd0784),isNaN(this[_0x24437c(0x1f9)])&&(VisuMZ['CoreEngine']['Game_Battler_initTpbChargeTime'][_0x24437c(0x895)](this,_0xbd0784),isNaN(this[_0x24437c(0x1f9)])&&(this['_tpbChargeTime']=0x0));},Game_Battler['prototype']['updateTpbChargeTime']=function(){const _0x36b21e=_0x2e6bc0;this[_0x36b21e(0x3ed)]===_0x36b21e(0x820)&&(this['_tpbChargeTime']+=this[_0x36b21e(0x574)](),isNaN(this[_0x36b21e(0x1f9)])&&(this['_tpbChargeTime']=this[_0x36b21e(0x574)](),isNaN(this['_tpbChargeTime'])&&(this[_0x36b21e(0x1f9)]=0x0)),this['_tpbChargeTime']>=0x1&&(this['_tpbChargeTime']=0x1,this[_0x36b21e(0x579)]()));};