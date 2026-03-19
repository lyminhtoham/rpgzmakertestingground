//=============================================================================
// Niji - Equip Slot Core
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.1.0 Dynamic equipment slots, locking, and sealing
 * @author Niji
 * @filename NIJI_EquipSlotCore.js
 *
 * @help NIJI_EquipSlotCore.js
 * 
 * This plugin extends the default RPG Maker MZ equip system.
 * 
 * Features:
 * 
 * - Plugin commands to control equip slots
 * - Add multiple equip slots to characters regardless of type
 * - Add multiple equip types to weapons / armors
 * - Add equip requirements to weapons / armors
 * - Dynamically control equip slots during runtime
 * - Dynamically lock / seal equip slots during runtime
 * 
 * It also adds the ability to lock and seal specific slots
 * before and during runtime through events.
 * 
 * ! Known Issues ! ===========================================================
 * 
 * Optimize may not equip the optimal equipment whenever a requirement is only
 * satisfied when another item is equipped because by default optimize removes
 * all of the existing equipment and does not replace one at a time.
 * 
 * One day I may fix this.
 * 
 * ! Note ! ===================================================================
 * 
 * If you are using this plugin the default equipment box should not be used. 
 * Instead, you should manage all equipment through note-tags or events.
 * 
 * = Adding Equip Slots =======================================================
 * 
 * To add an equip slot, use the following note-tag:
 * 
 *      <equip-slot ETYPE>
 * 
 * Where ETYPE, short for equip type, is one of the equip types
 * you have setup under the Types database tab.
 * 
 * You can either write the ID of the ETYPE, or you can write
 * the exact name of the ETYPE. For example, you can write
 * either:
 * 
 *      <equip-slot 1>
 *      <equip-slot Weapon>
 * 
 * Using the identifier is better if you will be changing the
 * name frequently. If you will rarely change the name then
 * writing the name is better as it's clearer.
 * 
 * If you want more slots, just add more note-tags. Want 3
 * weapons and 2 accessories?
 * 
 *      <equip-slot Weapon>
 *      <equip-slot Weapon>
 *      <equip-slot Weapon>
 *      <equip-slot Accessory>
 *      <equip-slot Accessory>
 * 
 * == Specifying Initial Equipment ============================================
 * 
 * Because the Initial Equipment box is no longer used, you 
 * will need to find another way to specify them.
 * 
 * The equip slot note-tag supports initial equip, using something 
 * called an "Item Code", and is written like this:
 * 
 *      <equip-slot ETYPE ITEMCODE>
 * 
 * An Item code is a quick way to reference a particular weapon, 
 * armor, or item. They look like this:
 * 
 *      a1 - armor 1
 *      w3 - weapon 3
 *      i5 - item 5
 *   
 * So for example, if you want your actor to have a weapon slot with
 * weapon 4 from the database as its initial equip, use the note-tag
 * 
 *      <equip-slot Weapon w4>
 *
 * == Adding and Removing Equip Slots Dynamically =============================
 * 
 * You may want to add or remove equip slots during the game.
 * To add an equip slot, use the script call
 * 
 *      ACTOR.addEquipSlot(ETYPE, position)
 * 
 * Where the ACTOR is a reference to a Game_Actor object, and the ETYPE is
 * the name or ID of the equip slot you want to add. Position is optional.
 * 
 * For example, you can write
 * 
 *      // Add an accessory slot to the end of the equip slot list
 *      $gameActors.actor(2).addEquipSlot(4)
 *      $gameActors.actor(2).addEquipSlot("Accessory")
 * 
 *      // Add a helmet slot at the beginning of the list
 *      $gameActors.actor(2).addEquipSlot("Helmet", 0)
 * 
 * To remove a specific slot
 * 
 *      ACTOR.removeEquipSlot(SLOT_ID)
 * 
 * To remove a slot by type use
 * 
 *      ACTOR.removeEquipSlotByType(ETYPE)
 * 
 * e.g.
 *      
 *      // Remove first slot
 *      $gameActors.actor(2).removeEquipSlot(0)
 * 
 *      // Remove THE FIRST slot with type of Accessory
 *      $gameActors.actor(2).removeEquipSlotByType("Accessory")
 * 
 * If the equip slot contains an item, the item will be un-equipped and 
 * returned to the inventory.
 * 
 * == Locking & Sealing =======================================================
 * 
 * To lock / unlock a slot use
 * 
 *    ACTOR.lockEquipSlot(SLOT_ID)
 *    ACTOR.unlockEquipSlot(SLOT_ID)
 * 
 * To seal / unseal a slot use
 * 
 *    ACTOR.sealEquipSlot(SLOT_ID)
 *    ACTOR.unsealEquipSlot(SLOT_ID)
 * 
 * This can be used for cursed items that are "attached" to the player and 
 * require some sort of "solution" to "uncurse" them.
 * 
 * == Multiple Equip Types ====================================================
 * 
 * By default, all equips have one equip type. You can assign additional equip 
 * types using note-tags. 
 * 
 * With multiple equip types, you can put on the same equip in multiple slots
 * of your choice.
 * 
 * To assign additional equip types, note-tag armors or weapons with:
 * 
 *      <equip-type TYPE />
 *   
 * You can assign as many equip types as you want.
 * 
 * == Equipment Requirements ==================================================
 * 
 * By default the only requirements you can set for equipping items is class 
 * locking. This plugin fixes that. You can now control equip requirements
 * based on almost every actor property, with precision.
 * 
 *      <equip-requires: ...>
 * 
 * See the Note Tag Quick Doc below for full documentation.
 * 
 * = NOTE TAG QUICK DOC =======================================================
 * 
 * <equip-slot ETYPE [ITEMCODE]>
 * 
 * - Used on: Actors
 * - Changes equipment slot loadout for a given Actor
 * - ETYPE (required) - Equipment Type name or identifier from Types tab
 * - ITEMCODE (optional) - Item reference code for initial items
 * 
 * Item Code Prefixes:
 * 
 * - w (Weapon)
 * - a (Armor)
 * - i (Item)
 * 
 * Examples:
 * 
 *      <equip-slot Weapon>
 *      <equip-slot 1>
 *      <equip-slot Weapon w1>
 *      <equip-slot Armor a5>
 *      <equip-slot Accessory i5>
 * 
 * ----------------------------------------------------------------------------
 * 
 * <equip-type ETYPE>
 * 
 * - Used on: Weapons / Armors
 * - Add multiple equip types to items
 * - ETYPE (required) - Equipment Type name or identifier from Types tab
 * 
 * Examples:
 * 
 *      <equip-type Weapon>
 *      <equip-type 1>
 * 
 * ----------------------------------------------------------------------------
 * 
 * <equip-requires: requirement comparator valueA>
 * <equip-requires: requirement valueA comparator valueB>
 * <equip-requires: requirement valueA>
 * 
 * - Used on: Weapons / Armors
 * - Control who can equip what through equipment requirements. The different 
 * formats allow for different requirements. If you do not pass a comparator 
 * it will default to GTE (Greater Than Equals), unless it's a special 
 * requirement check.
 * - requirement (required) - Requirement type
 * - comparator (optional) - Comparison function, will default to GTE
 * - valueA (situational) - Value to compare or lookup requirement
 * - valueB (situational) - Value to compare against a requirement
 * 
 * Examples:
 * 
 *      <equip-requires: atk gt 30>
 *      <equip-requires: switch 32>
 *      <equip-requires: var 5 gt 2>
 *      <equip-requires: noweapons>
 *      <equip-requires: classid 8>
 * 
 * Basic Requirement Types:
 * 
 * - ACTORID
 *    - comparator
 *    - valueA (int)
 * - NAME
 *    - comparator
 *    - valueA (str) (no spaces)
 * - EXP
 *    - comparator
 *    - valueA (int)
 * - LEVEL
 *    - comparator
 *    - valueA (int)
 * - HP
 *    - comparator
 *    - valueA (int)
 * - MP
 *    - comparator
 *    - valueA (int)
 * - TP
 *    - comparator
 *    - valueA (int)
 * - MHP
 *    - comparator
 *    - valueA (int)
 * - MMP
 *    - comparator
 *    - valueA (int)
 * - MTP
 *    - comparator
 *    - valueA (int)
 * - ATK
 *    - comparator
 *    - valueA (int)
 * - DEF
 *    - comparator
 *    - valueA (int)
 * - MAT
 *    - comparator
 *    - valueA (int)
 * - MDF
 *    - comparator
 *    - valueA (int)
 * - AGI
 *    - comparator
 *    - valueA (int)
 * - LUK
 *    - comparator
 *    - valueA (int)
 * - VAR
 *    - valueA (int varId)
 *    - comparator
 *    - valueB (any)
 * 
 * Special Requirement Types:
 * 
 * - CLASSID
 *    - valueA (int classId)
 * - SKILL
 *    - valueA (int skillId)
 * - EQUIP
 *    - valueA (int itemId)
 * - SWITCH
 *    - valueA (int switchId)
 * - NOWEAPONS
 * 
 * Comparators:
 * 
 * - NOTEQ (a != b)
 * - EQ (a == b)
 * - EQQ (a === b)
 * - GT (a > b)
 * - GTE (a >= b) (default)
 * - LT (a < b)
 * - LTE (a <= b)
 * 
 * ----------------------------------------------------------------------------
 * 
 * The following formats also should work, this is for compat purposes:
 * 
 *      <equip slot Weapon>
 *      <equip_slot Weapon>
 *      <equip slot: Weapon>
 *      <Equip Slot: Weapon>
 *      <EquipSlot: Weapon>
 *      <equipSlot: Weapon>
 *      <equipType: Weapon>
 * 
 * This plugin also supports the Vz Equip Core format (and default items):
 * 
 *      <Equip Slots>
 *      Weapon
 *      Armor a1
 *      </Equip Slots>
 * 
 * = Credits / Thank You: =====================================================
 * 
 * Thank you to Hime. This is based on Hime's Equip Slots Core.
 * 
 * @command ADD_SLOT
 * @text Add Equip Slot
 * @desc Add a slot to an actor
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipType
 * @type string
 * @text Equip Slot Type
 * @desc Name or identifier or the equipment type
 * 
 * @command ADD_SLOT_AT_POSITION
 * @text Add Equip Slot at Position
 * @desc Add a slot to an actor at specific position
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipType
 * @type string
 * @text Equip Slot Type
 * @desc Name or identifier or the equipment type
 * @arg position
 * @type number
 * @text Equip Slot Position
 * @desc The index where you want to add a new equipment slot
 * 
 * @command REMOVE_SLOT
 * @text Remove Equip Slot
 * @desc Remove a slot by index
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipSlot
 * @type number
 * @text Equip Slot Position
 * @desc The slot position to remove
 * 
 * @command REMOVE_SLOT_BY_TYPE
 * @text Remove Equip Slot By Type
 * @desc Remove a slot by equip type
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipType
 * @type string
 * @text Equip Slot Type
 * @desc Name or identifier or the equipment type
 * 
 * @command LOCK_SLOT
 * @text Lock Equip Slot
 * @desc Lock a slot by index
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipSlot
 * @type number
 * @text Equip Slot Position
 * @desc The slot position to lock
 * 
 * @command UNLOCK_SLOT
 * @text Unlock Equip Slot
 * @desc Unlock a slot by index
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipSlot
 * @type number
 * @text Equip Slot Position
 * @desc The slot position to unlock
 * 
 * @command SEAL_SLOT
 * @text Seal Equip Slot
 * @desc Seal a slot by index
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipSlot
 * @type number
 * @text Equip Slot Position
 * @desc The slot position to seal
 * 
 * @command UNSEAL_SLOT
 * @text Unseal Equip Slot
 * @desc Unseal a slot by index
 * @arg actorId
 * @type actor
 * @text Actor
 * @desc Actor to be modified
 * @arg equipSlot
 * @type number
 * @text Equip Slot Position
 * @desc The slot position to unseal
 * 
 */ 

(function () {
  const pluginVersion = "1.0.0";
  const developerName = "NIJI";
  const developerPluginName = "EquipSlotCore";
  const pluginName = `${developerName}_${developerPluginName}`;
  const params = PluginManager.parameters(pluginName);
  
  // Get Developer Root
  const Niji = window.Niji || {};

  // Create Plugin Root
  const ESC = {};

  //===========================================================================
  // Register Plugin Commands
  //===========================================================================

  PluginManager.registerCommand(pluginName, "ADD_SLOT", args => {
    $gameActors.actor(args.actorId).addEquipSlot(args.equipType);
  });

  PluginManager.registerCommand(pluginName, "ADD_SLOT_AT_POSITION", args => {
    $gameActors.actor(args.actorId).addEquipSlot(args.equipType, args.position);
  });

  PluginManager.registerCommand(pluginName, "REMOVE_SLOT", args => {
    var equipSlotId = parseInt(args.equipSlot);
    if (!isNaN(equipSlotId)) {
      $gameActors.actor(args.actorId).removeEquipSlot(equipSlotId);
    }
  });

  PluginManager.registerCommand(pluginName, "REMOVE_SLOT_BY_TYPE", args => {
    $gameActors.actor(args.actorId).removeEquipSlotByType(args.equipType);
  });

  PluginManager.registerCommand(pluginName, "LOCK_SLOT", args => {
    var equipSlotId = parseInt(args.equipSlot);
    if (!isNaN(equipSlotId)) {
      $gameActors.actor(args.actorId).lockEquipSlot(equipSlotId);
    }
  });

  PluginManager.registerCommand(pluginName, "UNLOCK_SLOT", args => {
    var equipSlotId = parseInt(args.equipSlot);
    if (!isNaN(equipSlotId)) {
      $gameActors.actor(args.actorId).unlockEquipSlot(equipSlotId);
    }
  });

  PluginManager.registerCommand(pluginName, "SEAL_SLOT", args => {
    var equipSlotId = parseInt(args.equipSlot);
    if (!isNaN(equipSlotId)) {
      $gameActors.actor(args.actorId).sealEquipSlot(equipSlotId);
    }
  });

  PluginManager.registerCommand(pluginName, "UNSEAL_SLOT", args => {
    var equipSlotId = parseInt(args.equipSlot);
    if (!isNaN(equipSlotId)) {
      $gameActors.actor(args.actorId).unsealEquipSlot(equipSlotId);
    }
  });

  //===========================================================================
  // Setup Note-Tag Expressions
  //===========================================================================

  ESC.Regex = {};
  ESC.Regex.EquipSlotWrapper = /<equip(?:[-_ ])?slots?>\s*([\s\S]*)\s*<\/equip(?:[-_ ])?slots?>/i
  ESC.Regex.EquipSlotWrapperItem = /\s+(\w+)(?:\s+(\w)(\d+))?/i
  ESC.Regex.EquipSlotIndividual = /<equip(?:[-_ ])?slot:?(?:\s+)?(\w+)(?:\s+(\w)(\d+))?>/img
  ESC.Regex.EquipType = /<equip(?:[-_ ])?type:?(?:\s*)?(.+?)(?:\s*)?\/?>/img
  ESC.Regex.EquipRequires = /<equip(?:[-_ ])?requires:?(?:\s*)?(.+?)(?:\s*)?\/?>/ig

  //===========================================================================
  // Setup Requirement Methods
  //===========================================================================

  ESC.Requirements = {};

  ESC.Requirements.Comparators = {
    NOTEQ: (a, b) => a != b,
    EQ: (a, b) => a == b,
    EQQ: (a, b) => a === b,
    GT: (a, b) => a > b,
    LT: (a, b) => a < b,
    GTE: (a, b) => a >= b,
    LTE: (a, b) => a <= b
  };

  ESC.Requirements.Lookups = {
    ACTORID: (actor) => actor._actorId,
    NAME: (actor) => actor._name,
    EXP: (actor) => actor.currentExp(),
    LEVEL: (actor) => actor.level,
    HP: (actor) => actor.hp,
    MP: (actor) => actor.mp,
    TP: (actor) => actor.tp,
    MHP: (actor) => actor.paramBase(0),
    MMP: (actor) => actor.paramBase(1),
    MTP: (actor) => actor.paramBase(2),
    ATK: (actor) => actor.atk,
    DEF: (actor) => actor.def,
    MAT: (actor) => actor.mat,
    MDF: (actor) => actor.mdf,
    AGI: (actor) => actor.agi,
    LUK: (actor) => actor.luk,
    VAR: (_, value) => $gameVariables.value(value)
  };

  ESC.Requirements.Special = {
    CLASSID: (actor, value) => actor.isClass($dataClasses[value]),
    SKILL: (actor, value) => actor.isLearnedSkill(value),
    EQUIP: (actor, value) => actor.isEquipped(value),
    NOWEAPONS: (actor, _) => actor.hasNoWeapons(),
    SWITCH: (_, value) => $gameSwitches.value(value)
  };

  ESC.Requirements.check = function (actor, matches, currentValue) {
    let requirement = matches[0] && matches[0].trim().toUpperCase();
    let comparator = matches[1] && matches[1].trim();
    let rightHandA = matches[2] && matches[2].trim();
    let rightHandB = matches[3] && matches[3].trim();
    let leftHand;

    if (requirement == null || requirement == "") {
      console.log(pluginName, `[requirements]`, `Requirement missing.`, actor, matches);
      return currentValue;
    }

    // Special requirement comparisons don't need the comparator or left hand
    // value assignment.
    if (ESC.Requirements.Special[requirement]) {
      return ESC.Requirements.Special[requirement](actor, JsonEx.parse(rightHandA));
    }

    // Normally the code assumes:
    //
    //    <equip-requires: switch gte 1 23>
    //
    // However, this reads weird. So this next section is to allow for:
    //
    //    <equip-requires: switch 1 gte 23>
    //
    // Generally, this would be written into the Regular Expression. However,
    // to allow others the ability to extend the comparator and lookup
    // tables, we opt for a simple if statement.
    if (rightHandB != null && ESC.Requirements.Comparators[rightHandA.toUpperCase()]) {
      let _comparator = comparator
      comparator = rightHandA.toUpperCase()
      rightHandA = _comparator
    }

    if (ESC.Requirements.Comparators[comparator.toUpperCase()]) {
      // Ensure comparator is uppercase, we do this here to avoid changing any
      // numerical values or comparison strings in previous checks.
      comparator = comparator.toUpperCase();
    } else {
      // Otherwise default comparator to GTE and push values to the right
      rightHandB = rightHandA && JsonEx.parse(rightHandA);
      rightHandA = comparator && JsonEx.parse(comparator);
      comparator = 'GTE';
    }

    // Ensure the value lookup exists, exit and log the issue
    if (!ESC.Requirements.Lookups[requirement]) {
      console.log(pluginName, `[requirements]`, `Unable to find requirement ${requirement} in lookup table.`, actor, matches);
      return currentValue;
    } else {
      leftHand = ESC.Requirements.Lookups[requirement](actor, rightHandA);
    }

    // Handle case where rightHandA is used for value lookup (SWITCH)
    if (rightHandB != null) {
      return ESC.Requirements.Comparators[comparator](leftHand, rightHandB);
    } else {
      return ESC.Requirements.Comparators[comparator](leftHand, rightHandA);
    }
  }

  //===========================================================================
  // Setup Helper Methods
  //===========================================================================

  ESC.etypeIds = function(obj) {
    // Build type map on object if it does not exist
    if (obj.etypeIds === undefined) {
      obj.etypeIds = [obj.etypeId];
      var res;
      while (res = ESC.Regex.EquipType.exec(obj.note)) {
        obj.etypeIds.push(ESC.getEtypeId(res[1]));
      }
    }
    return obj.etypeIds;
  }

  ESC.etypeNameToId = function(etypeName) {
    // Build global type map when it doesn't exist
    if (!ESC.ETYPE_MAP) {
      ESC.ETYPE_MAP = {};
      for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
        var name = $dataSystem.equipTypes[i].toUpperCase();
        ESC.ETYPE_MAP[name] = i;      
      }
    }
    return ESC.ETYPE_MAP[etypeName.toUpperCase()];
  }

  ESC.getEtypeId = function(etypeId) {
    if (isNaN(etypeId)) {
      etypeId = ESC.etypeNameToId(etypeId);
    } else {
      etypeId = Math.floor(Math.abs(etypeId))
    }

    // Ensure that the identifier is within range
    if ($dataSystem.equipTypes.length <= etypeId) {
      etypeId = null;
    }

    return etypeId;
  };

  //===========================================================================
  // Create Game_EquipSlot Class
  //===========================================================================

  class Game_EquipSlot {
    constructor() {
      this.initialize.apply(this, arguments);
    }

    initialize() {
      this._etypeId = 1;
      this._item = new Game_Item();
    }

    setEtypeId(etypeID) {
      this._etypeId = etypeID;
    }

    etypeId() {
      return this._etypeId;
    }

    setObject(item) {
      this._item.setObject(item);
    }

    object() {
      return this._item.object();
    }

    setEquip(isWeapon, item) {
      this._item.setEquip(isWeapon, item);
    }

    canEquip(item) {
      var ids = ESC.etypeIds(item);
      return ids.contains(this._etypeId);
    }

    isEtypeId(id) {
      return this._etypeId === id;
    }

    // Helper method for note-tag generation
    static createByType(etypeId, itemType, itemId) {
      // Avoid creating when there is no valid type
      etypeId = ESC.getEtypeId(etypeId);
      if (etypeId == null)
        return;

      var equipSlot = new Game_EquipSlot();
      equipSlot.setEtypeId(etypeId);

      if (itemType) {
        var isWeapon = itemType.toLowerCase() === "w";
        equipSlot.setEquip(isWeapon, Math.floor(itemId));
      }

      return equipSlot;
    }
  };

  //===========================================================================
  // Overwrite RMMZ Game_Battler Methods
  //===========================================================================
  
  const RMMZ_GameBattler_initMembers = Game_Battler.prototype.initMembers;

  Game_Battler.prototype.initMembers = function() {
    this._equips = [];
    this._esc_locked = [];
    this._esc_sealed = [];
    RMMZ_GameBattler_initMembers.call(this);    
  };

  // Returns equip slot objects
  Game_Battler.prototype.equipSlotList = function() {
    return this._equips;
  };

  // Returns all of the equip slot types for the battler
  // Purely for backwards compatibility
  Game_Battler.prototype.equipSlots = function() {
    var slots = this._equips;
    var ids = [];

    for (var i = 0; i < slots.length; i++) {
      ids.push(slots[i].etypeId());
    }

    return ids;
  };
  
  Game_Battler.prototype.equips = function() {
    return this._equips.map(item => item.object());
  };
    
  Game_Battler.prototype.initEquips = function(equips) {    
    var baseSlots = this.baseSlots();
    if (baseSlots.length > 0) {
      var maxSlots = baseSlots.length;
      this._equips = [];

      for (var i = 0; i < maxSlots; i++) {
        this._equips[i] = JsonEx.makeDeepCopy(baseSlots[i]);      
      }

      this.releaseUnequippableItems(true);
      this.refresh();
    }
  };
  
  Game_Battler.prototype.baseSlots = function() {
    return [];
  }
  
  Game_Battler.prototype.getBaseSlots = function(battler) {
    if (!battler.baseEquipSlots) {
      battler.baseEquipSlots = [];

      // Create entries based on the Vz format:
      //
      //    <Equip Slot>
      //    ...
      //    </Equip Slot>
      //
      const matches = battler.note.match(ESC.Regex.EquipSlotWrapper);
      if (matches && matches.length) {
          const entries = matches[1].trim().split(/[\r\n]+/);
          for (const entry of entries) {
              const ems = entry.trim().match(ESC.Regex.EquipSlotWrapperItem);
              if (ems.length) {
                  var etypeId = ems[1];
                  var itemType = ems[2];
                  var itemId = ems[3];
                  var equipSlot = Game_EquipSlot.createByType(
                    etypeId, 
                    itemType,
                    itemId
                  );

                  if (equipSlot) {
                    battler.baseEquipSlots.push(equipSlot);
                  }
              }
          }
      }

      // Create entries based on the Hime format:
      //
      //    <equip-slot ...>
      //
      var res;
      while (res = ESC.Regex.EquipSlotIndividual.exec(battler.note)) {
        var etypeId = res[1];
        var itemType = res[2];
        var itemId = res[3];
        var equipSlot = Game_EquipSlot.createByType(etypeId, itemType, itemId)
        
        // Whenever the etypeId is not valid, no equip slot will be created.
        if (equipSlot) {
          battler.baseEquipSlots.push(equipSlot);
        }
      }
    }

    return battler.baseEquipSlots;
  };
  
  Game_Battler.prototype.weapons = function() {
    return this.equips().filter(item => item && DataManager.isWeapon(item));
  };

  Game_Battler.prototype.armors = function() {
    return this.equips().filter(item => item && DataManager.isArmor(item));
  };
  
  // Finds the first equip slot with the given equip type
  Game_Battler.prototype.getSlotByEtypeId = function(etypeId) {
    var slots = this._equips;
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].isEtypeId(etypeId)) {
        return i;
      }
    }
  };

  // Enable dynamic locking and sealing checks
  Game_Battler.prototype.isEquipChangeOk = function(slotId) {
    var etypeId = this.equipSlots()[slotId];

    return (
      // Check slot for being locked or sealed
      !this._esc_locked.includes(slotId) &&
      !this._esc_sealed.includes(slotId) &&
      // Check equip type for being locked / sealed
      !this.isEquipTypeLocked(etypeId) &&
      !this.isEquipTypeSealed(etypeId)
    );
  };

  Game_Battler.prototype.changeEquip = function(slotId, item) {
    if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlotList()[slotId].canEquip(item))) {
        this._equips[slotId].setObject(item);
        this.refresh();
    }
  };
  
  // We need to find a slot. Assumes 1 is the weapon type
  Game_Battler.prototype.changeEquipById = function(etypeId, itemId) {
    var slotId = this.getSlotByEtypeId(etypeId);
    if (this.equipSlots()[slotId] === 1) {
        this.changeEquip(slotId, $dataWeapons[itemId]);
    } else {
        this.changeEquip(slotId, $dataArmors[itemId]);
    }
  };  
  
  // Adds a new equip slot to the actor
  Game_Battler.prototype.addEquipSlot = function(etypeId, position) {
    var equipSlot = new Game_EquipSlot();
    etypeId = ESC.getEtypeId(etypeId);
    equipSlot.setEtypeId(etypeId);

    // Check whether we should insert at a specific location
    if (position != null) {
      this._equips.splice(position, 0, equipSlot);
    // Otherwise add to the end
    } else {
      this._equips.push(equipSlot);
    }
  };

  // Lock an equip slot on the actor
  Game_Battler.prototype.lockEquipSlot = function (slotId) {
    if (!this._esc_locked.includes(slotId)) {
      this._esc_locked.push(slotId);
    }
  };  
  
  // UnLock an equip slot on the actor
  Game_Battler.prototype.unlockEquipSlot = function (slotId) {
    var index = this._esc_locked.indexOf(slotId)
    if (index > -1) {
      this._esc_locked.splice(index, 1);
    }
  };  
  
  // Seal an equip slot on the actor
  Game_Battler.prototype.sealEquipSlot = function (slotId) {
    if (!this._esc_sealed.includes(slotId)) {
      this._esc_sealed.push(slotId);
    }
  };  
  
  // Unseal an equip slot on the actor
  Game_Battler.prototype.unsealEquipSlot = function (slotId) {
    var index = this._esc_sealed.indexOf(slotId)
    if (index > -1) {
      this._esc_sealed.splice(index, 1);
    }
  };

  // Remove equip slot by position.
  // If an item exists in that slot, add to party
  Game_Battler.prototype.removeEquipSlotByType = function(position) {
    var slots = this._equips;
    if (position != null) {
      if (slots[position]) {
        this.tradeItemWithParty(null, slots[position].object());
        slots.splice(position, 1);
      }
    }
  };

  // Remove equip slot by equip type
  // If an item exists in that slot, add to party
  Game_Battler.prototype.removeEquipSlotByType = function(etypeId) {
    var slots = this._equips;
    etypeId = ESC.getEtypeId(etypeId);
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].isEtypeId(etypeId)) {
        this.tradeItemWithParty(null, slots[i].object());
        slots.splice(i, 1);
        break;
      }      
    };
  };

  Game_Battler.prototype.checkEquipRequirements = function (item) {
    let canEquip = true;
    let match;
    while (match = ESC.Regex.EquipRequires.exec(item.note)) {
      let matches = match[1].trim().split(/\s/);
      if (canEquip) canEquip = ESC.Requirements.check(this, matches, canEquip);
    }
    return canEquip;
  };

  Game_Battler.prototype.canEquip = function(item) {
    let canEquip = RMMZ_GameActor_equipSlots.call(this, item);
    if (canEquip) {
      canEquip = this.checkEquipRequirements(item);
    }
    return canEquip;
  }

  Game_Battler.prototype.releaseUnequippableItems = function(forcing) {
    for (;;) {
      var slots = this.equipSlotList();
      var slotTypes = this.equipSlots();
      var equips = this.equips();
      var changed = false;
      for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && (!this.canEquip(item) || !slots[i].canEquip(item))) {
          if (!forcing) {
            this.tradeItemWithParty(null, item);
          }
          this._equips[i].setObject(null);
          changed = true;
        }
      }
      if (!changed) {
          break;
      }
    }
  };
  
  Game_Battler.prototype.bestEquipItem = function(slotId) {
    var slot = this.equipSlotList()[slotId];
    var etypeId = this.equipSlots()[slotId];
    var itemFilter = item => slot.canEquip(item) && this.canEquip(item);
    var items = $gameParty.equipItems().filter(itemFilter, this);
    var bestItem = null;
    var bestPerformance = -1000;

    for (var i = 0; i < items.length; i++) {
        var performance = this.calcEquipItemPerformance(items[i]);
        if (performance > bestPerformance) {
            bestPerformance = performance;
            bestItem = items[i];
        }
    }

    return bestItem;
  };
  
  //===========================================================================
  // Overwrite Game_Actor methods with our Game_Battler methods
  //===========================================================================

  const RMMZ_GameActor_equipSlots = Game_Actor.prototype.equipSlots;
  const RMMZ_GameActor_initEquips = Game_Actor.prototype.initEquips;

  Game_Actor.prototype.equipSlots = function() {
    return Game_Battler.prototype.equipSlots.call(this);    
  };
  
  Game_Actor.prototype.equips = function() {
    return Game_Battler.prototype.equips.call(this);
  };
  
  Game_Actor.prototype.weapons = function() {
    return Game_Battler.prototype.weapons.call(this);
  };

  Game_Actor.prototype.armors = function() {
    return Game_Battler.prototype.armors.call(this);
  };
  
  Game_Actor.prototype.initEquips = function(equips) {    
    Game_Battler.prototype.initEquips.call(this, equips);    
  };
  
  Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    Game_Battler.prototype.changeEquipById.call(this, etypeId, itemId);
  };
  
  Game_Actor.prototype.changeEquip = function(slotId, item) {  
    Game_Battler.prototype.changeEquip.call(this, slotId, item);
  };  
  
  Game_Actor.prototype.isEquipChangeOk = function(slotId) {
    return Game_Battler.prototype.isEquipChangeOk.call(this, slotId);
  };  
  
  Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    Game_Battler.prototype.releaseUnequippableItems.call(this, forcing);
  };
  
  Game_Actor.prototype.bestEquipItem = function(slotId) {
    return Game_Battler.prototype.bestEquipItem.call(this, slotId);
  };
  
  Game_Actor.prototype.baseSlots = function() {
    // By default, we check the actor for any equip slots
    var slots = Game_Battler.prototype.baseSlots.call(this);
    return slots.concat(this.getBaseSlots(this.actor()))
  };
    
  //===========================================================================
  // Overwrite RMMZ Window_Equip include to check equip compatibility
  //===========================================================================

  Window_EquipItem.prototype.includes = function(item) {
    if (item === null) {
      return true;
    }

    if (!this._actor) {
      return false;
    }

    if (
      this._slotId < 0 || 
      !this._actor.equipSlotList()[this._slotId].canEquip(item)
    ) {
        return false;
    }

    return this._actor.canEquip(item);
  };

  //===========================================================================
  // Assign New Classes to Root
  //===========================================================================

  window.Game_EquipSlot = Game_EquipSlot;

  //===========================================================================
  // Assign Plugin to Developer Root
  //===========================================================================

  Niji.EquipSlotCore = ESC;
  Niji.EquipSlotCore._version = pluginVersion;

  //===========================================================================
  // Update Developer Root
  //===========================================================================

  window.Niji = Niji;
})();