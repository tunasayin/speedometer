RegisterNetEvent("speedometer:show")
AddEventHandler("speedometer:show", function(isMetric, speed, rpm, gear) 
    SendNUIMessage({
        action = "show",
        isMetric = isMetric,
        speed = speed,
        rpm = rpm,
        gear = gear
    })
end)

RegisterNetEvent("speedometer:hide")
AddEventHandler("speedometer:hide", function() 
    SendNUIMessage({
        action = "hide"
    })
end)

Citizen.CreateThread(function() 
    while true do
        local pedVehicle = GetVehiclePedIsIn(GetPlayerPed(-1), false)
        if pedVehicle ~= 0 and GetIsVehicleEngineRunning(pedVehicle) then
            TriggerEvent("speedometer:show", ShouldUseMetricMeasurements(), GetEntitySpeed(pedVehicle), GetVehicleCurrentRpm(pedVehicle), GetVehicleCurrentGear(pedVehicle)) 
        else
            TriggerEvent("speedometer:hide")
        end

        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(9)


        Citizen.Wait(1)
    end
end)
